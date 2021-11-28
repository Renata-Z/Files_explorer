import React from 'react';
import { FileModel } from '../Pages/FilesExplorer';

interface Props {
  name: string;
  children?: FileModel[];
  expandable: boolean;
  expanded: boolean;
  level: number;
}

export const SideBarItem = ({
  name,
  children,
  expandable,
  expanded,
  level,
}: Props) => {
  return (
    <>
      <div className="tree-node" style={{ paddingLeft: `${level * 10}px` }}>
        {expandable && <span style={{ width: '18px' }}>&#9947;</span>}
        <span>{name}</span>
      </div>

      {children &&
        children.length > 0 &&
        children.map((y) => (
          <SideBarItem
            key={y.id}
            name={y.name}
            children={y.children}
            expandable={y.type === 'folder'}
            expanded={false}
            level={level + 1}
          />
        ))}
    </>
  );
};
