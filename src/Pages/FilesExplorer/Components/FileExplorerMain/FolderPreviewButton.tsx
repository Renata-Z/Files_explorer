import React from 'react';
import { FileType } from '../../model/filesGrouping';

interface Props {
  id: string;
  name: string;
  type: FileType;
  onFileClick: (id: string) => void;
}

export const FolderPreviewButton = ({ id, name, type, onFileClick }: Props) => {
  return (
    <button
      className="file-button"
      title={name}
      onClick={() => onFileClick(id)}
    >
      {type === 'folder' ? (
        <div className="folder-icon" />
      ) : (
        <div className="file-icon">{name[1].toUpperCase()}</div>
      )}

      <p className="file-name">{name}</p>
    </button>
  );
};
