#!/usr/bin/env node

'use strict';

const exec = require('child_process').exec;
const fs = require('fs');

let versionNumber = getVersionNumber();

(function () {
	console.log('Starting postinstall script.');
	console.log('Needed to set up things to make sure the release tasks run properly:\n');
	versionNumber = getVersionNumber();
	console.log(' → Version number from `package.json`: ', versionNumber + '\n');
	checkChangelog();
})();

function getVersionNumber() {
	// Get Version number from package.json
	const fileName = 'package.json';
	const fileContent = fs.readFileSync(fileName, 'utf8');
	const regex = /"version": "(\d+\.\d+.\d+)",/;
	const versionNumber = fileContent.match(regex)[1];
	return versionNumber;
}

function checkChangelog() {
	const changelog = 'CHANGELOG.md';
	console.log(' → Check if you have a ' + changelog);
	fs.readFile(changelog, 'utf8', (error, data) => {
		if (data === undefined) {
			console.log('   No ' + changelog + ' over here.');
			console.log('   So we’re going to create one …');
			fs.writeFileSync(changelog, '# Changelog\n', 'utf8');
			console.log('   Successfully created ' + changelog + '\n');
		} else {
			console.log('   You already have a ' + changelog + ' over here. Everything is fine.\n');
		}
		initGit(versionNumber);
	});

}

function initGit(versionNumber) {
	// Check if there is a Git Repo over here
	console.log(' → Check if you have a Git repo intialized.');
	const dir = '.git';
	fs.readdir(dir, error => {
		if (error) {
			console.log('   No `.git` directory over here.');
			console.log('   So we’re going to initialize git …\n');
			exec('git init && git add . && git commit -m "Initial commit" && git tag -a ' + versionNumber + ' -m "Initial release"', (error, stdout) => {
				console.log(stdout);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});
		} else {
			console.log('   You already have a Git Repo over here. Everything is fine.\n');
		}
		installGitHook();
	});
}

function installGitHook() {
	// Install post merge Git hook
	console.log(' → Installing the post merge Git hook.');
	console.log('   It will take care of firing `npm install` after every merge (and pull).\n');
	exec('grunt githooks', (error, stdout) => {
		console.log(stdout);
		if (error === null) {
			console.log(' → Thanks for your patience. You’re all set ｡◕‿◕｡');
		} else {
			console.log('exec error: ' + error);
		}
	});
}
