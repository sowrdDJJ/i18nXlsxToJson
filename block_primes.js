const min = 2
const max = 1e7

function generatePrimes(start, range) {
  let primes = []
  let isPrime = true
  let end = start + range
  for (let i = start; i < end; i++) {
    for (let j = start; j < Math.sqrt(end); j++) {
      if (i !== j && i%j === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime) {
      primes.push(i)
    }
    isPrime = true
  }
  return primes
}
const oldDate = new Date().getTime();
const primes = generatePrimes(min, max)
const newDate = new Date().getTime();
console.log(primes.length);
console.log(`${(newDate - oldDate)/1000}s`);