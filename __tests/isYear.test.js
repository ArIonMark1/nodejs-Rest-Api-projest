const { isLeapYear, degree } = require("./isYear");

describe("test isLeapYear function", () => {
  beforeAll(() => {
    console.log("Test LeapYear function...");
  });
  test("2008 - true", () => {
    const result = isLeapYear(2008);
    expect(result).toBe(true);
  });
  test("{} - error 'year must be number'", () => {
    expect(() => isLeapYear({})).toThrow("year must be number");
  });
});

// describe("hooks", () => {
//   beforeAll(() => {
//     console.log("Start Testing...");
//   });
//   test("1 to power 2 to equal 1", () => {
//     try {
//       expect(degree(1, 2)).toBe(1);
//       console.log("Completed successfully");
//     } catch (error) {
//       console.log("Failed", error.message);
//     }
//   });
//   test("3 to power 2 to equal 9", () => {
//     expect(degree(3, 2)).toBe(9);
//   });
// });
