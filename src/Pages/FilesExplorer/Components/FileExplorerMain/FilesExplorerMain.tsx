import React from 'react';
import { FileModel } from '../../model/filesGrouping';
import { FilePreview } from './FilePreview';
import { FilesExplorerMainContent } from './FilesExplorerMainContent';

interface Props {
  file: FileModel | null;
  onFileClick: (id: string) => void;
}

export const FilesExplorerMain = ({ file, onFileClick }: Props) => {
  return (
    <div className="files-explorer-content">
      <FilesExplorerMainContent file={file} onFileClick={onFileClick} />
    </div>
  );
};
