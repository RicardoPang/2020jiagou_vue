// Vue的核心代码 只是Vue的一个声明
import {initMixin} from './init';
import {renderMixin} from './render';
import {lifecycleMixin} from './lifecycle';
import {initGlobalAPI} from './initGlobalAPI/index'

function Vue(options) {
  // 进行Vue的初始化操作
  this._init(options);

}

// 通过引入文件的方式 给Vue原型上添加方法

initMixin(Vue); // 给Vue原型上添加一个_init方法
renderMixin(Vue);
lifecycleMixin(Vue);

// 初始化全集的api
initGlobalAPI(Vue)

// demo 产生两个虚拟节点进行比对
// template => render方法 => vnode
import {compileToFunction} from "./compiler/index";
import {createElm, patch} from "./vdom/patch"

let vm1 = new Vue({
  data: {name: 'hello'}
})
let render1 = compileToFunction(`<div id="app" a="1" style="background: red;">
  <div style="background: red" key="A">A</div>
  <div style="background: yellow" key="B">B</div>
  <div style="background: grey" key="C">C</div>
</div>`)
let vnode = render1.call(vm1)

let el = createElm(vnode)
document.body.appendChild(el)

let vm2 = new Vue({
  data: {name: 'zf', age: 11}
})
let render2 = compileToFunction(`<div id="aaa" a="2" style="color: blue;">
  <div style="background: red" key="Q">Q</div>
  <div style="background: red" key="A">A</div>
  <div style="background: yellow" key="F">F</div>
  <div style="background: grey" key="C">C</div>
  <div style="background: grey" key="N">N</div>
</div>`)
let vnode2 = render2.call(vm2)

setTimeout(() => {
  patch(vnode, vnode2) // 传入两个虚拟节点 会在内部进行比对
}, 1000)

// 1. diff算法特点是 平级比较 我们正常操作dom元素 很少涉及到父变成子 子变成父 O(n³)

export default Vue
