import React from 'react';
import { FileFolderModel } from '../Pages/FilesExplorer';

interface Props {
  filesFolders: FileFolderModel[];
}

export const SideBar = ({ filesFolders }: Props) => {
  return (
    <div className="side-bar-container">
      {filesFolders.map((x) => (
        <p key={x.id}>
          <span>{x.type}</span> {x.name}
        </p>
      ))}
    </div>
  );
};
