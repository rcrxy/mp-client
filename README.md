[TOC]

### 开发

#### 添加页面

[官方文档](https://uniapp.dcloud.net.cn/collocation/pages.html)

创建页面文件
打开 pages.json 文件
"pages" 下添加路由信息

#### h5 开发

```
   热更新命令: npm run serve
```

#### APP

###### 热更新

```
   使用HBuiderX打开项目
   打开项目内文件
   安卓手机连接电脑，打开开发模式并打开usb调试功能
   HBuiderX操作栏：运行>运行到手机或模拟器>运行到Android App 基座
   等待查找到指定设备并运行
   HBuiderX自动在当前设备中安装并运行
```

###### ios 或 ios/Android 模拟器

[官方模拟器安装指南](https://uniapp.dcloud.net.cn/tutorial/run/installSimulator.html)

### 打包相关

[官方文档](https://uniapp.dcloud.net.cn/tutorial/app-base.html)

```
   使用HBuiderX进行打包发布
   路径: 发行/原生APP-云打包
   打包前确认 manifest.json 文件配置
      基础配置: 新版本正式发布时，应用版本名称及应用版本号值必须比前一版本更高
      App常用其他设置/支持CPU类型: armeabi-v7a(x32)、 arm64-v8a(x64)，单一勾选为对应版本包，同时勾选为兼容包
   Android报名: com.jiecheng.chengkao
   证书别名: jcapp
   证书文件: D:/key/jcapp.jks
   证书私钥密码为: js888888
   渠道包勾选华为应用商店、小米应用商店、oppo、vivo
   打包，切勿关闭HBuider
   需提供x32及x64版本，即需分别勾选armeabi-v7a、arm64-v8a打包，所以共打包两次，共得8个安装包
```

### 后端相关

```
   项目地址 D:\project\app\app-server
   后端为nodejs(express)
   数据库: MySql 8.x
   后续功能新增需独立完成
```

### 相关文档

[vue2](https://v2.cn.vuejs.org/)
[uView](https://www.uviewui.com/)
[uniapp](https://uniapp.dcloud.net.cn/)
[uni-ui](https://uniui.dcloud.net.cn/)
[axios](https://www.axios-http.cn/docs/intro)

### 更新计划

##### 已开发未上线

```
   版本: 1.0.5
   绑定学习中心课程，自动读取当前学生可观看视频
   观看视频：视频可试看前两章的前两节，已拥有课程可观看所有课程
```

##### 未来规划

```
   登录时获取用户登录app当前版本用于后台统计
   首页新闻内容更新(需添加相关接口，后台添加相关操作页面)
   重构题目相关接口，题目所有数据皆修改为由后端提供(当前为前端进行统计及处理)
```
