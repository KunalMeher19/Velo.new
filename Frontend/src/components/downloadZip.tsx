import JSZip from 'jszip';
import { FileItem } from '../types';

export const createZipFromFiles = async (files: FileItem[]): Promise<Blob> => {
  const zip = new JSZip();

  const addToZip = (zipFolder: JSZip, file: FileItem) => {
    if (file.type === 'folder' && file.children) {
      const folder = zipFolder.folder(file.name);
      file.children.forEach(child => {
        addToZip(folder!, child);
      });
    } else if (file.type === 'file') {
      zipFolder.file(file.name, file.content || '');
    }
  };

  files.forEach(file => addToZip(zip, file));

  return zip.generateAsync({ type: 'blob' });
};
