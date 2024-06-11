import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { generatePrimes } from "./utils";

const main = (workersCount = 8) => {
  const min = 2;
  const max = 1e7;
  
  const range = Math.ceil((max - min) / workersCount);
  const workers = [];

  for (let i = 0; i < workersCount; i++) {
    const start = min + i * range;
    const end = i === workersCount - 1 ? max : start + range;

    const worker = new Worker(__filename, {
      workerData: { start, end },
    });

    worker.on("message", (msg) => {
      console.log(`Worker ${i} finished processing`, msg);
    });
    worker.on("error", console.error);
    worker.on("exit", (code) => {
      if (code !== 0)
        console.error(new Error(`Worker stopped with exit code ${code}`));
    });
    workers.push(worker);
  }

  let primes: number[] = [];
  let completed = 0;

  workers.forEach((worker) => {
    worker.on("message", (primesSegment) => {
      primes = primes.concat(primesSegment);
      completed++;

      if (completed === workersCount) {
        console.log(`Total count of prime numbers: ${primes.length}`);
      }
    });
  });
};

if (isMainThread) {
  main();
} else {
  const { start, end } = workerData;
  const primes = generatePrimes(start, end);
  parentPort!.postMessage(primes);
}
