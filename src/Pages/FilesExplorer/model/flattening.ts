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
