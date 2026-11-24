const createProxyHandler = require("../src/proxy-handler");

module.exports = createProxyHandler("all-puntuaciones", "GET, POST");
