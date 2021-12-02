import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { FilesExplorerMain } from './Components/FileExplorerMain/FilesExplorerMain';
import { SideBar } from './Components/SideBar/SideBar';
import { FileModel, FilesDto, groupedSortedFiles } from './model/filesGrouping';
import { flattenFiles, getParentFoldersPath } from './model/flattening';

export const FilesExplorer = () => {
  const [files, setFiles] = useState<FileModel[] | null>(null);
  const [expandedFiles, setExpandedFiles] = useState<Record<string, boolean>>(
    {}
  );
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

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

  const getContentFiles = () => {
    if (!activeFileId) {
      return null;
    }
    const flattenedFiles = flattenFiles(groupedSortedFiles(files), {});
    return flattenedFiles[activeFileId];
  };

  const handleSideBarItemClick = (id: string) => {
    setExpandedFiles((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    setActiveFileId(id);
  };

  const handleExpandPath = (id: string) => {
    const parentFoldersPath = getParentFoldersPath(files, id);
    parentFoldersPath.forEach((x) => {
      setExpandedFiles((prevState) => ({ ...prevState, [id]: true }));
    });
    setActiveFileId(id);
  };

  return (
    <div className="files-explorer">
      <SideBar
        files={groupedSortedFiles(files)}
        expandedFiles={expandedFiles}
        onItemClick={handleSideBarItemClick}
      />
      <FilesExplorerMain
        file={getContentFiles()}
        onFileClick={handleExpandPath}
      />
    </div>
  );
};
