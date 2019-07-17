#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const dir_cwd = process.cwd();

var absolute = false;
var repeatc = "";

for(var i = 0;i < process.argv.length; i++){
	if (process.argv[i][0] == '-') {
		if (process.argv[i][1] == 'a') {
			absolute = true;
		}else if (process.argv[i][1] == 'r') {
			if (process.argv.length > i+1) {
				repeatc = process.argv[i+1].replace("\\t", "\t").replace("\\n", "\n");
			}else{
				console.log("error: no argument after -r");
				return;
			}
		}else if (process.argv[i][1] == 'h') {
			console.log(`Usage: filename <option>
-a\t\tabsolute path
-r <string>\trepeat`);
			return;
		}
	}
}

function printAllFiles(dir, cnt) {
	const filenames = fs.readdirSync(dir);
	filenames.forEach((filename) => {
		const fullPath = path.join(dir, filename);
		const stats = fs.statSync(fullPath);
		if (stats.isFile()) {
			if (absolute)	console.log(fullPath);
			else			console.log(repeatc.repeat(cnt) + filename);
		}else if (stats.isDirectory()) {
			if (absolute)	console.log(fullPath);
			else			console.log(repeatc.repeat(cnt) + fullPath.replace(dir + '/', ''));
			printAllFiles(fullPath, cnt+1);
		}
	});
}

printAllFiles(dir_cwd, 0);
