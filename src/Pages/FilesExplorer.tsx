import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { FilesExplorerContent } from '../Components/FilesExplorerContent';
import { SideBar } from '../Components/SideBar';
import { caseInsensitiveCompare } from '../utils/strings';

type FileType = 'doc' | 'image' | 'folder';

export interface FileFolderModel {
  id: string;
  name: string;
  type: FileType;
  children?: FileFolderModel[];
}

interface FilesFoldersDto {
  response: FileFolderModel[];
}

export const FilesExplorer = () => {
  const [filesFolders, setFilesFolders] = useState<FileFolderModel[] | null>(
    null
  );

  useEffect(() => {
    const url = '/api/v1/tree';
    try {
      axios.get(url).then((response: AxiosResponse<FilesFoldersDto>) => {
        const { data } = response;
        setFilesFolders(data.response);
      });
    } catch (e) {
      console.error('Something went wrong', e);
    }
  }, []);

  if (!filesFolders) {
    return <p>LOADING............</p>;
  }

  const sortedFilesFolders = () => {
    // naudoti .reduce ir rekursiškai susortinti visą medį!
    const folders = filesFolders
      .filter((x) => x.type === 'folder')
      .sort((a, b) => caseInsensitiveCompare(a.name, b.name));
    const files = filesFolders
      .filter((x) => x.type !== 'folder')
      .sort((a, b) => caseInsensitiveCompare(a.name, b.name));
    return [...folders, ...files];
  };

  return (
    <div className="files-explorer">
      <SideBar filesFolders={sortedFilesFolders()} />
      <FilesExplorerContent />
    </div>
  );
};
