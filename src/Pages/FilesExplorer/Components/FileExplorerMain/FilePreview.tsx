import React from 'react';
import { FileType } from '../../model/filesGrouping';

interface Props {
  name: string;
  type: FileType;
}

export const FilePreview = ({ name, type }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} title={name}>
      <p>name: {name}</p>
      <p>type: {type}</p>
    </div>
  );
};
