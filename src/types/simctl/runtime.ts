export interface RuntimeListResponse {
  runtimes: Runtime[];
}

interface RuntimeSupportedDevice {
  bundlePath: string;
  name: string;
  identifier: string;
  productFamily: string;
}

export type RuntimePlatform = "iOS";

export interface Runtime {
  bundlePath: string;
  buildversion: string;
  platform: RuntimePlatform;
  runtimeRoot: string;
  identifier: string;
  version: string;
  isInternal: boolean;
  isAvailable: boolean;
  name: string;
  supportedDeviceTypes: RuntimeSupportedDevice[];
}
