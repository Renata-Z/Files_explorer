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
  data: FileModel[],
  parentFolders: Record<string, ParentFolderInfo>
) => {
  data.forEach((child) => {
    if (child.children && child.children.length > 0) {
      child.children.forEach((deeperChild) => {
        parentFolders[deeperChild.id] = {
          parentId: child.id,
          parentName: child.name,
        };
        if (child.children && child.children.length > 0)
          computeParentFolders(child.children, parentFolders);
      });
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
