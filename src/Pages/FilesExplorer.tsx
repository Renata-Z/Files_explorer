import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { FilesExplorerContent } from '../Components/FilesExplorerContent';
import { SideBar } from '../Components/SideBar';

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

  return (
    <div className="files-explorer">
      <SideBar filesFolders={filesFolders} />
      <FilesExplorerContent />
    </div>
  );
};
