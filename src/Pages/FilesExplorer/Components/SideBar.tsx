import React from 'react';
import { FileModel, KeyStringValueBoolean } from '../model/filesGrouping';
import { SideBarTree } from './SideBarTree';

interface Props {
  files: FileModel[];
  expandedFiles: KeyStringValueBoolean;
  onItemClick: (id: string) => void;
}

export const SideBar = ({ files, expandedFiles, onItemClick }: Props) => {
  return (
    <div className="side-bar-container">
      <SideBarTree
        files={files}
        expandedFiles={expandedFiles}
        onItemClick={onItemClick}
      />
    </div>
  );
};
