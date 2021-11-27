import React from 'react';
import { FileFolderModel } from '../Pages/FilesExplorer';
import { SideBarItem } from './SideBarItem';

interface Props {
  filesFolders: FileFolderModel[];
}

export const SideBar = ({ filesFolders }: Props) => {
  console.log(filesFolders);
  return (
    <div className="side-bar-container">
      {filesFolders.map((x) => {
        return (
          <SideBarItem
            key={x.id}
            name={x.name}
            children={x.children}
            expandable={x.type === 'folder'}
            expanded={false}
            level={1}
          />
        );
      })}
    </div>
  );
};
