## 基于以太坊的食物运输溯源Dapp

### 1 创建私链

欢迎大家访问我的博客：[https://hexuezhi.github.io/2020/04/30/以太坊创建私链/](https://hexuezhi.github.io/2020/04/30/以太坊搭建私链/)

### 2 创建Dapp及部署

博客地址：[https://hexuezhi.github.io/2020/08/15/以太坊溯源Dapp/](https://hexuezhi.github.io/2020/08/15/以太坊溯源Dapp/)

### 3 启动方法

1. 启动私链，并用metamask连接。注意开启rpc和设置8545端口，可以参考以上博客。
2. 在app文件夹下执行`npm run dev`，浏览器访问`http://localhost:8080`端口，打开浏览器console。观察输出。
3. 第一步：添加新食品（部署合约），会返回食品信息地址。
4. 第二步：填入食品名称、位置名称、运输员，点击添加食品位置信息。
5. 第三步：获取当前食品所有信息。

![项目截图](https://i.loli.net/2020/08/18/psWv8PqX1HIAjJ6.png)
