import { generatePrimes } from "./utils";

describe("Utility functions tests", () => {
  describe("generatePrimes()", () => {
    it("should generate a list of prime numbers within a range", () => {
      const primes = generatePrimes(2, 30);
      expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    });

    it("should return empty array for non-prime ranges", () => {
      const primes = generatePrimes(24, 28);
      expect(primes).toEqual([]);
    });

    it("should handle large range efficiently", () => {
      const primes = generatePrimes(2, 100);
      expect(primes.length).toBe(25);
    });
  });
});
