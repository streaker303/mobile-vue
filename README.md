# webpack5.x+vue2.x+eslint
### 兼容IE
- main.js
```
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```
- package.json 
```
"browserslist": [
    "> 1%",
    "last 2 versions",
    "IE 9",
    "IE 10",
    "IE 11"
  ]
```
- vue.config.js
```
transpileDependencies: process.env.NODE_ENV === 'development' ? ['*'] : []


transpileDependencies: [
        /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]src/,
        /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]package/,
        /[/\\]node_modules[/\\](.+?)?f-render(.*)/,
        /[/\\]node_modules[/\\](.+?)?quill-image-drop-module(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-ele-form(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-ele-form-bmap(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-baidu-map(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-ele-upload-image(.*)/,
        /[/\\]node_modules[/\\](.+?)?@jiaminghi(.*)/,
        /[/\\]node_modules[/\\](.+?)?vuex(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-router(.*)/,
        /[/\\]node_modules[/\\](.+?)?jspdf(.*)/,
        /[/\\]node_modules[/\\](.+?)?bpmn-js(.*)/,
        /[/\\]node_modules[/\\](.+?)?camunda-bpmn-moddle(.*)/,
        /[/\\]node_modules[/\\](.+?)?xcrud(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue2-ace-editor(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-ueditor-wrap(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-json-viewer(.*)/,
        /[/\\]node_modules[/\\](.+?)?vuedraggable(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-property-decorator(.*)/,
        /[/\\]node_modules[/\\](.+?)?vant(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-codemirror(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-class-component(.*)/,
        /[/\\]node_modules[/\\](.+?)?vue-clipboard2(.*)/,
        /[/\\]node_modules[/\\](.+?)?html2canvas(.*)/,
        /[/\\]node_modules[/\\](.+?)?iview(.*)/

    ]
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
