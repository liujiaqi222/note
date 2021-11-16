module.exports = {
  title: 'Hello jiaqi',
  description: 'Just playing around',
  themeConfig: {
    sidebar: ['/',

      {
        title: 'JavaScript',
        path: '/JavaScript/',
        children: [
          '/JavaScript/Dom.md',
          '/JavaScript/ES6.md'
        ]
      },
      {
        title: 'CSS',
        path: '/CSS/',
        children: [
          '/CSS/Scss学习笔记.md',
        ]
      },

    ]
  }
}

// 以 / 结尾的路径将会被视为 */README.md