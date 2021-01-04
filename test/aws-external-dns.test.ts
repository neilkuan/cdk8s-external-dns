import { Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import '@aws-cdk/assert/jest';
import { Chart, Testing } from 'cdk8s';
import { AwsExternalDns, AwsExternalDnsPolicyHelper, AwsZoneTypeOptions } from '../src/index';

test('AwsExternalDns', () => {
  const app = Testing.app();
  const chart = new Chart(app, 'test');
  new AwsExternalDns(chart, 'cdk8sAwsExternalDns', {
    domainFilter: 'exmaple.com',
    awsZoneType: AwsZoneTypeOptions.PRIVATE,
    namespace: 'kube-system',
    serviceAccountName: 'external-dns',
    image: 'k8s.gcr.io/external-dns/external-dns:v0.7.3',
  });
  expect(Testing.synth(chart)).toMatchSnapshot();
});

test('AwsExternalDnsPolicy helper', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'test');
  const sa = new Role(stack, 'sarole', {
    assumedBy: new ServicePrincipal('sns.amazonaws.com'),
  });
  AwsExternalDnsPolicyHelper.addPolicy(sa);
  expect(stack).toHaveResource('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: 'route53:ChangeResourceRecordSets',
          Effect: 'Allow',
          Resource: 'arn:aws:route53:::hostedzone/*',
        },
        {
          Action: [
            'route53:ListHostedZones',
            'route53:ListResourceRecordSets',
          ],
          Effect: 'Allow',
          Resource: '*',
        },
      ],
      Version: '2012-10-17',
    },
  });
});