import { convertListToTree } from "./convertListToTree";
import { inputList } from "../mocks/input";
import { outputList } from "../mocks/output";

describe("convertListToTree", () => {
  it("should generate the correct output", () => {
    const output = convertListToTree(inputList);

    expect(output).toEqual(outputList);
  });
});
