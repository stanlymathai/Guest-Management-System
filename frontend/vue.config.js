module.exports = {
  devServer: {
    proxy: 'http://localhost:3000/',
    disableHostCheck: true,
    hot: !(process.env.NODE_ENV == 'production'),
    inline: !(process.env.NODE_ENV == 'production'),
  },
  pages: {
    index: {
      title: 'GMS',
      entry: 'src/main.js?version=1.2.7',
    },
  },
  //webpack preloadplugin adds a prefetch tag to all async chunks, need to remove plugin for lazy load to work
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
  css: {
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
        url: (url, resourcePath) => {
          // resourcePath - path to css file

          // Don't handle `banner.jpg` urls (image urls in course documents)
          if (url.includes('banner.jpg')) {
            return false;
          }

          return true;
        },
      },
    },
  },
};
