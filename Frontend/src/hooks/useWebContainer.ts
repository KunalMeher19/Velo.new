import { useEffect, useState } from "react";
import { WebContainer } from '@webcontainer/api';

export function useWebContainer() {
    const [webcontainer, setWebcontainer] = useState<WebContainer>();

    async function main() {
        const webcontainerInstance = await WebContainer.boot();
        setWebcontainer(webcontainerInstance)

        const installProcess = await webcontainerInstance.spawn('npm', ['install']);
        installProcess.output.pipeTo(new WritableStream({
            write(data) {
                console.log(data);
            }
        }));
        
    }
    useEffect(() => {
        main();
    }, [])

    return webcontainer;
}