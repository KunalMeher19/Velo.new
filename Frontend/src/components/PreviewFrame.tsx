import { WebContainer } from '@webcontainer/api';
import React, { useEffect, useState } from 'react';

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer;
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState("");

  const main = React.useCallback(async () => {
    const storedUrl = localStorage.getItem("previewUrl");
    if (storedUrl) {
      setUrl(storedUrl);
    }

    const installProcess = await webContainer.spawn('npm', ['install']);

    installProcess.output.pipeTo(new WritableStream({
      write(data) {
        console.log(data);
      }
    }));

    await webContainer.spawn('npm', ['run', 'dev']);

    // Wait for `server-ready` event
    webContainer.on('server-ready', (port, generatedUrl) => {
      console.log(generatedUrl);
      console.log(port);

      if (generatedUrl !== storedUrl) {
        setUrl(generatedUrl);
        localStorage.setItem("previewUrl", generatedUrl);
      }
    });
  }, [webContainer]);

  useEffect(() => {
    main();
  }, [main, files]);

  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url && <div className="text-center">
        <p className="mb-2">Loading...</p>
      </div>}
      {url && <iframe width={"100%"} height={"100%"} src={url} />}
    </div>
  );
}