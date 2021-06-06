const path = require('path');

const resolve = (dir) => {
	return path.join(__dirname, dir);
};

module.exports = {
	productionSourceMap: false,
	chainWebpack: config => {
		// 移除 prefetch 插件
		config.plugins.delete('prefetch')
	},
	devServer: {
		port: 8081,
		proxy: {
			"/api": {
				target: "https://tx.techial.cc/",
				changeOrigin: true,
				ws: true
			}
		}
	},
	configureWebpack: {
		entry: {
			app: './src/main.ts'
		},
		resolve: {
			alias: {
				'@': resolve('./src')
			},
			extensions: [".ts", ".tsx", ".js", ".vue"]
		}
	},
	outputDir: './static',
	pages: {
		index: {
			entry: './src/main.ts',
			template: './public/index.html',
			favicon: './public/favicon.ico',
			filename: 'index.html'
		}
	}
}
