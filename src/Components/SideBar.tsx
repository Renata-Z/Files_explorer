import React from 'react';
import { FileModel } from '../Pages/FilesExplorer';
import { SideBarItem } from './SideBarItem';

interface Props {
  files: FileModel[];
}

export const SideBar = ({ files }: Props) => {
  console.log(files);
  return (
    <div className="side-bar-container">
      {files.map((x) => {
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
