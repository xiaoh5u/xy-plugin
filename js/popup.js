const main = {
	//初始化
	init: function () {
		this.SetInitEleType();
		$(document).ready(() => {
			this.handleTokenClick();
			this.handleSelectChange();
		});
	},
	/* 监听token账户下拉框选择事件 */
	handleSelectChange: function () {
		$(".accountSel").on("change", function (e) {
			setChromeStorage("tokenType", e.target.value);
			executeScript({ type: "clear" });
		});
	},
	//监听token注入开关点击事件
	handleTokenClick: function () {
		$(".control").on("click", function (e) {
			$(".control").toggleClass("enable");

			const type = $(".control").hasClass("enable");

			if (type) {
				setChromeStorage("isToken", "1");
			} else {
				setChromeStorage("isToken", "0");
				executeScript({ type: "clear" });
			}
		});
	},
	//页面加载读取缓存初始化配置
	SetInitEleType: async function () {
		const { isToken } = await getChromeStorage("isToken");
		if (isToken === "1") {
			$(".control").addClass("enable");
		} else {
			$(".control").removeClass("enable");
		}

		const { tokenType } = await getChromeStorage("tokenType");
		if (!!tokenType) {
			$(".accountSel").val(tokenType);
		}
	},
};

main.init();
