const themes = ['light','dark','solar'];

const theme = localStorage.getItem('theme') || (temp = themes[0],localStorage.setItem('theme',temp),temp);

document.body.classList.add(theme);

function toggleTheme(){
  const current = localStorage.getItem('theme');
  let index = themes.indexOf(current);
  if(index===2){
    index = -1;
  }
  const next = themes[index+1];
  localStorage.setItem('theme',next);
  document.body.classList.replace(current,next);
}

document.getElementById('themeButton').onclick = toggleTheme;