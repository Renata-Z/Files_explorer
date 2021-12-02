import { FileModel } from './filesGrouping';

export const flattenFiles = (
  files: FileModel[],
  acc: Record<string, FileModel>
): Record<string, FileModel> =>
  files.reduce((acc, file) => {
    let key = file.id;
    acc[key] = file;

    if (file.children && file.children.length > 0)
      flattenFiles(file.children, acc);

    return acc;
  }, acc as Record<string, FileModel>);

interface ParentFolderInfo {
  parentId: string;
  parentName: string;
}

const computeParentFolders = (
  files: FileModel[],
  parentFolders: Record<string, ParentFolderInfo> = {},
  parent?: FileModel
) => {
  files.forEach((file) => {
    if (parent) {
      parentFolders[file.id] = {
        parentId: parent.id,
        parentName: parent.name,
      };
    }
    if (file.children) {
      computeParentFolders(file.children, parentFolders, file);
    }
  });

  return parentFolders;
};

const getParentFolderPath = (
  id: string,
  result: string[],
  parentsInfo: Record<string, ParentFolderInfo>
): string[] => {
  const parent = parentsInfo[id];
  if (!parent) {
    return result;
  }

  const { parentId, parentName } = parent;
  return getParentFolderPath(parentId, [parentName, ...result], parentsInfo);
};

export const getParentFoldersPath = (data: FileModel[], personId: string) => {
  const parentsInfo = computeParentFolders(data, {});
  const parentPersonPath = getParentFolderPath(personId, [], parentsInfo);
  return parentPersonPath;
};
