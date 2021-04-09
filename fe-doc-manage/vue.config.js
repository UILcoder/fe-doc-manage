process.env.VUE_APP_PATH = process.env.APP_PATH

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
// 定义需要压缩的文件
const productionGzipExtensions = ['js', 'css', 'vue'];

const projectConfig = require('./src/config')

const host = process.env.VUE_APP_REQUEST_HOST
const url = `${host}`

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV !== 'development' ? projectConfig.STATIC_URL : '/',
  productionSourceMap: false, // 是否需要source map
  devServer: {
    proxy: {
      '/doc': {
        target: url,
        changeOrigin: true,
        pathRewrite: {
          '^/doc': ''
        }
      }
    }
  },
  chainWebpack: (config) => {

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    config.plugin('html').tap((args) => {
      args[0].STATIC_URL = projectConfig.STATIC_URL
      args[0].ICONFONT_URL = `${projectConfig.STATIC_URL}/font/${projectConfig.ICONFONT_VERSION}`
      return args
    })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('store', resolve('src/store'))
      .set('apis', resolve('src/apis'))
      .set('constants', resolve('src/constants'))
  },
  configureWebpack: {
    plugins: [
      // 打包删除dist
      new CleanWebpackPlugin(),
      // 打包的时候开启gzip可以很大程度减少包的大小
      new CompressionPlugin({
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      }),
    ]
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/variables.less')
      ]
    },
  },
}
