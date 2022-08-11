const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Vue Internship',
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/styles/index.scss')
      ]
    })
}
