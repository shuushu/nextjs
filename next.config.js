const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[path][name]--[local]--[hash:base64:5]",
    },
    webpack (config) {
        config.resolve.alias['@'] = path.join(__dirname, 'components')
        return config
    }
})
