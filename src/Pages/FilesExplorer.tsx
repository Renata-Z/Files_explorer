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

export const FilesExplorer = () => {
  const [files, setFiles] = useState<FileModel[] | null>(null);

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

  const sortFilesFolders = () => {
    // naudoti .reduce ir rekursiškai susortinti visą medį!
    const foldersGroup = files
      .filter((x) => x.type === 'folder')
      .sort((a, b) => caseInsensitiveCompare(a.name, b.name));
    const filesGroup = files
      .filter((x) => x.type !== 'folder')
      .sort((a, b) => caseInsensitiveCompare(a.name, b.name));
    return [...foldersGroup, ...filesGroup];
  };

  return (
    <div className="files-explorer">
      <SideBar files={sortFilesFolders()} />
      <FilesExplorerContent />
    </div>
  );
};
