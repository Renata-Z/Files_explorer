import React from 'react';
import { FileModel } from '../../model/filesGrouping';
import { FilePreview } from './FilePreview';
import { FolderPreviewButton } from './FolderPreviewButton';

interface Props {
  file: FileModel | null;
  onFileClick: (id: string) => void;
}

export const FilesExplorerMainContent = ({ file, onFileClick }: Props) => {
  if (!file) {
    return <p>Welcome</p>;
  }

  if (file.type !== 'folder') {
    return <FilePreview name={file.name} type={file.type} />;
  }

  if (file.children?.length === 0) {
    return <p>This folder is empty</p>;
  }
  return (
    <>
      {file.children?.map((x) => (
        <FolderPreviewButton
          key={x.id}
          id={x.id}
          name={x.name}
          type={x.type}
          onFileClick={onFileClick}
        />
      ))}
    </>
  );
};
