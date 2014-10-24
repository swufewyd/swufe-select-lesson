module.exports = function(config) {
	config.set({
		basePath: '..',
		plugins : ['karma-ng-scenario'],
		frameworks: ['ng-scenario'],
		files: [
			// 'test/lib/*.js',
			'test/e2e/**/*.js'
		],
		exclude: [],
		port: 9876,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		usePolling: false,
		// browsers: ['Firefox'],
		singleRun: false,
		urlRoot: '/_karma_/',
		proxies: {
			'/': 'http://localhost:9000/'
		}/*,
		junitReporter : {
	        outputFile: 'test/e2e.xml',
	        suite: 'e2e'
	    }*/
	});
};