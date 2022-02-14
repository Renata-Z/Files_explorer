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

const compareFileTypes = (typeA: FileType, typeB: FileType): number => {
  if (typeA === 'folder') {
    return -1;
  }
  if (typeB !== 'folder') {
    return -1;
  }
  return 0;
};

export const sortFiles = (files: FileModel[]): FileModel[] =>
  [...files]
    .sort((a, b) => caseInsensitiveCompare(a.name, b.name))
    .sort((a, b) => compareFileTypes(a.type, b.type))
    .map((x) => ({
      ...x,
      children: x.children ? sortFiles(x.children) : undefined,
    }));
