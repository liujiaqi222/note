const theme = {
    chalk: {
        backgroundColor: '#161522',
        titleColor: '#fff',
        // 切换主题按钮的图片
        themeSrc: 'qiehuan_dark.png',
        // 页面顶部的边框图片
        headerBorderSrc: 'header_border_dark.png',
        // 地区销量的标题背景色
        trendBgc:'#222733'
    },
    vintage: {
        backgroundColor: '#e0e0e0',
        titleColor:'#333',
        themeSrc: 'qiehuan_light.png',
        headerBorderSrc: 'header_border_light.png',
        trendBgc:'#fff'
    }
}

export default function getThemeValue(themeName) {
    return theme[themeName];
}