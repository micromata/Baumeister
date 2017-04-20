import gulp from 'gulp';
import del from 'del';

const paths = {
	styles: {},
	scripts: {},
	images: {}
};

export function cleanDev() {
	del(['server']);
}
