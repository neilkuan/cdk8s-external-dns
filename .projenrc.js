const { ConstructLibrary } = require('projen');
const PROJECT_DESCRIPTION = 'cdk8s-external-dns is an CDK8S construct library that provides External Dns Configure.';
const CDK_VERSION = '1.82.0';
const CDK8S_VERSION = '0.33.0';
const CONSTRCUTS_VERSION = '3.2.90';
const project = new ConstructLibrary({
  description: PROJECT_DESCRIPTION,
  author: 'Neil Kuan',
  authorAddress: 'guan840912@gmail.com',
  name: 'cdk8s-external-dns',
  repositoryUrl: 'https://github.com/guan840912/cdk8s-external-dns.git',
  catalog: {
    twitter: 'neil_kuan',
    announce: true,
  },
  defaultReleaseBranch: 'main',
  releaseBranches: ['main'],
  keywords: ['aws', 'cdk8s', 'external-dns'],
  python: {
    distName: 'cdk8s-external-dns',
    module: 'cdk8s_external_dns',
  },
  dependabot: false,
  deps: [
    `cdk8s@^${CDK8S_VERSION}`,
    `cdk8s-plus@^${CDK8S_VERSION}`,
    `constructs@^${CONSTRCUTS_VERSION}`,
    `@aws-cdk/aws-iam@^${CDK_VERSION}`,
  ],
  devDeps: [
    `@aws-cdk/core@^${CDK_VERSION}`,
    `@aws-cdk/assert@^${CDK_VERSION}`,
    `@aws-cdk/aws-iam@^${CDK_VERSION}`,
  ],
  peerDeps: [
    `cdk8s@^${CDK8S_VERSION}`,
    `cdk8s-plus@^${CDK8S_VERSION}`,
    `constructs@^${CONSTRCUTS_VERSION}`,
    `@aws-cdk/aws-iam@^${CDK_VERSION}`,
  ],
});

project.synth();
