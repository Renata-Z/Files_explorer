import { caseInsensitiveCompare } from '../../../utils/strings';

export type FileType = 'doc' | 'image' | 'folder';

export interface FileModel {
  id: string;
  name: string;
  type: FileType;
  children?: FileModel[];
}

export interface FilesDto {
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

export const groupedSortedFiles = (files: FileModel[]) =>
  groupFilesFolders(sortFiles(files));
