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
  const [path, setPath] = useState<string[] | null>(null);

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

  const handleItemClick = (id: string) => {
    setPath(null);
    setExpandedFiles((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    setActiveFileId(id);
  };

  const handleShowPath = (id: string) => {
    const mockData: FileModel[] = [
      {
        id: '123',
        name: 'A',
        type: 'folder',
        children: [
          {
            id: '123-1',
            name: 'A-1',
            type: 'folder',
            children: [
              {
                id: '123-1-1',
                name: 'A-1-1',
                type: 'folder',
                children: [
                  {
                    id: '123-1-1-1',
                    name: 'A-1-1-1',
                    type: 'folder',
                    children: [],
                  },
                  {
                    id: '123-1-1-2',
                    name: 'A-1-1-2',
                    type: 'folder',
                    children: [],
                  },
                ],
              },
            ],
          },
          { id: '123-2', name: 'A-2', type: 'folder', children: [] },
        ],
      },
      {
        id: '124',
        name: 'B',
        type: 'folder',
        children: [
          { id: '124-1', name: 'B-1', type: 'folder', children: [] },
          { id: '124-2', name: 'B-2', type: 'doc' },
        ],
      },
      {
        id: '125',
        name: 'C',
        type: 'folder',
        children: [
          { id: '125-1', name: 'C-1', type: 'folder', children: [] },
          { id: '125-2', name: 'C-2', type: 'image' },
        ],
      },
    ];
    const path = getParentFoldersPath(mockData, '123-1-1-2');
    // const path = getParentPersonsPath(files, id);
    setPath(path);
  };

  return (
    <div className="files-explorer">
      <SideBar
        files={groupedSortedFiles(files)}
        expandedFiles={expandedFiles}
        onItemClick={handleItemClick}
      />
      <FilesExplorerMain
        file={getContentFiles()}
        path={path}
        onFileClick={handleShowPath}
      />
    </div>
  );
};
