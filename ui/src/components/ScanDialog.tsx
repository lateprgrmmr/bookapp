import { Button, Modal, Stack } from "@mantine/core";
import { Html5Qrcode, type Html5QrcodeResult } from "html5-qrcode";
import { useCallback, useEffect, useRef, useState } from "react";

interface ScanDialogProps {
  open: boolean;
  onClose: () => void;
  onBarcodeScanned?: (barcode: string) => void;
}

const ScanDialog = (props: ScanDialogProps) => {
  const { open, onClose, onBarcodeScanned } = props;

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef(false);
  const [barcodeResult, setBarcodeResult] = useState<string | undefined>(
    undefined
  );

  const onScanSuccess = useCallback(
    (decodedText: string, decodedResult: Html5QrcodeResult) => {
      setBarcodeResult(
        `${decodedText} (${decodedResult.result.format?.formatName})`
      );

      if (onBarcodeScanned) {
        onBarcodeScanned(decodedText);
      }

      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
        isScanningRef.current = false;
      }

      setTimeout(() => {
        onClose();
      }, 1000);
    },
    [onBarcodeScanned, onClose]
  );

  const onScanError = useCallback(() => {
    // console.error("QR scan error", error);
  }, []);

  useEffect(() => {
    if (!open) {
      if (scannerRef.current && isScanningRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current?.clear();
            isScanningRef.current = false;
            setBarcodeResult(undefined);
          })
          .catch((error) => {
            console.error("Error stopping scanner", error);
          });
      }
      return;
    }

    if (isScanningRef.current) {
      return;
    }

    const initScanner = async () => {
      try {
        const scanner = new Html5Qrcode("html5-qrcode-scanner");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          onScanSuccess,
          onScanError
        );
        isScanningRef.current = true;
      } catch (err) {
        console.error("Error initializing scanner", err);
        try {
          if (scannerRef.current) {
            await scannerRef.current.start(
              { facingMode: "user" },
              { fps: 10, qrbox: { width: 250, height: 250 } },
              onScanSuccess,
              onScanError
            );
            isScanningRef.current = true;
          }
        } catch (err2) {
          console.error("Error starting scanner", err2);
        }
      }
    };

    const timer = setTimeout(() => {
      initScanner();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [open, onScanSuccess, onScanError]);

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Scan Barcode"
      size="lg"
      centered
    >
      <Stack>
        <div
          id="html5-qrcode-scanner"
          style={{ width: "100%", height: "100%", position: "relative" }}
        />
        {barcodeResult && (
          <div>
            <strong>Scanned Barcode:</strong>
            <pre>{barcodeResult}</pre>
          </div>
        )}
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </Stack>
    </Modal>
  );
};

export default ScanDialog;
