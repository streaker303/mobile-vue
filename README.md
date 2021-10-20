# cli4+mobile+postcss-pxtorem+vw++eslint+vant适配750
### 使用时拉完项目->cnpm i ->直接跑就行
#### 下面是适配方案和步骤
1. 安装 postcss-pxtorem 和 lib-flexible
- `postcss-pxtorem`  ，注意要是这个插件不是px2rem。
```
cnpm i postcss postcss-pxtorem@5.1.1 --save-dev  // 安装最新版报错

cnpm i postcss-loader autoprefixer@8.0.0  // 此行是autoprefixer 出现报错时，需要降低版本

cnpm install lib-flexible --save  // 可以没必要
```
2.`.postcssrc.js` 解决`vant` 375px设计稿显示小的问题
```
module.exports = ({ file }) => {
  let rootValue;
  // 若为vant组件 则根fz为37.5 其他则设置为75
  if (file && file.dirname && file.dirname.indexOf("vant") > -1) {
    rootValue = 37.5;
  } else {
    rootValue = 75;
  }
  return {
    plugins: {
      'postcss-pxtorem':{
        'rootValue': rootValue,
        propList: ["*"]
      }
    }
  };
};
```
3. main.js 引入手淘（可以）
```
import 'lib-flexible/flexible.js'
```
4. 替代手淘方案，index.html 中加js函数
```angular2html
<!--<script>-->
  (function (doc, win) {
  		var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if(clientWidth>=750){
          docEl.style.fontSize = '75px';
        }else{
          docEl.style.fontSize = 75 * (clientWidth / 750) + 'px';
        }
      };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
<!--</script>-->

```
5. 替代上面两种方案的vw写法
```angular2html
<!--<script>-->
document.documentElement.style.fontSize = 10 + 'vw';
<!--</script>-->

```
6. TODO：利用sass函数

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
