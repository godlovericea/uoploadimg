const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, './', dir)
}

// cdn预加载使用
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'vue-qr': 'vueQr',
    'vant': 'vant',
    'clipboard': 'ClipboardJS'
}

const cdn = {
    // 开发环境
    dev: {
        css: [
            'https://cdn.bootcss.com/element-ui/2.13.1/theme-chalk/index.css',
            // 'https://cdn.jsdelivr.net/npm/vant@2.6/lib/index.css'
        ],
        js: []
    },
    // 生产环境
    build: {
        css: [
            'https://cdn.bootcss.com/element-ui/2.13.1/theme-chalk/index.css',
            // 'https://cdn.jsdelivr.net/npm/vant@2.6/lib/index.css'
        ],
        js: [
            'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
            'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
            'https://cdn.bootcss.com/vuex/3.1.3/vuex.min.js',
            'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
            'https://cdn.bootcss.com/element-ui/2.13.1/index.js',
            'https://cdn.jsdelivr.net/npm/vant@2.6/lib/vant.min.js',
            'https://financial.nanshuangbeilao.com/vue-qr.js',
            'https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js'
        ]
    }
}

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css', 'html', 'svg']

module.exports = {
    // 打包后的位置(如果不设置这个静态资源会报404)
    publicPath: './',
    // 不同的环境打不同包名
    outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist',
    // 静态资源目录名称
    assetsDir: 'static',
    // 去掉打包的时候生成的map文件 true不去除 false去除
    devServer: {
        open: true,
        port: '8182',
        hotOnly: true,
        // proxy: {
        //     '/api': {
        //         // target: 'http://39.105.178.59:8182/zjglj/v2', //API服务器的地址
        //         target: 'http://192.168.0.211:8182/zjglj/v2', //API服务器的地址
        //         ws: true, //代理websockets
        //         changeOrigin: true, // 虚拟的站点需要更管origin
        //         pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //           '^/api': ''
        //         }
        //     }
        // }
    },
    productionSourceMap: false,
    chainWebpack: (config) => {
        // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
        config.plugin('html').tap((args) => {
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = cdn.build
            }

            if (process.env.NODE_ENV === 'development') {
                args[0].cdn = cdn.dev
            }

            return args
        })
        // 找到svg-loader
        const svgRule = config.module.rule('svg')
        // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.uses.clear()
        // 正则匹配排除node_modules目录
        svgRule.exclude.add(/node_modules/)
        // 添加svg新的loader处理
        svgRule
        .test(/\.svg$/)
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/icons'))
        config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        // 拆分块
        config.optimization.splitChunks({
            // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
            chunks: 'all',
            // 形成一个新代码块最小的体积
            minSize: 10240,
            // 按需加载时候最大的并行请求数
            maxAsyncRequests: 5,
            // 最大初始化请求数
            maxInitialRequests: 3,
            // 打包分割符
            automaticNameDelimiter: '~',
            cacheGroups: {
                // 抽离自定义工具库
                utilCommon: {
                    name: 'chunk-common',
                    test: resolve('src/components'),
                    // 将引用模块分离成新代码文件的最小体积
                    minSize: 1024,
                    // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                    minChunks: 2,
                    // 抽取优先级
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        })
    },

    // 修改webpack config, 使其不打包externals下的资源
    configureWebpack: (config) => {
        const myConfig = {}

        if (process.env.NODE_ENV === 'production') {
            // 1. 生产环境npm包转CDN
            myConfig.externals = externals

            myConfig.plugins = []

            // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
            productionGzip && myConfig.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )

            // 3. 构建时去出debugger和config
            myConfig.plugins.push(
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
                })
            )
        }

        if (process.env.NODE_ENV === 'development') {
            /**
             * 关闭host check，方便使用ngrok之类的内网转发工具
             */
            myConfig.devServer = {
                disableHostCheck: true
            }
        }

        return myConfig
    }
}
