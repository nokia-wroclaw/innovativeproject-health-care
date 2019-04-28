import { confirmDelete, isAsync } from "./../functions";

const fn = () => {
  return "hello world";
};
const asyncFn = async () => {
  await setTimeout(() => "hello ", 100);
  return "world";
};

describe("isAsync", () => {
  it("should return false for non-async function", () => {
    expect(isAsync(fn)).toBe(false);
  });
  it("should return true for async function", () => {
    expect(isAsync(asyncFn)).toBe(true);
  });
});
