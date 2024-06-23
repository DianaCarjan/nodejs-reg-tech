export const generatePrimes = (start: number, end: number): number[] => {
  let localPrimes: number[] = [];
  
  for (let i = start; i < end; i++) {
    if (isPrime(i)) {
      localPrimes.push(i);
    }
  }

  return localPrimes;
};

const isPrime = (element: number): boolean => {
  if (element <= 1) return false;
  if (element <= 3) return true;
  if (element % 2 === 0 || element % 3 === 0) return false;

  const end = Math.sqrt(element);

  for (let i = 5; i <= end; i += 6)
    if (element % i == 0 || element % (i + 2) == 0) return false;

  return true;
};

// Original function to be tested against
export const generatePrimesSequentially = (min = 2, range = 1e7) => {
  const primes: number[] = [];

  const generate = (start: number, range: number) => {
    let isPrime = true;

    let end = start + range;

    for (let i = start; i < end; i++) {
      for (let j = min; j < Math.sqrt(end); j++) {
        if (i !== j && i % j === 0) {
          isPrime = false;

          break;
        }
      }

      if (isPrime) {
        primes.push(i);
      }

      isPrime = true;
    }
  };

  generate(min, range);

  return primes;
};
