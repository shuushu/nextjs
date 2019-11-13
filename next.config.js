const path = require('path')
//const withCSS = require('@zeit/next-css')

module.exports = {
    webpack (config) {
        config.resolve.alias['@'] = path.join(__dirname, 'components')
        return config
    }
}