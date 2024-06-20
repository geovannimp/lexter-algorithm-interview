export interface Input {
  entryId: string;
  path: string[];
}
export interface Output {
  entryId: number;
  fullPath: string;
  currentPath: string;
  children: Output[];
}
