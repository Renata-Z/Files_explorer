import React from 'react';
import { FileModel } from '../../model/filesGrouping';
import { SideBarNode } from './SideBarNode';

interface Props {
  files: FileModel[] | undefined;
  expandedFiles: Record<string, boolean>;
  level?: number;
  onItemClick: (id: string) => void;
}

export const SideBarTree = ({
  files,
  expandedFiles,
  level = 1,
  onItemClick,
}: Props) => {
  if (!files) {
    return null;
  }

  const renderChildren = (children: FileModel[], nextLevel: number) => {
    if (children.length === 0) {
      return (
        <SideBarNode
          id={`${nextLevel}-empty`}
          name="No files"
          level={nextLevel}
          onItemClick={() => {}}
        />
      );
    }
    return (
      <SideBarTree
        files={children}
        level={nextLevel}
        expandedFiles={expandedFiles}
        onItemClick={onItemClick}
      />
    );
  };

  return (
    <div>
      {files.map((x) => (
        <React.Fragment key={x.id}>
          <SideBarNode
            id={x.id}
            name={x.name}
            level={level}
            expandable={x.type === 'folder'}
            expanded={expandedFiles[x.id]}
            onItemClick={onItemClick}
          />

          {expandedFiles[x.id] &&
            x.type === 'folder' &&
            x.children &&
            renderChildren(x.children, level + 1)}
        </React.Fragment>
      ))}
    </div>
  );
};
