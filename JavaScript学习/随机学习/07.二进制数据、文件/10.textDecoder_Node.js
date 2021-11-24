import { writeFile } from 'fs';

const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

writeFile('test.txt', uint8Array,'utf-8', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});