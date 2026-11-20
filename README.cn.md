# Aria2 Explorer

[English](./README.md)

这是 [Alex Hua 的 Aria2 Explorer](https://github.com/alexhua/Aria2-Explorer) 的个人分支。

这是一个 Chrome / Edge 扩展，把浏览器下载交给 aria2，并带有 AriaNg 界面来管理任务。它连接本地 aria2 RPC（通常是 `127.0.0.1:6800`）。下载目录来自 aria2，而不是写死在扩展里的路径。

## 本分支的改动

### 打开下载目录

任务旁边的文件夹按钮打开该任务在 aria2 中的目录。界面已经从任务状态拿到 `dir`（任务自己没有设置目录时，就是 aria2 的全局 `dir`）。按钮使用这个路径，不会提示安装 DownHub。

在 Windows 上，如果该 RPC 配置没有保存自定义的「Download Folder Open Handler URL」，按钮通过 Windows 自带的 `search-ms` 协议，让资源管理器打开这个目录。不需要再安装别的程序。第一次点击时，Chrome 或 Edge 可能会询问是否打开外部应用；允许之后，资源管理器会显示该文件夹。

如果 RPC 配置里已经保存了自定义的打开处理 URL，仍然使用那个 URL。处理失败时，不再弹出安装 DownHub 的对话框。

本地 Windows RPC 的任务详情页里，Download Dir 链接使用同一个地址。

### 工具栏图标右键菜单

本分支不再添加 **启动Aria2**（Start Aria2），也不再注册 Alt+X 快捷键。工具栏菜单里仍然保留打开主界面、下载拦截、状态监测、网站过滤和 RPC 选择。

Chrome 和 Edge 会自己插入一行，标题是扩展名 **Aria2 Explorer**。这一行打开 manifest 里的 `homepage_url`。本分支把它设为 https://github.com/worrysprite/Aria2-Explorer ，所以浏览器自带的这一行会打开本仓库。扩展不会再添加一个同名菜单项。

## 扩展做什么

- 按文件大小拦截浏览器下载，并支持域名和扩展名的允许/阻止列表。按住 Alt 再点击链接可以跳过拦截。
- 监测一个或多个 aria2，并可以在工具栏图标上显示速度和任务数量。
- 以内置 AriaNg 界面打开，方式可以是弹窗、标签页、窗口或侧边栏。
- 从页面右键菜单把链接、选中文本或当前页的链接导出到 aria2。
- 可以接收其他扩展发来的下载请求。

## 安装

以未打包扩展的方式加载本分支：

1. 克隆本仓库。
2. 打开 `chrome://extensions` 或 `edge://extensions`。
3. 打开开发者模式。
4. 选择「加载未打包的扩展程序」，选中本目录。

## 键盘快捷键

- **Alt + A**：开关下载拦截

可以在 `chrome://extensions/shortcuts` 修改快捷键。

## 其他扩展调用

其他扩展可以把下载请求发给本扩展，再由它交给 aria2。把下面的 id 换成扩展页面里本扩展的 id。

```js
const downloadItem = {
    url: "https://sample.com/image.jpg",
    filename: "image_from_sample.jpg",
    referrer: "https://sample.com",
    options: {
        split: "10"
    }
}

chrome.runtime.sendMessage("extension id", downloadItem)
```

## 出处

本分支基于 Alex Hua 的 Aria2 Explorer：

https://github.com/alexhua/Aria2-Explorer

同时使用 [aria2](https://aria2.github.io/) 和 [AriaNg](https://github.com/mayswind/AriaNg)。

## 许可证

BSD 3-Clause。见 [LICENSE](LICENSE)。该文件中的版权声明仍是 Alex Hua 的。
