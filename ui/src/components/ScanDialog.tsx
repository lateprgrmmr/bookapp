import React, { useRef, useEffect, useCallback } from "react";
import { Modal } from "@mantine/core";
import type {
  BarcodeScannerResultWithSize,
  BarcodeScannerViewConfiguration,
  IBarcodeScannerHandle,
} from "scanbot-web-sdk/@types";
import SBSDKService, { ContainerId } from "../service/SBSDKService";

interface ScanDialogProps {
  opened: boolean;
  onClose: () => void;
  onBarcodeScanned?: (barcodeText: string) => void;
}

export default function ScanDialog(props: ScanDialogProps) {
  const { opened, onClose, onBarcodeScanned } = props;
  const handle = useRef<IBarcodeScannerHandle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [barcodeResult, setBarcodeResult] = React.useState<string | undefined>(
    undefined
  );

  const onBarcodesDetected = useCallback(
    (result: BarcodeScannerResultWithSize) => {
      let text = "";
      result.barcodes.forEach((barcode) => {
        text += `${barcode.text} (${barcode.format})\n`;
      });
      setBarcodeResult(text);

      if (onBarcodeScanned && result.barcodes.length > 0) {
        onBarcodeScanned(result.barcodes[0].text);
      }

      // Close the dialog after successful scan
      setTimeout(() => {
        onClose();
      }, 1000);
    },
    [onClose]
  );

  useEffect(() => {
    if (!opened) {
      handle.current?.dispose();
      handle.current = null;
      return;
    }

    const initScanner = async () => {
      if (!containerRef.current) {
        console.error("container not found");
        return;
      }

      try {
        await SBSDKService.initialize();

        const config: BarcodeScannerViewConfiguration = {
          containerId: ContainerId.BarcodeScanner,
          onBarcodesDetected: onBarcodesDetected,
          detectionParameters: {
            returnBarcodeImage: true,
          },
        };

        handle.current = await SBSDKService.SDK.createBarcodeScanner(config);
        console.log("Scanbot SDK barcode scanner is ready...");
      } catch (error) {
        console.error("failed to initialize scanner...");
      }
    };

    const timer = setTimeout(() => {
      initScanner();
    }, 100);

    return () => {
      clearTimeout(timer);
      handle.current?.dispose();
      handle.current = null;
    };
  }, [opened, onBarcodesDetected]);

  // const fetch;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Scan Barcode"
      size="lg"
      centered
    >
      <div
        ref={containerRef}
        id={ContainerId.BarcodeScanner}
        style={{
          width: "100%",
          height: "500px",
          position: "relative",
          minHeight: "500px",
          backgroundColor: "#000", // Add background so you can see the container
        }}
      />
      {barcodeResult && (
        <div
          style={{ marginTop: "1rem", padding: "1rem", background: "#e7f5ff" }}
        >
          <strong>Scanned:</strong>
          <pre>{barcodeResult}</pre>
        </div>
      )}
    </Modal>
  );
}
