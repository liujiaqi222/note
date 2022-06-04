# CSS实现导航栏

![](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/202109291533141.gif){:height 787, :width 784}

除了变主题色需要js来实现，导航栏效果全部由CSS来实现。

核心思想：
1. 为导航栏留出空间，此处将 main 区域的margin-left设置为了5rem

2. 导航栏设置为position:fixed，宽度为5rem

3. 接着将侧边栏 ul 的高度设置100%和display:flex，隐藏文字

4. 此时就可以使用margin-top:auto，将最后一个元素居于底部

5. 最后当鼠标hover的时候，导航栏的宽度设置为16rem，显示文字，并且记得给导航栏设置overflow:hidden，隐藏导航栏展开时文字。



全部代码：https://codepen.io/liujiaqi222/pen/VwWgbjr



# CSS + JS 实现主题色变化

![2](https://raw.githubusercontent.com/liujiaqi222/images/master/pics/202110092353765.gif)

核心思想：

1. 标签的颜色必须引用全局定义好的颜色，而不能写死。

   ```css
   nav ul{
     background:var(--bg-primary);
   }
   ```

2. 提前准备好配色

   ```css
   .dark {
     --text-primary: #b6b6b6;
     --text-secondary: #ececec;
     --bg-primary: #23232e;
     --bg-secondary: #141418;
   }
   .light {
     --text-primary: #1f1f1f;
     --text-secondary: #000000;
     --bg-primary: #ffffff;
     --bg-secondary: #e4e4e4;
   }
   
   .solar {
     --text-primary: #576e75;
     --text-secondary: #35535c;
     --bg-primary: #fdf6e3;
     --bg-secondary: #f5e5b8;
   }
   ```

3. 当按下颜色切换按钮后，给body添加对应的类名，这样提前定义好的css配色类名将会发生作用。另外，我们希望当用户刷新页面后，依旧使用之前的配色，因此可以将配色名称存储在localStorage中，页面刷新后从localStorage中读取配色。

   ```js
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
   ```



全部代码：https://codepen.io/liujiaqi222/pen/VwWgbjr



# 5个grid布局小案例

视频地址：https://youtu.be/-myi8EU8HIo

