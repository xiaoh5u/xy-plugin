// @document http://chrome.cenchy.com/content_scripts.html

//设置chrome插件内的本地存储（非页面存储）
function setChromeStorage(key, val,) { 
	chrome.storage.local.set({ [key]: val });
}

//获取chrome插件内的本地存储（非页面存储）
function getChromeStorage(key, callback) {
	return new Promise(resolve => {
		chrome.storage.local.get([key], function (response) {
			callback && callback(response);
			resolve(response);
		});
	});
}

//向当前页面注入javascript脚本
function executeScript(msg, callback) {
	this.getTab(function (tabId) {
		var exec = chrome.tabs.executeScript;

		exec(tabId, { code: `var msg = ${JSON.stringify(msg)}` }, function () {
			if (chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError.message);
				callback && callback(undefined);
				return;
			}
			exec(tabId, { file: "/js/inject.js" }, function (response) {
				callback && callback(response[0]);
			});
		});
	});
}

//获取当前tabId
function getTab(callback) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
		callback(tab[0].id, tab[0].url);
	});
}

//根据type设置token
function setToken(type) {
	if (type === "1") {
		// Admin 账号
		sessionStorage.setItem(
			"Token",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsTmFtZSI6IueuoeeQhuWRmCIsIm9yZ1R5cGUiOm51bGwsIm9yZ05hbWUiOiLlroHms6LluILnlr7mjqfkuK3lv4MiLCJwZW9wbGVJZCI6Ijg3NjgiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJleHAiOjI1MzIwMTU0NjUsInVzZXJJZCI6IjVhNzYwMzNlMjQ1NzRkZDNiYmYyZTY4MzdhZmQ2YTM1IiwianRpIjoiZmI5MTAwYjAtMTlmNC00YzBkLWI4NTAtYjM5ZjA3NmUyNmEyIiwib3JnSWQiOiIzMzAyMDAwMDAxIiwiY2xpZW50X2lkIjoicGh5c2ljYWwifQ.B-AzKefZBx0ATCuJmIyiY2EQR1oU0eE-VU4RSPjx3XM"
		);
		sessionStorage.setItem("orgId", "3302000001");
		sessionStorage.setItem("userId", "5a76033e24574dd3bbf2e6837afd6a35");
	} else if (type === "2") {
		// 大碶卫生院 账号
		sessionStorage.setItem(
			"Token",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsTmFtZSI6IuWkp-eituWNq-eUn-mZoiIsIm9yZ1R5cGUiOiI0Iiwib3JnTmFtZSI6IuWkp-eituihl-mBk-ekvuWMuuWNq-eUn-acjeWKoeS4reW_gyIsInBlb3BsZUlkIjpudWxsLCJ1c2VyX25hbWUiOiIxODkwMDAwMDAwMiIsInNjb3BlIjpbImFsbCJdLCJleHAiOjI2MzIwMTY1MjAsInVzZXJJZCI6ImQ5YTE3NTQwNDdlZjQ0Mzk4YTNiZmUxMjQ4ZmNjODgxIiwianRpIjoiNDBmNDZjNWItNzIxMC00NjQ5LThlZTctMTZkMTIyM2Y0OWY1Iiwib3JnSWQiOiIzMzAyMDYwMzAxIiwiY2xpZW50X2lkIjoiYWRtaW4ifQ.i1dfCzLsjjjxHi3McLl2tWUHP2d5Orefv7kHK0etxRQ"
		);
		sessionStorage.setItem("orgId", "3302060301");
		sessionStorage.setItem("userId", "d9a1754047ef44398a3bfe1248fcc881");
	} else if (type === "3") {
		// 天鑫管理员 账号
		sessionStorage.setItem(
			"Token",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsTmFtZSI6IuWkqemRq-euoeeQhuWRmCIsIm9yZ1R5cGUiOiI4Iiwib3JnTmFtZSI6IuWkqemRq-ekvuWMuiIsInBlb3BsZUlkIjpudWxsLCJ1c2VyX25hbWUiOiLlpKnpkavnrqHnkIblkZgiLCJzY29wZSI6WyJhbGwiXSwiZXhwIjoyNzQzMDc2OTYwLCJ1c2VySWQiOiJlNTgyZTE2MzMxM2M0MGY2ODc4Y2JjNzE2MzU3ZjJhOSIsImp0aSI6IjcwNmZkZjg5LTAyMGEtNDVhMy04MmM4LTZjNWUwNmU4YjZiNCIsIm9yZ0lkIjoiMzMwMjA1MDYwODAwMDEiLCJjbGllbnRfaWQiOiJmdXR1cmVBcHBsaWNhdGlvblN0b3JlIn0.OW8T0xTDy3IDybLetBN-hY8lhEWX8TGF31F4fzOAXMM"
		);
		sessionStorage.setItem("orgId", "33020506080001");
		sessionStorage.setItem("userId", "e582e163313c40f6878cbc716357f2a9");
	}
}

function clearToken() {
	sessionStorage.removeItem("Token");
	sessionStorage.removeItem("orgId");
	sessionStorage.removeItem("userId");
}
