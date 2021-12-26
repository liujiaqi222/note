const str = '#333'

function color(str) {
  let color = str.slice(1,);
  let colorArr =[];
  // 如果长度为3则复制每个数字
  if (color.length === 3) {
    colorArr = color.split('');
    colorArr=  colorArr.map(item => item.concat(item))
  }
  else if (color.length !== 6) return; //字符串长度只能是3或者6
  else {
    // 长度为6
    colorArr.push(color.slice(0,2),color.slice(2,4),color.slice(4,));
  }
  // 转为10进制
  colorArr = colorArr.map(item => {
    return parseInt(item, 16);
  })
  return `rgba(${colorArr.join(',')})`
}

console.log(color(str));
