import * as cdk8s from 'cdk8s';
import { Construct } from 'constructs';
import { AwsZoneTypeOptions } from './aws-external-den-interface';

export interface AwsExternalDnsOptions {

  /**
   * Service Account Name for external-dns.
   *
   * @default - external-dns
   */
  readonly serviceAccountName?: string;

  /**
   * Namespace for external-dns
   *
   * @default - default
   */

  readonly namespace?: string;
  /**
   * will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones
   *
   * @default - none
   *
   * @example - mydomain.com
   */
  readonly domainFilter: string;

  /**
   * will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones
   *
   * @default - AwsZoneTypeOptions.PUBLIC = public
   */
  readonly awsZoneType?: AwsZoneTypeOptions;

  /**
   * image for external-dns.
   * @default - k8s.gcr.io/external-dns/external-dns:v0.7.3
   */
  readonly image?: string;
}

/**
 * Generate external-dns config yaml.
 * see https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md
*/
export class AwsExternalDns extends Construct {
  /**
   * Service Account Name for external-dns.
   */
  public readonly serviceAccountName: string;
  /**
   * Kubernetes Deployment Name for external-dns.
   */
  public readonly deploymentName: string;
  /**
   * Namespace for external-dns.
   * @default - default
   */
  public readonly namespace: string ;
  /**
   * image for external-dns.
   * @default - k8s.gcr.io/external-dns/external-dns:v0.7.3
   */
  public readonly image: string ;
  /**
   * will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones
   *
   * @default - AwsZoneTypeOptions.PUBLIC = public
   */
  public readonly awsZoneType: AwsZoneTypeOptions;

  constructor(scope: Construct, id: string, options: AwsExternalDnsOptions) {
    super(scope, id);
    this.serviceAccountName = options.serviceAccountName ?? 'external-dns';
    this.deploymentName = 'external-dns';
    this.namespace = options.namespace ?? 'default';
    this.image = options.image ?? 'k8s.gcr.io/external-dns/external-dns:v0.7.3';
    this.awsZoneType = options.awsZoneType ?? AwsZoneTypeOptions.PUBLIC;
    new cdk8s.ApiObject(this, 'external-dns-cluster-role', {
      apiVersion: 'rbac.authorization.k8s.io/v1beta1',
      kind: 'ClusterRole',
      metadata: {
        name: 'external-dns',
      },
      rules: [
        {
          apiGroups: [
            '',
          ],
          resources: [
            'services',
            'endpoints',
            'pods',
          ],
          verbs: [
            'get',
            'watch',
            'list',
          ],
        },
        {
          apiGroups: [
            'extensions',
            'networking.k8s.io',
          ],
          resources: [
            'ingresses',
          ],
          verbs: [
            'get',
            'watch',
            'list',
          ],
        },
        {
          apiGroups: [
            '',
          ],
          resources: [
            'nodes',
          ],
          verbs: [
            'list',
            'watch',
          ],
        },
      ],
    });
    new cdk8s.ApiObject(this, 'external-dns-cluster-role-binding', {
      apiVersion: 'rbac.authorization.k8s.io/v1beta1',
      kind: 'ClusterRoleBinding',
      metadata: {
        name: 'external-dns-viewer',
      },
      roleRef: {
        apiGroup: 'rbac.authorization.k8s.io',
        kind: 'ClusterRole',
        name: 'external-dns',
      },
      subjects: [
        {
          kind: 'ServiceAccount',
          name: this.serviceAccountName,
          namespace: this.namespace,
        },
      ],
    });

    new cdk8s.ApiObject(this, 'external-dns-deploy', {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: this.deploymentName,
        namespace: this.namespace,
      },
      spec: {
        strategy: {
          type: 'Recreate',
        },
        selector: {
          matchLabels: {
            app: this.deploymentName,
          },
        },
        template: {
          metadata: {
            labels: {
              app: this.deploymentName,
            },
          },
          spec: {
            serviceAccountName: this.serviceAccountName,
            containers: [
              {
                name: this.deploymentName,
                image: this.image,
                args: [
                  '--source=service',
                  '--source=ingress',
                  '--domain-filter=' + options.domainFilter,
                  '--provider=aws',
                  '--policy=upsert-only',
                  '--aws-zone-type=' + this.awsZoneType,
                  '--registry=txt',
                  '--txt-owner-id=external-dns',
                ],
              },
            ],
            securityContext: {
              fsGroup: 65534,
            },
          },
        },
      },
    });
  }
}
