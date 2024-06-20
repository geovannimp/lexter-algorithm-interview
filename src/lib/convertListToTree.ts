import { Input, Output } from "@/types";

const rootSymbol = Symbol("root");

const inputToOutput = ({
  entryId,
  path,
}: Input): Output & { parentFullPath: string | symbol } => {
  const fullPath = path.join("/");
  const currentPath = path[path.length - 1];
  const parentFullPath = path.slice(0, -1).join("/") || rootSymbol; // use symbol to recognize tree root
  return {
    entryId: Number(entryId),
    parentFullPath,
    fullPath,
    children: [],
    currentPath,
  };
};

export const convertListToTree = (inputs: Input[]) => {
  const outputs = inputs
    // Start with the deepest paths in the tree ordered by entryId
    .sort(
      (a, b) =>
        b.path.length - a.path.length || Number(a.entryId) - Number(b.entryId)
    )
    // From the deepest paths, generate parents and children
    .reduce((outputsMap, input) => {
      const { entryId, fullPath, parentFullPath, currentPath } =
        inputToOutput(input);
      const parentChildren = outputsMap.get(parentFullPath);
      const currentChildren = outputsMap.get(fullPath);
      outputsMap.set(parentFullPath, [
        ...(parentChildren ?? []),
        {
          entryId,
          fullPath,
          currentPath,
          children: currentChildren ?? [],
        } as Output,
      ]);
      outputsMap.delete(fullPath);
      return outputsMap;
    }, new Map<string | symbol, Output[]>())
    // The root of the tree is the only entry with a symbol as a parent
    .get(rootSymbol);

  return outputs;
};
