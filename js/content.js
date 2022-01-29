var inject = {
	init: async function () {
		const isDev = this.getIsDev();
		const currentTabToken = sessionStorage.getItem("Token");
		if (!currentTabToken && isDev) {
			const { isToken } = await getChromeStorage("isToken");
			const { tokenType } = await getChromeStorage("tokenType");

			if (isToken === "1") {
				setToken(tokenType || "1");
			}
		}
	},
	getIsDev: function () {
		const href = window.location.href;
		const devIp = href.indexOf("172") > -1;
		const devLocla = href.indexOf("localhost") > -1;
		return devIp || devLocla;
	},
	getMeta: function (metaName) {
		const metas = document.getElementsByTagName("meta");

		for (let i = 0; i < metas.length; i++) {
			if (metas[i].getAttribute("name") === metaName) {
				return metas[i].getAttribute("content");
			}
		}

		return "";
	},
};

inject.init();
