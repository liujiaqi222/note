async function getStuff(url:string) {
  const res = await fetch(url);
  const result = await res.json();
  return result;
}

let url = 'https://api.wmdb.tv/api/v1/top?skip=0&limit=10';
console.log(getStuff(url));
