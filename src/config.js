module.exports = {
	displayName: 'Sun Position',

	hook: 'contextmenu',

	dependencies: [
		'https://unpkg.com/d3@5.7.0/dist/d3.min.js',
		'https://unpkg.com/suncalc@1.8.0/suncalc.js'
	],

//	className: 'plugin-lhpane',

	className: 'plugin-lhpane plugin-mobile-fullscreen',
	classNameMobile: 'plugin-sun-position-mobile',

	exclusive: 'lhpane',
}
