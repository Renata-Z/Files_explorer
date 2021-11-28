import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { FilesExplorerContent } from '../Components/FilesExplorerContent';
import { SideBar } from '../Components/SideBar';
import { caseInsensitiveCompare } from '../utils/strings';

type FileType = 'doc' | 'image' | 'folder';
export interface FileModel {
  id: string;
  name: string;
  type: FileType;
  children?: FileModel[];
}

interface FilesDto {
  response: FileModel[];
}

export interface KeyStringValueBoolean {
  [key: string]: boolean;
}

const sortFiles = (files: FileModel[]): FileModel[] =>
  [...files]
    .sort((a, b) => caseInsensitiveCompare(a.name, b.name))
    .map((x) => ({
      ...x,
      children: x.children ? sortFiles(x.children) : undefined,
    }));

const groupFilesFolders = (files: FileModel[]): FileModel[] => {
  const foldersGroup = files.filter((x) => x.type === 'folder');
  const filesGroup = files.filter((x) => x.type !== 'folder');

  return [...foldersGroup, ...filesGroup].map((x) => ({
    ...x,
    children:
      x.children && x.children.length ? groupFilesFolders(x.children) : [],
  }));
};

export const FilesExplorer = () => {
  const [files, setFiles] = useState<FileModel[] | null>(null);
  const [expandedFiles, setExpandedFiles] = useState<KeyStringValueBoolean>({});

  useEffect(() => {
    const url = '/api/v1/tree';
    try {
      axios.get(url).then((response: AxiosResponse<FilesDto>) => {
        const { data } = response;
        setFiles(data.response);
      });
    } catch (e) {
      console.error('Something went wrong', e);
    }
  }, []);

  if (!files) {
    return <p>LOADING............</p>;
  }

  const groupedSortedFiles = groupFilesFolders(sortFiles(files));

  const handleItemClick = (id: string) => {
    setExpandedFiles((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <div className="files-explorer">
      <SideBar
        files={groupedSortedFiles}
        expandedFiles={expandedFiles}
        onItemClick={handleItemClick}
      />
      <FilesExplorerContent />
    </div>
  );
};
