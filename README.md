# cli4+mobile+postcss-pxtorem+vw++eslint+vant适配750
### 使用时拉完项目->cnpm i ->直接跑就行
#### 下面是适配方案和步骤，可结合vant-demo来看
#### 1. 安装 postcss-pxtorem 和 lib-flexible（可用第4点函数代替）
- `postcss-pxtorem`  ，注意要是这个插件不是px2rem。
```
cnpm i postcss postcss-pxtorem@5.1.1 --save-dev  // 安装最新版报错

cnpm i postcss-loader autoprefixer@8.0.0  // 此行是autoprefixer 出现报错时，需要降低版本

cnpm install lib-flexible --save  // 可以没必要
```
#### 2. `.postcssrc.js` 解决`vant` 375px设计稿显示小的问题
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
#### 3. main.js 引入手淘（可以）
```
import 'lib-flexible/flexible.js'
```
#### 4. 替代手淘方案，index.html 中加js函数
```
<script>
    (function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth
                if (!clientWidth) return
                if (clientWidth >= 750) {
                    docEl.style.fontSize = '75px'
                } else {
                    docEl.style.fontSize = 75 * (clientWidth / 750) + 'px'
                }
            }

        if (!doc.addEventListener) return
        win.addEventListener(resizeEvt, recalc, false)
        doc.addEventListener('DOMContentLoaded', recalc, false)
    })(document, window)
</script>

```
#### 5. 安装`postcss-px-to-viewport` ,结合sass函数使用（兼容性没有rem好，看需求）
- `.postcssrc.js`
```
plugins: {
    "postcss-px-to-viewport": {
        unitToConvert: 'px',            //需要转换的单位
        viewportWidth: viewportWidth,           //设计稿的宽度
        unitPrecision: 5,                 //单位转换后保留的精度
        propList: ['*'],         //能转化为vw的属性列表，默认'*'
        viewportUnit: 'vw',              //转换后的视口单位
        fontViewportUnit: 'vw',      //字体使用的视口单位
        selectorBlackList: [],            //忽略的css选择器
        minPixelValue: 1,                //最小的转换数值
        mediaQuery: true,             //是否开启媒体查询
        replace: true,     //是否直接更换属性值，而不添加备用属性
        exclude: [],          //忽略某些文件夹下的文件或特定文件
        landscape: true,
        landscapeUnit: 'vw',  //横屏时使用的单位
        landscapeWidth: 1366   //横屏时使用的视口宽度
    }
}
```
- global.scss
- [配置sass/scss全局函数](https://blog.csdn.net/muguli2008/article/details/100578485)
```
$color: #2656ec;

@function vw($px) {

//这里是以移动端PSD设计稿 宽为750px，高为1334px为例，所以这里 除以750，以便在使用时，不用去计算倍数， PSD设计稿中的尺寸是多少，我们样式就是多少！！！

@return ($px / 750) * 100vw;

```

