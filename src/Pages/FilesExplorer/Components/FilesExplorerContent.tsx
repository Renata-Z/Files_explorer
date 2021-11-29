import React from 'react';
import { FileModel } from '../model/filesGrouping';
import { FilePreview } from './FilePreview';

interface Props {
  file: FileModel | null;
  onFileClick: (id: string) => void;
}
export const FilesExplorerContent = ({ file, onFileClick }: Props) => {
  if (!file) {
    return <div className="files-explorer-content">Welcome</div>;
  }

  if (file.type !== 'folder') {
    return (
      <div
        className="files-explorer-content"
        style={{ flexDirection: 'column' }}
      >
        <FilePreview name={file.name} type={file.type} />
      </div>
    );
  }

  return (
    <div className="files-explorer-content">
      {file.children?.length === 0 && <p>This folder is empty</p>}
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
