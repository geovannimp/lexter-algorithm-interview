import { generateOutput } from "./index";
import { inputList } from "./input";
import { outputList } from "./output";

describe("generateOutput", () => {
  it("should generate the correct output", () => {
    const output = generateOutput(inputList);

    expect(output).toEqual(outputList);
  });
});
