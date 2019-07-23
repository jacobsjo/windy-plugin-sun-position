module.exports = {
	displayName: 'Sun Position',

	hook: 'contextmenu',

	dependencies: [
		'https://unpkg.com/d3@5.7.0/dist/d3.min.js',
		'https://unpkg.com/suncalc@1.8.0/suncalc.js',
		'https://unpkg.com/leaflet-geometryutil@0.9.1/src/leaflet.geometryutil.js'
	],

	className: 'plugin-lhpane plugin-mobile-fullscreen',

	exclusive: 'lhpane',
}
