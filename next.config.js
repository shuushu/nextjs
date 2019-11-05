const path = require('path')

module.exports = {
    webpack (config) {
        config.resolve.alias['comp'] = path.join(__dirname, 'components')
        return config
    }
}