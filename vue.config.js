const path = require('path')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
function resolve(dir) {
    return path.join(__dirname, dir)
}

let pluginsArr = [
    new SimpleProgressWebpackPlugin(),
    new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
    })
]

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
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
        /[/\\]node_modules[/\\](.+?)?iview(.*)/,
        /[/\\]node_modules[/\\](.+?)?vns-ui(.*)/

    ],
    configureWebpack: config => {
        let plugins = []
        let module = {}
        if (isProduction) {
            plugins = [].concat(pluginsArr)

            // 开启分离js
            config.optimization = {
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            ecma: undefined,
                            warnings: false,
                            parse: {},
                            compress: {
                                drop_console: true,
                                drop_debugger: false,
                                pure_funcs: ['console.log'] // 移除console
                            }
                        },
                        // 代码压缩插件
                        parallel: 4, // 开启并行压缩
                        cache: true
                    })
                ]
            }

            // 取消webpack警告的性能提示
            config.performance = {
                hints: 'warning',
                // 入口起点的最大体积
                maxEntrypointSize: 1000000 * 500,
                // 生成文件的最大体积
                maxAssetSize: 10000000 * 1000,
                // 只给出 js 文件的性能提示
                assetFilter: function(assetFilename) {
                    return assetFilename.endsWith('.js')
                }
            }
        }

        return isProduction ? { plugins, module } : { plugins }
    },

    css: {
        sourceMap: process.env.NODE_ENV !== 'production'
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@mixins', resolve('src/mixins'))
            .set('@store', resolve('src/store'))
    },

    assetsDir: 'static',
    runtimeCompiler: true,
    productionSourceMap: false,
    outputDir: 'dist',
    devServer: {
        host: 'localhost',
        port: 3001,
        https: false,
        hotOnly: false,
        proxy: { // 设置代理
            '/api': {
                target: 'http://10.10.109.162:17999/', // 需要代理的地址
                changeOrigin: true,
                ws: true,
                secure: false,
                pathRewrite: {
                    '^/api': '' // 本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
                }
            },

            // 图片服务代理
            '/imgServer': {
                // target: 'http://192.168.91.218:8081/', //需要代理的地址
                target: 'http://10.10.109.203:7699/', // 需要代理的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/imgServer': '' // 本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
                }
            }
        }
    }

}
