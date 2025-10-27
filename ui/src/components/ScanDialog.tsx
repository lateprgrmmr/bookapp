import { Button, Modal, Stack, Text, Box } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import {
  BrowserMultiFormatReader,
  type IScannerControls,
} from "@zxing/browser";

interface ScanDialogProps {
  opened: boolean;
  onClose: () => void;
}

const ScanDialog = (props: ScanDialogProps) => {
  const { opened, onClose } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [codeReader, setCodeReader] = useState<BrowserMultiFormatReader | null>(
    null
  );
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const mediaStreamRef = useRef<IScannerControls | null>(null);

  useEffect(() => {
    if (opened) {
      const reader = new BrowserMultiFormatReader();
      setCodeReader(reader);
    } else {
      // Clean up when dialog closes
      stopScanning();
    }
  }, [opened]);

  const stopScanning = () => {
    // Stop the media stream tracks to turn off camera
    if (mediaStreamRef.current) {
      mediaStreamRef.current.stop();
      mediaStreamRef.current = null;
    }

    // Clear video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
    setDebugInfo("");
  };

  const startScanning = async () => {
    if (!codeReader || !videoRef.current) return;

    try {
      setIsScanning(true);
      setError(null);
      setDebugInfo("Starting camera...");

      //   const constraints = {
      //     video: {
      //         width: { ideal: 1280 },
      //         height: { ideal: 720 },
      //         facingMode: "environment",
      //     }
      //   };

      // Start scanning and store the media stream
      const controls = await codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, error) => {
          if (result) {
            console.log("Barcode detected:", result.getText());
            setDebugInfo(`Barcode detected: ${result.getText()}`);
            alert(`Barcode detected: ${result.getText()}`);
            stopScanning();
            onClose();
          }
          if (error && !(error instanceof Error)) {
            console.log("Scan error:", error);
            setDebugInfo(`Scan error: ${error}`);
          }
        }
      );

      // Store the media stream for cleanup
      mediaStreamRef.current = controls;
      setDebugInfo("Camera started successfully.");
    } catch (err) {
      console.error("Camera error:", err);
      setError("Failed to access camera. Please check permissions.");
      setIsScanning(false);
      setDebugInfo(`Camera error: ${err}`);
    }
  };

  const handleClose = () => {
    stopScanning();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Scan Book Barcode"
      centered
      size="lg"
    >
      <Stack gap="md">
        <Text>Position your book's barcode within the camera view.</Text>
        <Text size="sm" c="dimmed">
          Make sure the barcode is well-lit and clearly visible. Try different
          angles and distances.
        </Text>

        <Box
          style={{
            position: "relative",
            width: "100%",
            height: "300px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            playsInline
            muted
            autoPlay
          />
          {!isScanning && (
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "#666",
              }}
            >
              <Text>Camera preview will appear here</Text>
            </Box>
          )}

          {debugInfo && (
            <Text size="sm" c="blue">
              {debugInfo}
            </Text>
          )}

          {error && (
            <Text c="red" size="sm">
              {error}
            </Text>
          )}
        </Box>

        {error && (
          <Text c="red" size="sm">
            {error}
          </Text>
        )}

        <Stack gap="sm">
          {!isScanning ? (
            <Button onClick={startScanning} fullWidth>
              Start Scanning
            </Button>
          ) : (
            <Button onClick={stopScanning} variant="outline" fullWidth>
              Stop Scanning
            </Button>
          )}

          <Button onClick={handleClose} variant="outline" fullWidth>
            Cancel
          </Button>
          <Text size="xs" c="dimmed">
            Supported formats: QR Code, EAN-13, EAN-8, UPC-A, UPC-E, Code 128,
            Code 39
          </Text>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ScanDialog;
