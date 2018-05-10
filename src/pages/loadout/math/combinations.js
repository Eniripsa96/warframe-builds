/**
 * @param {array} options - options to pick from
 * @param {number} amount - number required
 */
export function getCombinations(options, amount) {
  const results = [];
  const indices = options.slice(0, amount).map((item, i) => i);
  do {
    // Add combination
    results.push(indices.map(i => options[i]));

    // Move to next combination
    indices[0]++;
    let i = 1;
    while(i < indices.length && indices[i] == indices[i - 1]) {
      indices[i]++;
      indices[i - 1]--;
      i++;
    }
  } while (indices[indices.length - 1] < options.length);

  return results;
}

const FACTORIALS = [ 1, 2, 6, 24, 120, 720, 5040, 40320 ];

export function factorial(n) {
  if (n < 2) return 1;
  while (n > FACTORIALS.length) {
    FACTORIALS.push(FACTORIALS[FACTORIALS.length - 1] * (FACTORIALS.length + 1));
  }
  return FACTORIALS[n];
}
