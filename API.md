# API Reference

**Classes**

Name|Description
----|-----------
[AwsExternalDns](#cdk8s-external-dns-awsexternaldns)|Generate external-dns config yaml.
[AwsExternalDnsPolicyHelper](#cdk8s-external-dns-awsexternaldnspolicyhelper)|Aws External Dns Policy class ,help you add policy to your Iam Role for service account.


**Structs**

Name|Description
----|-----------
[AwsExternalDnsOptions](#cdk8s-external-dns-awsexternaldnsoptions)|*No description*


**Enums**

Name|Description
----|-----------
[AwsZoneTypeOptions](#cdk8s-external-dns-awszonetypeoptions)|*No description*



## class AwsExternalDns  <a id="cdk8s-external-dns-awsexternaldns"></a>

Generate external-dns config yaml.

see https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md

__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new AwsExternalDns(scope: Construct, id: string, options: AwsExternalDnsOptions)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **options** (<code>[AwsExternalDnsOptions](#cdk8s-external-dns-awsexternaldnsoptions)</code>)  *No description*
  * **domainFilter** (<code>string</code>)  will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones. 
  * **awsZoneType** (<code>[AwsZoneTypeOptions](#cdk8s-external-dns-awszonetypeoptions)</code>)  will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones. __*Default*__: AwsZoneTypeOptions.PUBLIC = public
  * **image** (<code>string</code>)  image for external-dns. __*Default*__: k8s.gcr.io/external-dns/external-dns:v0.7.3
  * **namespace** (<code>string</code>)  Namespace for external-dns. __*Default*__: default
  * **serviceAccountName** (<code>string</code>)  Service Account Name for external-dns. __*Default*__: external-dns



### Properties


Name | Type | Description 
-----|------|-------------
**awsZoneType** | <code>[AwsZoneTypeOptions](#cdk8s-external-dns-awszonetypeoptions)</code> | will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones.
**deploymentName** | <code>string</code> | Kubernetes Deployment Name for external-dns.
**image** | <code>string</code> | image for external-dns.
**namespace** | <code>string</code> | Namespace for external-dns.
**serviceAccountName** | <code>string</code> | Service Account Name for external-dns.



## class AwsExternalDnsPolicyHelper  <a id="cdk8s-external-dns-awsexternaldnspolicyhelper"></a>

Aws External Dns Policy class ,help you add policy to your Iam Role for service account.


### Initializer




```ts
new AwsExternalDnsPolicyHelper()
```



### Methods


#### *static* addPolicy(role) <a id="cdk8s-external-dns-awsexternaldnspolicyhelper-addpolicy"></a>



```ts
static addPolicy(role: any): any
```

* **role** (<code>any</code>)  *No description*

__Returns__:
* <code>any</code>



## struct AwsExternalDnsOptions  <a id="cdk8s-external-dns-awsexternaldnsoptions"></a>






Name | Type | Description 
-----|------|-------------
**domainFilter** | <code>string</code> | will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones.
**awsZoneType**? | <code>[AwsZoneTypeOptions](#cdk8s-external-dns-awszonetypeoptions)</code> | will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones.<br/>__*Default*__: AwsZoneTypeOptions.PUBLIC = public
**image**? | <code>string</code> | image for external-dns.<br/>__*Default*__: k8s.gcr.io/external-dns/external-dns:v0.7.3
**namespace**? | <code>string</code> | Namespace for external-dns.<br/>__*Default*__: default
**serviceAccountName**? | <code>string</code> | Service Account Name for external-dns.<br/>__*Default*__: external-dns



## enum AwsZoneTypeOptions  <a id="cdk8s-external-dns-awszonetypeoptions"></a>



Name | Description
-----|-----
**PUBLIC** |will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones.
**PRIVATE** |will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones.


