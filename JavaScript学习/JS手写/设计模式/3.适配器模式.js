class GooleMap {
  show() {
      console.log('渲染谷歌地图')
  }
}

class BaiduMap {
  display() {
      console.log('渲染百度地图')
  }
}


// 定义适配器类, 对BaiduMap类进行封装
class BaiduMapAdapter {
  show() {
      var baiduMap = new BaiduMap()
      return baiduMap.display() 
  }
}

