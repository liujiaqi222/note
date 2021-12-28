console.log('1 2 3'.replace(/\d/g, parseInt));
'1 2 3'.replace(/\d/g, function (...args) {
  console.log(args);
})