# Aria2 Explorer

Personal fork of [Aria2 Explorer](https://github.com/alexhua/Aria2-Explorer) by Alex Hua.

This is a Chrome and Edge extension that hands browser downloads to aria2 and includes an AriaNg interface for managing tasks. It talks to a local aria2 RPC (typically `127.0.0.1:6800`). The download directory comes from aria2, not from a path baked into the extension.

## Fork changes

### Open the download directory

The folder button on a task opens that task's aria2 directory. The UI already receives the directory as the task status field `dir` (aria2's global `dir` when the task does not set its own). The button uses that path. It does not ask you to install DownHub.

On Windows, with no custom "Download Folder Open Handler URL" saved for the RPC profile, the button opens Explorer through Windows' built-in `search-ms` protocol, scoped to that directory. Nothing else has to be installed. The first time, Chrome or Edge may ask to open an external application; allow it, and Explorer shows the folder.

If a custom open-handler URL is already saved on the RPC profile, that URL is still used. A failed handler does not show the DownHub install dialog.

The Download Dir link on the task detail page for a local Windows RPC uses the same URL.

### Toolbar icon menu

Right-clicking the extension icon no longer shows **启动Aria2** (Start Aria2). That item was registered by the extension on Windows when the first RPC server is localhost. Alt+X still launches Aria2 on Windows. The other items this extension adds (download capture, monitoring, site filters, RPC selection, and page export) stay as they are. On setups where Start Aria2 was not shown, **Open Web UI** is still there.

Chrome and Edge also insert their own row titled **Aria2 Explorer**, the extension name from the manifest. This fork does not register that row. It links to the extension homepage, and the extensions API does not provide a way to delete it.

## What the extension does

- Captures browser downloads by file size, with domain and extension allow and block lists. Hold Alt while clicking a link to skip capture.
- Monitors one or more aria2 servers and can show speed and task counts on the toolbar icon.
- Opens the built-in AriaNg UI as a popup, tab, window, or side panel.
- Exports a link, a selection, or the links on the current page to aria2 from the page context menu.
- Can accept a download request from another extension.

## Install

Load this fork as an unpacked extension:

1. Clone this repository.
2. Open `chrome://extensions` or `edge://extensions`.
3. Turn on Developer mode.
4. Choose "Load unpacked" and select this directory.

## Keyboard shortcuts

- **Alt + A**: Toggle download capture
- **Alt + X**: Launch Aria2 (Windows only)

Shortcuts can be changed at `chrome://extensions/shortcuts`.

## Calls from another extension

Another extension can ask this one to send a file to aria2. Replace the id with this extension's id from the extensions page.

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

## Credit

This fork is based on Aria2 Explorer by Alex Hua:

https://github.com/alexhua/Aria2-Explorer

It also uses [aria2](https://aria2.github.io/) and [AriaNg](https://github.com/mayswind/AriaNg).

## License

BSD 3-Clause. See [LICENSE](LICENSE). The copyright notice in that file remains Alex Hua's.
