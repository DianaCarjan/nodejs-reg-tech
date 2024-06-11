# Prime Number Generation

## Overview
This project is a Node.js application written in TypeScript that utilizes worker threads to efficiently generate prime numbers within a given range. It leverages multi-core processors to enhance performance by parallelizing the prime number generation process.

## Features
- **Parallel Computation:** Uses Node.js worker threads to distribute prime number calculations across multiple CPU cores.
- **Efficient Algorithm:** Implements an optimized algorithm to check for prime numbers and generate them within a specified range.
- **Unit Testing:** Includes unit tests using Jest to ensure the reliability and correctness of the prime number generation.

## Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)

## Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/DianaCarjan/nodejs-reg-tech.git
cd nodejs-reg-tech
npm install
npm start