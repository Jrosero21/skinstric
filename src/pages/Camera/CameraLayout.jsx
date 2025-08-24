import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

/**
 * Parent layout for /camera. It requests the device camera once and
 * provides the MediaStream to child routes via Outlet context so the
 * stream stays alive across /camera -> /camera/capture.
 */
export default function CameraLayout() {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let localStream;

    (async () => {
      try {
        // Front-facing camera preferred
        localStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        if (!cancelled) setStream(localStream);
      } catch (e) {
        if (!cancelled) setError(e);
      }
    })();

    return () => {
      cancelled = true;
      if (localStream) {
        localStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return <Outlet context={{ stream, error }} />;
}
