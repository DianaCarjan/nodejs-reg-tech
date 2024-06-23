import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { generatePrimes, generatePrimesSequentially } from "./utils";
import os from "os";

const parallelPrimes = (
  workersCount: number,
  min: number,
  range: number
): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    const slice = Math.ceil(range / workersCount);

    let primes: number[] = [];
    let completed = 0;

    for (let i = 0; i < workersCount; i++) {
      const start = min + i * slice;
      const end = i === workersCount - 1 ? min + range : start + slice;

      const worker = new Worker(__filename, {
        workerData: { start, end },
      });

      worker.on("message", (primesSegment: number[]) => {
        console.log(`Worker ${i} finished processing`, primesSegment);

        primes = primes.concat(primesSegment);
        completed++;

        if (completed === workersCount) {
          primes.sort((a, b) => a - b);
          resolve(primes);
        }
      });

      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    }
  });
};

const main = (verify = false, min = 2, range = 1e7) => {
  const workersCount = process.argv[2]
    ? parseInt(process.argv[2], 10)
    : os.cpus().length;

  if (isMainThread) {
     parallelPrimes(workersCount, min, range)
      .then((primes) => {
        console.log(`Total count of prime numbers: ${primes.length}`);
        if (verify) {
          const sequentialResult = generatePrimesSequentially(min, range);
          console.log("Parallel primes " + primes);
          console.log("Seq primes " + sequentialResult);

          if (
            sequentialResult.filter((item) => primes.indexOf(item) < 0).length >
            0
          ) {
            console.error("Arrays are not the same");
          } else {
            console.log("Successful verify");
          }
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  } else {
    const { start, end } = workerData;
    const primes = generatePrimes(start, end);
    parentPort!.postMessage(primes);
  }
};

const verify = process.argv[3] === "true" || false;
const min = parseInt(process.argv[4]) || 2;
const range = parseInt(process.argv[5]) || 1e7;

// end = min + range
main(verify, min, range);
