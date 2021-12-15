function unique(arr) {
  // return [...new Set(arr)];
  return Array.from(new Set(arr))
}

const arr = [12, 32, 2, 1, 2, 1];
console.log(unique(arr));

