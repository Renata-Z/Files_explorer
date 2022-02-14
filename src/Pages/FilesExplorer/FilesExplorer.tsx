import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FilesExplorerMain } from './Components/FileExplorerMain/FilesExplorerMain';
import { SideBar } from './Components/SideBar/SideBar';
import { FileModel, FilesDto, sortFiles } from './model/filesGrouping';
import { flattenFiles, getParentFoldersPath } from './model/flattening';

export const FilesExplorer = () => {
  const [fileSystemData, setFileSystemData] = useState<FileModel[] | null>(
    null
  );
  const [expandedFilesFolders, setExpandedFilesFolders] = useState<
    Record<string, boolean>
  >({});
  const [activeFileFolderId, setActiveFileFolderId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const url = '/api/v1/tree';
    axios
      .get(url)
      .then((response: AxiosResponse<FilesDto>) => {
        const { data } = response;
        setFileSystemData(data.response);
      })
      .catch((e) => console.log(e));
  }, []);

  if (!fileSystemData) {
    return <p>LOADING............</p>;
  }

  const getContentFiles = () => {
    if (!activeFileFolderId) {
      return null;
    }
    const flattenedFiles = flattenFiles(sortFiles(fileSystemData), {});
    return flattenedFiles[activeFileFolderId];
  };

  const handleSideBarItemClick = (id: string) => {
    setExpandedFilesFolders((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setActiveFileFolderId(id);
  };

  const handleExpandPath = (id: string) => {
    const parentFoldersPath = [...getParentFoldersPath(fileSystemData, id), id];
    parentFoldersPath.forEach((x) => {
      setExpandedFilesFolders((prevState) => ({ ...prevState, [x]: true }));
    });
    setActiveFileFolderId(id);
  };

  return (
    <div className="files-explorer">
      <SideBar
        files={sortFiles(fileSystemData)}
        expandedFiles={expandedFilesFolders}
        onItemClick={handleSideBarItemClick}
      />
      <FilesExplorerMain
        file={getContentFiles()}
        onFileClick={handleExpandPath}
      />
    </div>
  );
};
