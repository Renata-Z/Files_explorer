import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { FilesExplorerContent } from './Components/FilesExplorerContent';
import { SideBar } from './Components/SideBar';
import {
  FileModel,
  FilesDto,
  groupedSortedFiles,
  KeyStringValueBoolean,
} from './model/filesGrouping';

export const FilesExplorer = () => {
  const [files, setFiles] = useState<FileModel[] | null>(null);
  const [expandedFiles, setExpandedFiles] = useState<KeyStringValueBoolean>({});
  const [activeFile, setActiveFile] = useState('');
  const [path, setPath] = useState<string | null>(null);

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

  const handleItemClick = (id: string) => {
    setExpandedFiles((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    setActiveFile(id);
  };

  const handleShowPath = (id: string) => {
    console.log('path', id);
  };

  return (
    <div className="files-explorer">
      <SideBar
        files={groupedSortedFiles(files)}
        expandedFiles={expandedFiles}
        onItemClick={handleItemClick}
      />
      <FilesExplorerContent
        file={groupedSortedFiles(files)[1]}
        path={path}
        onFileClick={handleShowPath}
      />
    </div>
  );
};
