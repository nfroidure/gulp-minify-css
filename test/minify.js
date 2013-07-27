var gulp = require('gulp'),
	expect = require('chai').expect,
	minifyCSS = require('../'),
	cleanCSS = require('clean-css'),
	es = require('event-stream'),
	path = require('path'),
	fs = require('fs');

require('mocha');

describe('gulp-minify-css minification', function() {
	var filename = path.join(__dirname, './fixture/index.css');
	it('should minify my files', function(done) {
		gulp.file(filename)
		.pipe(minifyCSS())
		.pipe(es.map(function(file){
			var source = fs.readFileSync(filename),
				expected = cleanCSS.process(source.toString());
			expect(expected).to.be.equal(file.contents.toString());
			done();
		}));
	});

	it('should return file.contents as a buffer', function(done) {
		gulp.file(filename)
		.pipe(minifyCSS())
		.pipe(es.map(function(file) {
			expect(file.contents).to.be.an.instanceof(Buffer);
			done();
		}));
	});
});