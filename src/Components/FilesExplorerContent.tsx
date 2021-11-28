import React from 'react';
import { FileModel } from '../Pages/FilesExplorer';
import { FilePreview } from './FilePreview';

interface Props {
  file: FileModel;
  path: string | null;
  onFileClick: (id: string) => void;
}
export const FilesExplorerContent = ({ file, path, onFileClick }: Props) => {
  if (!!path && file.type !== 'folder') {
    return (
      <div className="files-explorer-content">
        <FilePreview name={file.name} type={file.type} />
      </div>
    );
  }

  if (path) {
    return (
      <div className="files-explorer-content">
        <p>path: {path}</p>
      </div>
    );
  }

  return (
    <div className="files-explorer-content">
      {file.children?.map((x) => (
        <button
          key={x.id}
          className="file-button"
          onClick={() => onFileClick(file.id)}
        >
          {x.type === 'folder' ? (
            <div className="folder-icon" />
          ) : (
            <div className="file-icon">{x.name[1].toUpperCase()}</div>
          )}

          <p className="file-name">{x.name}</p>
        </button>
      ))}
    </div>
  );
};
