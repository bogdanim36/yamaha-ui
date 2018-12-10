var gulp = require('gulp'),
	fs = require('fs-sync'),
	cb = require('cb'),
	exec = require('child_process').exec;

gulp.task('build', function () {
	process.chdir('client');
	exec('ng build --prod', (err, stdout, sterr) => {
		console.log(stdout);
		console.log(sterr);
		cb('err');
		process.chdir('..');
		fs.copy('server/app.js', 'dist/app.js');
		fs.copy('server/package.json', 'dist/package.json');
		fs.copy('server/api', 'dist/api');
		process.chdir('dist');
		exec('npm install --only=prod', (err, stdout, sterr) => {
			console.log(stdout);
			console.log(sterr);
			cb('err');
		});

	});
});
