import { Html5Qrcode } from "html5-qrcode";

export const ContainerId = {
  BarcodeScanner: "html5-qrcode-scanner",
} as const;

export default class Html5QrcodeServiceClass {
  createScanner(containerId: string): Html5Qrcode {
    return new Html5Qrcode(containerId);
  }
}

export const Html5QrcodeService = new Html5QrcodeServiceClass();
