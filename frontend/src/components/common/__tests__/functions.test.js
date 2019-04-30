import {
  confirmDelete,
  isAsync,
  replaceNotLettersWithSpace,
  replaceSpaceWithUnderscore,
  removeSpaceAtBegening
} from "./../functions";

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

describe("replaceNotLettersWithSpace", () => {
  it("should return 'ab c' for 'ab)c'", () => {
    expect(replaceNotLettersWithSpace("ab)c")).toBe("ab c");
  });
  it("should return 'pizza' for 'pizza'", () => {
    expect(replaceNotLettersWithSpace("pizza")).toBe("pizza");
  });
  it("should return ' pi zza ' for '.(pi_zza)'", () => {
    expect(replaceNotLettersWithSpace(".(pi_zza)")).toBe("  pi zza ");
  });
});

describe("replaceSpaceWithUnderscore", () => {
  it("should return 'ab_c' for 'ab c'", () => {
    expect(replaceSpaceWithUnderscore("ab c")).toBe("ab_c");
  });
  it("should return '_pizza_' for ' pizza '", () => {
    expect(replaceSpaceWithUnderscore(" pizza ")).toBe("_pizza_");
  });
  it("should return 'p_i_z_z_a' for 'p i z z a'", () => {
    expect(replaceSpaceWithUnderscore("p i z z a")).toBe("p_i_z_z_a");
  });
});

describe("removeSpaceAtBegening", () => {
  it("should return 'ab c' for '   ab c'", () => {
    expect(removeSpaceAtBegening("   ab c")).toBe("ab c");
  });
  it("should return 'pizza ' for 'pizza '", () => {
    expect(removeSpaceAtBegening("pizza ")).toBe("pizza ");
  });
  it("should return 'pi zza ' for ' pi zza '", () => {
    expect(removeSpaceAtBegening(" pi zza ")).toBe("pi zza ");
  });
});
