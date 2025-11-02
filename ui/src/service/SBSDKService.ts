import ScanbotSDK from "scanbot-web-sdk";
import type ScanbotSDKInstance from "scanbot-web-sdk";

const LICENSE_KEY = import.meta.env.SCANBOT_LICENSE_KEY || '';

export const ContainerId = {
  BarcodeScanner: "sb-barcode-scanner",
} as const;

class SBSDKServiceClass {
  private sdk: ScanbotSDKInstance | null = null;
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Initialize the SDK - this might need to be adjusted based on actual SDK API
    // Check the scanbot-web-sdk documentation for the correct initialization method
    try {
      this.sdk = await ScanbotSDK.initialize({
        licenseKey: LICENSE_KEY,
        enginePath: "/wasm", // Path to WebAssembly files
      });
      this.initialized = true;
      console.log("Scanbot SDK initialized");
    } catch (error) {
      console.error("Failed to initialize Scanbot SDK:", error);
      throw error;
    }
  }

  get SDK(): ScanbotSDKInstance {
    if (!this.sdk) {
      throw new Error("SDK not initialized. Call initialize() first.");
    }
    return this.sdk;
  }
}

const SBSDKService = new SBSDKServiceClass();
export default SBSDKService;
