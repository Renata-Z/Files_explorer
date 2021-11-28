import React from 'react';

interface Props {
  id: string;
  name: string;
  level: number;
  expandable?: boolean;
  expanded?: boolean;
  onItemClick: (id: string) => void;
}

export const SideBarItem = ({
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
          color: expanded ? 'green' : 'black',
        }}
        onClick={() => onItemClick(id)}
      >
        {expandable && <span>&#9947;</span>}
        <span>{name}</span>
      </div>
    </>
  );
};
