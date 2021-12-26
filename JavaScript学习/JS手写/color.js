
async function reTry() {
  const res = await new Promise((res, rej) => rej(2)).catch(err=>err)
  console.log(res);
}

reTry()
