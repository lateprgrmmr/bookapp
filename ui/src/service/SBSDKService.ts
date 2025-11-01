import ScanbotSDK from "scanbot-web-sdk";
import type ScanbotSDKInstance from "scanbot-web-sdk";
// import dotenv from "dotenv";
// dotenv.config();

const LICENSE_KEY =
  "e2icMrANnZd4XvpJ0FivQ8uZOOMlj9" +
  "x0sqPxyB1o7DGds2JM3sHtuqkWprBR" +
  "N5pYW3wHVqukTdAig72/3FOiNNdt3G" +
  "uD2sQYy2/EBEDeQ5fWbTznOzpPOBIR" +
  "VkLGQqhkqG8EeDdkjeiwn2iA7Nx3Qv" +
  "RYPHLAsDvdLM1kpRICUcHGb2Y2AJpS" +
  "IEJXKR7Vb+uNNnrZaet4YCTzq2VRYp" +
  "C3GRg1F18AmUtRTDq2kp3qhB4pM0GR" +
  "12QyZyntaDWnG0B9EzoRfdLyiRMCgC" +
  "l+UnXwrTu/9sVW6jynxqw6Uw5B7MiT" +
  "noLPYwH27YRh3YZCUxPmdEarOov86O" +
  "JDGW7zAkyCew==\nU2NhbmJvdFNESw" +
  "psb2NhbGhvc3R8Ym9va2FwcAoxNzYy" +
  "MjE0Mzk5CjgzODg2MDcKOA==\n";

export const ContainerId = {
  BarcodeScanner: "sb-barcode-scanner",
} as const;
const license = LICENSE_KEY || "";

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
        licenseKey: license,
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
