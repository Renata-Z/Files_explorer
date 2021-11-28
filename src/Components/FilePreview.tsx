import React from 'react';
import { FileType } from '../Pages/FilesExplorer';

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
