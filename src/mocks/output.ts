import { Output } from "@/types";

export const outputList: Output[] = [
  {
    entryId: 1,
    fullPath: "root1",
    currentPath: "root1",
    children: [
      {
        entryId: 6,
        fullPath: "root1/path1",
        currentPath: "path1",
        children: [
          {
            entryId: 17,
            fullPath: "root1/path1/path1",
            currentPath: "path1",
            children: [],
          },
        ],
      },
      {
        entryId: 7,
        fullPath: "root1/path2",
        currentPath: "path2",
        children: [],
      },
      {
        entryId: 8,
        fullPath: "root1/path3",
        currentPath: "path3",
        children: [],
      },
    ],
  },
  {
    entryId: 2,
    fullPath: "root2",
    currentPath: "root2",
    children: [
      {
        entryId: 9,
        fullPath: "root2/path1",
        currentPath: "path1",
        children: [],
      },
      {
        entryId: 10,
        fullPath: "root2/path2",
        currentPath: "path2",
        children: [
          {
            entryId: 19,
            fullPath: "root2/path2/path1",
            currentPath: "path1",
            children: [
              {
                entryId: 20,
                fullPath: "root2/path2/path1/path1",
                currentPath: "path1",
                children: [],
              },
            ],
          },
          {
            entryId: 21,
            fullPath: "root2/path2/path2",
            currentPath: "path2",
            children: [],
          },
        ],
      },
      {
        entryId: 11,
        fullPath: "root2/path3",
        currentPath: "path3",
        children: [],
      },
    ],
  },
  {
    entryId: 3,
    fullPath: "root3",
    currentPath: "root3",
    children: [
      {
        entryId: 12,
        fullPath: "root3/path1",
        currentPath: "path1",
        children: [],
      },
      {
        entryId: 13,
        fullPath: "root3/path2",
        currentPath: "path2",
        children: [],
      },
      {
        entryId: 14,
        fullPath: "root3/path3",
        currentPath: "path3",
        children: [],
      },
    ],
  },
];
