const path = require('path');

const resolve = (dir) => {
	return path.join(__dirname, dir);
};

module.exports = {
	productionSourceMap: false,
	chainWebpack: config => {
		config.plugins.delete('prefetch')
	},
	devServer: {
		port: 8081,
		proxy: {
			"/api": {
				target: "https://localhost:8080/api/",
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
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
