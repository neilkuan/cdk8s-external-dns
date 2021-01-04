[![NPM version](https://badge.fury.io/js/cdk8s-external-dns.svg)](https://badge.fury.io/js/cdk8s-external-dns)
[![PyPI version](https://badge.fury.io/py/cdk8s-external-dns.svg)](https://badge.fury.io/py/cdk8s-external-dns)
![Release](https://github.com/guan840912/cdk8s-external-dns/workflows/Release/badge.svg)

![Downloads](https://img.shields.io/badge/-DOWNLOADS:-brightgreen?color=gray)
![npm](https://img.shields.io/npm/dt/cdk8s-external-dns?label=npm&color=orange)
![PyPI](https://img.shields.io/pypi/dm/cdk8s-external-dns?label=pypi&color=blue)

# cdk8s-external-dns
> [cdk8s external dns](https://github.com/kubernetes-sigs/external-dns) constructs for cdk8s

Basic implementation of a [external dns](https://github.com/kubernetes-sigs/external-dns) construct for cdk8s. Contributions are welcome!

## Usage
### CDK External Dns
```ts
import { App, Chart } from 'cdk8s';
import { Construct } from 'constructs';
import { AwsExternalDns, AwsZoneTypeOptions } from 'cdk8s-external-dns';

// default will deploy to default namespace.
export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new AwsExternalDns(this, 'cdk8sAwsExternalDns', {
      domainFilter: 'exmaple.com',
      awsZoneType: AwsZoneTypeOptions.PUBLIC,
    });
  }
}
const app = new App();
new MyChart(app, 'testcdk8s');
app.synth();
```

# Featrue For Add IAM Policy.
- For IRSA add IAM Policy.
```ts
// CDK APP like eks_cluster.ts
import { AwsExternalDnsPolicyHelper } from 'cdk8s-external-dns';
import * as eks from '@aws-cdk/aws-eks';
    const cluster = new eks.Cluster(this, 'MyK8SCluster', {
      defaultCapacity: 0,
      mastersRole: clusterAdmin,
      version: eks.KubernetesVersion.V1_18,
    });

    const externalDnsServiceAccount = cluster.addServiceAccount('external-dns', {
      name: 'external-dns',
    });

    // will help you add policy to IAM Role .
    AwsExternalDnsPolicyHelper.addPolicy(externalDnsServiceAccount);
```
Also can see [example repo](https://github.com/guan840912/cdk8s-cdk-example)
## License

Distributed under the [Apache 2.0](./LICENSE) license.