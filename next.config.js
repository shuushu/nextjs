const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
    webpack (config) {
        config.resolve.alias['@'] = path.join(__dirname, 'components')
        return config
    }
})
