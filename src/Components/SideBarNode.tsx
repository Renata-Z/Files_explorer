import React from 'react';

interface Props {
  id: string;
  name: string;
  level: number;
  expandable?: boolean;
  expanded?: boolean;
  onItemClick: (id: string) => void;
}

export const SideBarNode = ({
  id,
  name,
  level,
  expandable,
  expanded,
  onItemClick,
}: Props) => {
  return (
    <>
      <div
        className="tree-node"
        style={{
          paddingLeft: `${level * 15}px`,
        }}
        onClick={() => onItemClick(id)}
      >
        {expandable && (
          <span className={expanded ? 'rotate' : ''}>&#9947;</span>
        )}
        <span style={{ paddingLeft: '5px' }}>{name}</span>
      </div>
    </>
  );
};
