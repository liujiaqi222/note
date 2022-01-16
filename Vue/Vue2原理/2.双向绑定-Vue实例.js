class Vue {
  constructor(options) {
    // 1.保存创建时传递的数据
    if (this.isElement(options.el)) {
      this.$el = options.el;
    }
    else {
      this.$el = document.querySelector(options.el);
    }
    this.$data = options.data;

    // 2.根据数据渲染页面
    if (this.$el) {
      new Compiler(this);
    }
  }
  // 判断是否为元素
  isElement(node) {
    return node.nodeType === 1;
  }
}

class Compiler {
  constructor(vm) {
    this.vm = vm;
    // 1.将元素放入到内存中
    const fragment = this.node2fragment(this.vm.$el);
    // 2.编译fragment中的数据
    this.buildTemplate(fragment);
    // 3.将编译好的内容重新渲染到网页上
    this.vm.$el.appendChild(fragment);

  }
  node2fragment(app) {
    const fragment = document.createDocumentFragment(app);
    // 将app的所有子元素添加到fragment中
    fragment.appendChild(app.firstChild);
    let node = app.firstChild;
    while (node) {
      // ！！只要将元素添加到了fragment中，那么这个元素就会自动消失
      fragment.appendChild(node);
      node = app.firstChild;
    }
    // 返回存储所有元素的文档碎片
    return fragment;
  }
  buildTemplate(fragment) {
    const nodeList = [...fragment.childNodes];
    nodeList.forEach(node => {
      // 如果遍历的是元素，则判断是否有v-model
      if (this.vm.isElement(node)) {
        // 是一个元素
        this.buildElement(node);
        // 递归处理子元素
        this.buildTemplate(node);
      }
      // 如果遍历的元素是文本，则判断是否有{{}}
      else {
        this.buildText(node);
      }
    })
  }
  buildElement(node) {
    // 获取dom的所有HTML属性
    const attrs = [...node.attributes];
    attrs.forEach(attr => {
      const { name, value } = attr;
      if (name.startsWith('v-')) {
        const directive = name.slice(2);
        CompilerUtil[directive](node, value, this.vm);

      }
    })
  }
  buildText(node) {
    const content = node.textContent;
    const reg = /\{\{.+?\}\}/gi;
    const keys = content.match(reg);
    keys.forEach(key => {
      Compiler['content'](node, key, this.vm);
    })
  }
}

let CompilerUtil = {
  getValue(vm,valueName) {
    const keys = valueName.split('.');
    console.log(keys);
    return keys.reduce((acc, cur) => {
      return acc[cur];
    },vm.$data)
  },
  model(node, valueName, vm) {
    // node.value = vm.$data[valueName];
    // 但存在valueName为 date.hour这种对象属性的形式
    node.value =this.getValue(vm, valueName) ;
  },
  text(node, valueName, vm) {
    node.innerText =this.getValue(vm, valueName) ;
  },
  html(node, valueName, vm) {
    node.innerHTML =this.getValue(vm, valueName) ;
  },
  content(node, valueName, vm) {
    
  }
}


let vue = new Vue({
  el: '#app', // 可以是dom或者是id名称
  data: {
    name: '嘉琪',
    age: 100,
    html: '<div>我是div</div>',
    text:'<div>我是div</div>'
  }
})

console.log(vue);