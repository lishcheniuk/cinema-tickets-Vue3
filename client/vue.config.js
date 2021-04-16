const proxy = {
  "/": {
    target: "https://cinema-tickets.vercel.app/",
    secure: false,
    changeOrigin: true,
  },
};

module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: (config) => {
    return {
      devServer: { proxy },
    };
  },
};
