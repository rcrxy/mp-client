const path = require("path");
const resolve = dir => path.join(__dirname, dir);

// 后端请求地址 注意[他会根据你环境的不同从而获取的 env 文件不同]
const BASEURL = process.env.BASE_URL;

module.exports = {
   lintOnSave: false, // 关闭esline验证
   publicPath: "/",
   outputDir: "dist",
   productionSourceMap: true,
   devServer: {
      open: true, //浏览器自动打开页面
      // port: 8009,
      proxy: {
         "/api": {
            //代理api
            target: process.env.BASE_URL, //服务器api地址
            changeOrigin: true, //是否跨域
            // ws: true, //websocket支持
            pathRewrite: {
               // 重写路径
               "^/api": "",
            },
         },
      },
   },
   transpileDependencies: ["@dcloudio/uni-ui", "uview-ui"],
   chainWebpack(config) {
      config.resolve.alias.set("@", resolve("src")).set("@com", resolve("src/components")).set("@pages", resolve("src/pages")).set("@static", resolve("src/static"));
   },
};
