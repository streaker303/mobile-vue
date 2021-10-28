module.exports = ({ file }) => {
    let rootValue
    // 若为vant组件 则根fz为37.5 其他则设置为75
    if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
        rootValue = 37.5
    } else {
        rootValue = 75
    }
    return {
        plugins: {
            'postcss-pxtorem': {
                rootValue: rootValue,
                unitPrecision: 5,                                     //小数点后几位
                propList:['*','!border','!min-width','!max-width'],   //匹配转换的rem
                selectorBlackList: [],                                //忽略的css选择器
                minPixelValue: 2,                                    //最小的转换数值
                mediaQuery: false,                                   //是否开启媒体查询
                exclude: [/node_modules/i]                          //忽略转换的路径
            }
        }
    }
}
