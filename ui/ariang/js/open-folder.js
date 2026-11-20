/**
 * Build a URL that opens an aria2 task directory in the local file manager.
 *
 * Chrome and Edge cannot launch Explorer on an arbitrary path. On Windows the
 * built-in search-ms protocol is handled by Explorer and needs no DownHub
 * install and no native messaging host. The window is an Explorer view scoped
 * to that folder.
 */
(function (root) {
	"use strict";

	function isWindowsPath(path) {
		return /^[A-Za-z]:[\\/]/.test(path) || path.startsWith("\\\\") || path.startsWith("//");
	}

	function toWindowsPath(path) {
		var normalized = String(path).replace(/\//g, "\\");
		normalized = normalized.replace(/^([a-z]):/, function (match, letter) {
			return letter.toUpperCase() + ":";
		});
		if (/^[A-Za-z]:\\*$/.test(normalized)) {
			return normalized.slice(0, 2) + "\\";
		}
		return normalized.replace(/\\+$/, "");
	}

	function windowsExplorerUrl(dir) {
		var path = toWindowsPath(dir);
		if (!path) return "";
		// query=* plus a location crumb is the form Windows Explorer accepts
		// from Chrome/Edge. Extra crumb flags are omitted so the handler
		// keeps the same URL shape as the documented folder link.
		return "search-ms:query=*&crumb=location:" + encodeURIComponent(path) + "&";
	}

	/**
	 * @param {object} task AriaNg task. `dir` is aria2's status dir.
	 * @param {object} [scope] Main controller scope (platform and optional custom handler).
	 * @return {string}
	 */
	function aria2ExplorerFolderUrl(task, scope) {
		if (!task) return "";
		var profile = scope && scope.currentRpcProfile;
		var dir = task.dir || "";
		if (profile && profile.openHandlerUrl && scope.getOpenHandlerUrl) {
			var custom = scope.getOpenHandlerUrl(dir, encodeURIComponent(task.taskName || ""));
			if (custom) return custom;
		}
		if (!dir) return "";
		if (scope && scope.isWindows && isWindowsPath(dir)) {
			return windowsExplorerUrl(dir);
		}
		return "file://" + dir;
	}

	root.aria2ExplorerFolderUrl = aria2ExplorerFolderUrl;

	if (typeof module !== "undefined" && module.exports) {
		module.exports = {
			aria2ExplorerFolderUrl: aria2ExplorerFolderUrl,
			windowsExplorerUrl: windowsExplorerUrl
		};
	}
})(typeof globalThis !== "undefined" ? globalThis : this);
