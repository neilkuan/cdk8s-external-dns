
import { App, Chart } from 'cdk8s';
import { Construct } from 'constructs';
import { AwsExternalDns, AwsZoneTypeOptions } from './index';

export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new AwsExternalDns(this, 'cdk8sAwsExternalDns', {
      domainFilter: 'exmaple.com',
      awsZoneType: AwsZoneTypeOptions.PUBLIC,
      namespace: 'default',
      serviceAccountName: 'external-dns',
    });
  }
}
const app = new App();
new MyChart(app, 'test');
app.synth();
