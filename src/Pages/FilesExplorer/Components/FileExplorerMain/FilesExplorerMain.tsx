import React from 'react';
import { FileModel } from '../../model/filesGrouping';
import { FilePreview } from './FilePreview';
import { FilesExplorerMainContent } from './FilesExplorerMainContent';

interface Props {
  file: FileModel | null;
  path: string[] | null;
  onFileClick: (id: string) => void;
}

export const FilesExplorerMain = ({ file, path, onFileClick }: Props) => {
  return (
    <div className="files-explorer-content">
      <FilesExplorerMainContent
        file={file}
        path={path}
        onFileClick={onFileClick}
      />
    </div>
  );
};
