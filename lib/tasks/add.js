#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const jclrz = require('json-colorz');
const hive = require('../handlers/hive');
const QuickSearch = require('../handlers/quick_search');
const Metadata = require('../metadata/metadata');

// Main code //
const self = module.exports = {
	init: (input) => {
		QuickSearch.search(input[0])
			.then(result => {
				if (result.rating === 1) {
					log(Chalk.blue('==>') + Chalk.bold(' Found it!'));

					hive.get(result.target)
						.then(info => {
							Metadata.getLatestVersion(info)
								.then(versions => {
									
									for (var i = 0; i < versions.length; i++) {
										const version = versions[i];
										const dep = info.dependencies[i];
										log(`${dep.compileType} "${dep.dependency}:${version}"`);
									} 
								})
						});
				} else {
					log(Chalk.blue('==>') + Chalk.bold(' Did you mean'));
					log(`${result.target}`);
				}
			});
	}
};