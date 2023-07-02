const { createProxyMiddleware } = require("http-proxy-middleware");

const context = ["/ChatGpt", "/AIMod"];

module.exports = function (app) {
	const appProxy = createProxyMiddleware(context, {
		target: "https://dchan04aibackend.onrender.com",
		secure: false,
	});

	app.use(appProxy);
};
