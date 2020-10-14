module.exports = {
    // Disable linting
    chainWebpack: config => {
      config.module.rules.delete('eslint');
    }
}