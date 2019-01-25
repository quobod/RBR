const chalk = require('chalk');
const { cfc } = require('./cfc');

const error = (arg = '') => {
	return (chalk.rgb(134, 114, 100).bold('\n' + cfc(`${arg}`)));
};

const warning = (arg = '') => {
	return (chalk.rgb(134, 134, 100).bold('\n' + cfc(`${arg}`)));
};

const success = (arg = '') => {
	return (chalk.rgb(100, 134, 100).bold('\n' + cfc(`${arg}`)));
};

const failed = (arg = '') => {
	return (chalk.rgb(117, 130, 130).bold('\n' + cfc(`${arg}`)));
};

const info = (arg = '') => {
	return (chalk.rgb(250,250,254).bold('\n' + cfc(`${arg}`)));
};

const fyi = (arg = '') => {
	return chalk.rgb(240,249,98).bold(`${cfc(arg)}`);
};

module.exports = {
	fyi,
	info,
	failed,
	warning,
	error
};