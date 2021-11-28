import React from 'react';
import { FileType } from '../model/filesGrouping';

interface Props {
  name: string;
  type: FileType;
}

export const FilePreview = ({ name, type }: Props) => {
  return (
    <>
      <p>name: {name}</p>
      <p>type: {type}</p>
    </>
  );
};
