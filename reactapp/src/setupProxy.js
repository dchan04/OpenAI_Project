const { createProxyMiddleware } = require("http-proxy-middleware");

const context = ["/ChatGpt", "/ImageGen", "/AIMod"];

module.exports = function (app) {
	const appProxy = createProxyMiddleware(context, {
		target: "https://localhost:32768",
		secure: false,
	});

	app.use(appProxy);
};
