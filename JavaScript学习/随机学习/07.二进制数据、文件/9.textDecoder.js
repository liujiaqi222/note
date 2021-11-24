let arr = [];

for (let i = 0; i < 256; i++){
  arr[i] = i;
}

const uint8Array = new Uint8Array(arr);

console.log(new TextDecoder().decode(uint8Array).split(''));