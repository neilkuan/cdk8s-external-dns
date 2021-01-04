export enum AwsZoneTypeOptions {
  /**
   * will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones
   */
  PUBLIC = 'public',
  /**
   * will make ExternalDNS see only the hosted zones matching provided domain, omit to process all available hosted zones
   */
  PRIVATE = 'private',
}