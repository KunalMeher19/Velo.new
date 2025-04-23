import { WebContainer } from '@webcontainer/api';
import React, { useEffect, useState } from 'react';

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer;
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    async function initializePreview() {
      if (!webContainer) {
        console.warn("WebContainer not initialized.");
        return;
      }

      try {
        // Ensure dependencies are installed
        await webContainer.spawn('npm', ['install']);

        // Start the development server
        await webContainer.spawn('npm', ['run', 'dev']);

        webContainer.on('server-ready', (port, serverUrl) => {
          console.log("Server ready on port:", port, "URL:", serverUrl);
          setUrl(serverUrl);

        });
      } catch (error) {
        console.error("Error initializing WebContainer:", error);
      }
    }

    initializePreview();
  }, [webContainer]);

  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url ? (
        <div className="text-center">
            <p className="mb-2 animate-pulse">Loading...</p>
          <p></p>
        </div>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={url} // Use the reactive `url` state
          title="Preview"
        />
      )}
    </div>
  );
}