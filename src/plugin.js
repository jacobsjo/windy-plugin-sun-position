/* eslint-disable no-undef */
import picker from '@windy/picker'
import store from '@windy/store'
//import SunCalc from 'suncalc'
//import d3 from 'd3'
//import tzlookup from 'tz-lookup'

//this.hasURL = true; //TODO?

 
const plugin_options = {
    "photoSun": true,
    "astroSun": true,
    "moon": true
}


console.log(plugin_options);


const plugin_version = "0.3.6"  //DO NOT REMOVE COMENT FROM THIS LINE: this line is added automatically by the compiler!

const mod = (x, n) => (x % n + n) % n
const lineLength = 80

const sunTimesConfigPhotography = {
    "dawn": { starts: "Blue Hour", new_class: "blueColor" },
    "blueHourEnd": { starts: "Golden Hour", new_class: "goldenColor" },
    "sunrise": { name: "Sunrise", class: "minor" },
    "goldenHourEnd": { starts: "Daytime", new_class: "dayColor" },
    "solarNoon": { name: "Solar Noon", class: "minor" },
    "goldenHour": { starts: "Golden Hour", new_class: "goldenColor" },
    "sunset": { name: "Sunset", class: "minor" },
    "blueHour": { starts: "Blue Hour", new_class: "blueColor" },
    "dusk": { starts: "Nighttime", new_class: "nightColor" },
    "first": [
        { altitude: -90, starts: "Nighttime", new_class: "nightColor" },
        { altitude: -6, starts: "Blue Hour", new_class: "blueColor" },
        { altitude: -4, starts: "Golden Hour", new_class: "goldenColor" },
        { altitude: 6, starts: "Daytime", new_class: "dayColor" }
    ]
}

const sunTimesConfigAstonomical = {
    "nightEnd": { name: "Astronomical Dawn", starts: "Astronomical Twilight", new_class: "astroColor" },
    "nauticalDawn": { name: "Nautical Dawn", starts: "Nautical Twilight", new_class: "nauticalColor" },
    "dawn": { name: "Civil Dawn", starts: "Civil Twilight", new_class: "blueColor" },
    "sunrise": { name: "Sunrise", starts: "Daytime", new_class: "dayColor" },
    "solarNoon": { name: "Solar Noon", class: "minor" },
    "sunset": { name: "Sunset", starts: "Civil Twilight", new_class: "blueColor" },
    "dusk": { name: "Civil Dusk", starts: "Nautical Twilight", new_class: "nauticalColor" },
    "nauticalDusk": { name: "Nautical Dusk", starts: "Astronomical Twilight", new_class: "astroColor" },
    "night": { name: "Astronomical Dusk", starts: "Nighttime", new_class: "nightColor" },
    "first": [
        { altitude: -90, starts: "Nighttime", new_class: "nightColor" },
        { altitude: -18, starts: "Astronomical Twilight", new_class: "astroColor" },
        { altitude: -12, starts: "Nautical Twilight", new_class: "nauticalColor" },
        { altitude: -6, starts: "Civil Twilight", new_class: "blueColor" },
        { altitude: -0.833, starts: "Daytime", new_class: "dayColor" }
    ]
}

const sunTimesConfigCombinded = {
    "nightEnd": { name: "Astronomical Dawn", starts: "Astronomical Twilight", new_class: "astroColor" },
    "nauticalDawn": { name: "Nautical Dawn", starts: "Nautical Twilight", new_class: "nauticalColor" },
    "dawn": { name: "Civil Dawn", starts: "Blue Hour", new_class: "blueColor" },
    "blueHourEnd": { starts: "Golden Hour", new_class: "goldenColor" },
    "sunrise": { name: "Sunrise", class: "minor" },
    "goldenHourEnd": { starts: "Daytime", new_class: "dayColor" },
    "solarNoon": { name: "Solar Noon", class: "minor" },
    "goldenHour": { starts: "Golden Hour", new_class: "goldenColor" },
    "sunset": { name: "Sunset", class: "minor" },
    "blueHour": { starts: "Blue Hour", new_class: "blueColor" },
    "dusk": { name: "Civil Dusk", starts: "Nautical Twilight", new_class: "nauticalColor" },
    "nauticalDusk": { name: "Nautical Dusk", starts: "Astronomical Twilight", new_class: "astroColor" },
    "night": { name: "Astronomical Dusk", starts: "Nighttime", new_class: "nightColor" },
    "first": [
        { altitude: -90, starts: "Nighttime", new_class: "nightColor" },
        { altitude: -18, starts: "Astronomical Twilight", new_class: "astroColor" },
        { altitude: -12, starts: "Nautical Twilight", new_class: "nauticalColor" },
        { altitude: -6, starts: "Blue Hour", new_class: "blueColor" },
        { altitude: -4, starts: "Golden Hour", new_class: "goldenColor" },
        { altitude: 6, starts: "Daytime", new_class: "dayColor" }
    ]
}

const sunTimesConfigNone = {
    "first": [
        { altitude: -90, starts: " ", new_class: "nightColor" },
    ]
}

const moonTimesConfig = {
    "rise": { name: "Moonrise", class: "moon" },
    "set": { name: "Moonset", class: "moon" }
}

const quarterOffet = 0.01 //maximal distance from quater moon (including new and full moon) to be considered at quater (in oppose to in between quaters)

const moonPhases = []
moonPhases[0] = "New Moon"
moonPhases[quarterOffet] = "Waxing Crescent"
moonPhases[0.25 - quarterOffet] = "First Quarter",
    moonPhases[0.25 + quarterOffet] = "Waxing Gibbous",
    moonPhases[0.5 - quarterOffet] = "Full Moon",
    moonPhases[0.5 + quarterOffet] = "Waning Gibbous",
    moonPhases[0.75 - quarterOffet] = "Last Quarter",
    moonPhases[0.75 + quarterOffet] = "Waning Crescent",
    moonPhases[1 - quarterOffet] = "New Moon"

let isOpen = false;



SunCalc.addTime(-4, "blueHourEnd", "blueHour")

export const onopen = () => {
    if (isOpen) { return; }
    isOpen = true;

    if (!d3.select(".picker").empty() && d3.select(".picker").style("display") != "none") {
        onPickerOpened()
        movedPickerRedraw()
    }

    d3.select(".plugin-content .footnote .plugin-version").html(plugin_version)

    d3.select("#windy-plugin-sun-position .options .image-checkbox#photoSun").classed("off", !plugin_options.photoSun);
    d3.select("#windy-plugin-sun-position .options .image-checkbox#astroSun").classed("off", !plugin_options.astroSun);
    d3.select("#windy-plugin-sun-position .options .image-checkbox#moon").classed("off", !plugin_options.moon);

    d3.selectAll("#windy-plugin-sun-position .options .image-checkbox").on("click", function () {
        const checkbox = d3.select(this);
        plugin_options[checkbox.attr("id")] = checkbox.classed("off")
        checkbox.classed("off", !checkbox.classed("off"));
        movedPickerRedraw();
    })
    
}

let lastLatLon

export const onclose = () => {
    isOpen = false;
    lastLatLon = undefined
    d3.select(".picker").select("svg").remove()
}

/*
function readValues(latLon) {
    //pickerOpen = true
    redraw(latLon)
}*/

let svg

let sunLine
let sunriseLine
let sunsetLine
let sunCircle

let moonLine
let moonriseLine
let moonsetLine
let moonCircle

//var timeOffset = 0
let timezone = 'UTC'
//const useUTC = false

// when the picker is opended, create svg to attach to picker and add lines
function onPickerOpened() {
    d3.select(".picker").select("svg").remove() // just to be save that there will never be multiple svg's attached to the .picker

    const p = d3.select(".picker")
    svg = p.append("svg")
        .attr("class", "windy-plugin-sun-position sun-position-dial")
        .attr("viewBox", "0 0 199 199")
    sunriseLine = svg.append("line").attr("class", "dial-line dial-line-sunrise")
        .attr("x1", 100).attr("y1", 100).attr("x2", 100).attr("y2", 100).on("click", function () { setTime("sunrise") })
    sunsetLine = svg.append("line").attr("class", "dial-line dial-line-sunset")
        .attr("x1", 100).attr("y1", 100).attr("x2", 100).attr("y2", 100).on("click", function () { setTime("sunset") })

    moonriseLine = svg.append("line").attr("class", "dial-line dial-line-moonrise")
        .attr("x1", 100).attr("y1", 100).attr("x2", 100).attr("y2", 100).on("click", function () { setTime("moonrise") })
    moonsetLine = svg.append("line").attr("class", "dial-line dial-line-moonset")
        .attr("x1", 100).attr("y1", 100).attr("x2", 100).attr("y2", 100).on("click", function () { setTime("moonset") })

    moonLine = svg.append("line").attr("class", "dial-line dial-line-moon")
        .attr("x1", 100).attr("y1", 100).attr("x2", 100).attr("y2", 100)
    moonCircle = svg.append("circle").attr("class", "dial-circle dial-circle-moon")
        .attr("r", 4).attr("cx", 100).attr("cy", 100)
    sunLine = svg.append("line").attr("class", "dial-line dial-line-sun")
        .attr("x1", 100).attr("y1", 100).attr("x2", 100).attr("y2", 100)
    sunCircle = svg.append("circle").attr("class", "dial-circle dial-circle-sun")
        .attr("r", 4).attr("cx", 100).attr("cy", 100)


    //set hover classes
    d3.selectAll(".dial-line")
        .on("mouseover", function () {
            d3.select(this).attr("id", "hover");
        })
        .on("mouseout", function () {
            d3.select(this).attr("id", "");
        });

    // show timeline in sidebar (and hide "open picker" message)
    d3.select(".sun-times").attr("id", "")
    d3.select(".open-picker").attr("id", "hide")

}


// when the picker moves, redraw and look up timezone, if timezone is different redraw again with correct time
function movedPickerRedraw(latLon) {
    if (latLon !== undefined) { lastLatLon = latLon }
    if (lastLatLon === undefined) { return }
    redraw(lastLatLon)
}

let times
let moonTimes


// update drawing and timeline
function redraw(latLon) {

    // get timestamp
    const time = store.get('timestamp')

    const lat = latLon.lat
    const lon = latLon.lon

    if (store.get('zuluMode')) {
        timezone = 'UTC';
    } else {
        timezone = tzlookup(lat, lon);
    }


    // get sun directions
    times = SunCalc.getTimes(time, lat, lon)
    const sunPos = SunCalc.getPosition(time, lat, lon)
    const sunrisePos = SunCalc.getPosition(times.sunrise, lat, lon)
    const sunsetPos = SunCalc.getPosition(times.sunset, lat, lon)

    // get moon directions

    const moonTimes1 = SunCalc.getMoonTimes(times.nadir.getTime(), lat, lon) // moon times of first day
    const moonTimes2 = SunCalc.getMoonTimes(times.nadir.getTime() + 24 * 60 * 60 * 1000, lat, lon) // moon times of second day

    moonTimes = {}
    moonTimes.rise = (moonTimes1.rise >= times.nadir.getTime()) ? moonTimes1.rise : ((moonTimes2.rise <= times.nadir.getTime() + 24 * 60 * 60 * 1000) ? moonTimes2.rise : NaN)
    moonTimes.set = (moonTimes1.set >= times.nadir.getTime()) ? moonTimes1.set : ((moonTimes2.set <= times.nadir.getTime() + 24 * 60 * 60 * 1000) ? moonTimes2.set : NaN)
    const moonPos = SunCalc.getMoonPosition(time, lat, lon)
    const moonrisePos = SunCalc.getMoonPosition(moonTimes.rise, lat, lon)
    const moonsetPos = SunCalc.getMoonPosition(moonTimes.set, lat, lon)

    //==== draw dial on picker ====

    let sunLineLength
    let sunLineOpacity

    if (sunPos.altitude > 0) { // if sun is above horizon, calculate lenght of sun line from altitude
        sunLineLength = Math.cos(sunPos.altitude) * lineLength
        sunLineOpacity = 1
    } else if (sunPos.altitude > -0.1) {  //if sun is less than 6 degrees below horizon, calculate opacity from altitude
        sunLineLength = lineLength
        sunLineOpacity = 1 + 10.0 * sunPos.altitude
    } else { // if sun is further than 6 degrees below horizion, hide sun line
        sunLineLength = lineLength
        sunLineOpacity = 0
    }

    if (plugin_options.astroSun || plugin_options.photoSun) {
        // set sun line
        sunLine.attr("x2", 100 - Math.sin(sunPos.azimuth) * sunLineLength).attr("y2", 100 + Math.cos(sunPos.azimuth) * sunLineLength).attr("stroke-opacity", sunLineOpacity)
        sunCircle.attr("cx", 100 - Math.sin(sunPos.azimuth) * sunLineLength / 2).attr("cy", 100 + Math.cos(sunPos.azimuth) * sunLineLength / 2).attr("fill-opacity", sunLineOpacity)

        // if there is a sunrise, draw sunrise and sunset lines
        if (isNaN(sunrisePos.azimuth)) {
            // hide lines
            sunriseLine.attr("x2", 100).attr("y2", 100)
            sunsetLine.attr("x2", 100).attr("y2", 100)
        } else {
            // draw lines
            sunriseLine.attr("x2", 100 - Math.sin(sunrisePos.azimuth) * lineLength).attr("y2", 100 + Math.cos(sunrisePos.azimuth) * lineLength)
            sunsetLine.attr("x2", 100 - Math.sin(sunsetPos.azimuth) * lineLength).attr("y2", 100 + Math.cos(sunsetPos.azimuth) * lineLength)
        }
    } else {
        sunLine.attr("x2", 100).attr("y2", 100)
        sunriseLine.attr("x2", 100).attr("y2", 100)
        sunsetLine.attr("x2", 100).attr("y2", 100)
        sunCircle.attr("fill-opacity", 0)
    }

    let moonLineLength
    let moonLineOpacity

    if (moonPos.altitude > 0) { // if sun is above horizon, calculate lenght of sun line from altitude
        moonLineLength = Math.cos(moonPos.altitude) * lineLength
        moonLineOpacity = 1
    } else if (moonPos.altitude > -0.02) {  //if sun is less than 1 degrees below horizon, calculate opacity from altitude
        moonLineLength = lineLength
        moonLineOpacity = 1 + 50.0 * moonPos.altitude
    } else { // if sun is further than 6 degrees below horizion, hide sun line
        moonLineLength = lineLength
        moonLineOpacity = 0
    }

    if (plugin_options.moon) {
        // set moon line
        moonLine.attr("x2", 100 - Math.sin(moonPos.azimuth) * moonLineLength).attr("y2", 100 + Math.cos(moonPos.azimuth) * moonLineLength).attr("stroke-opacity", moonLineOpacity)
        moonCircle.attr("cx", 100 - Math.sin(moonPos.azimuth) * moonLineLength / 2).attr("cy", 100 + Math.cos(moonPos.azimuth) * moonLineLength / 2).attr("fill-opacity", moonLineOpacity)

        if (isNaN(moonrisePos.azimuth)) {
            // hide line
            moonriseLine.attr("x2", 100).attr("y2", 100)
        } else {
            // draw line
            moonriseLine.attr("x2", 100 - Math.sin(moonrisePos.azimuth) * lineLength).attr("y2", 100 + Math.cos(moonrisePos.azimuth) * lineLength)
        }

        if (isNaN(moonsetPos.azimuth)) {
            // hide line
            moonsetLine.attr("x2", 100).attr("y2", 100)
        } else {
            // draw line
            moonsetLine.attr("x2", 100 - Math.sin(moonsetPos.azimuth) * lineLength).attr("y2", 100 + Math.cos(moonsetPos.azimuth) * lineLength)
        }
    } else {
        moonLine.attr("x2", 100).attr("y2", 100)
        moonriseLine.attr("x2", 100).attr("y2", 100)
        moonsetLine.attr("x2", 100).attr("y2", 100)
        moonCircle.attr("fill-opacity", 0)
    }


    //==== draw timeline ====


    const sunTimesConfig = plugin_options.astroSun ? (plugin_options.photoSun ? sunTimesConfigCombinded : sunTimesConfigAstonomical) : (plugin_options.photoSun ? sunTimesConfigPhotography : sunTimesConfigNone)

    const minAltitude = SunCalc.getPosition(times.nadir, lat, lon).altitude * 180 / Math.PI
    //const maxAltitude = SunCalc.getPosition(times.solarNoon, lat, lon).altitude * 180 / Math.PI


    // create timeline storage
    const timeline = []

    // calculate first timeframe
    let firstConfig
    for (const i in sunTimesConfig.first) {
        if (sunTimesConfig.first[i].altitude > minAltitude) {
            break;
        }
        firstConfig = sunTimesConfig.first[i]
    }

    //add first time to timeline (time 0 puts it at front during sorting and hides element from being rendered individually)
    timeline.push({ time: 0, name: undefined, raw_name: undefined, starts: firstConfig.starts, color_class: undefined, new_class: firstConfig.new_class })
    for (const timeName in times) {
        if (sunTimesConfig[timeName] && !isNaN(times[timeName])) {
            timeline.push({ time: times[timeName], name: sunTimesConfig[timeName].name, raw_name: timeName, starts: sunTimesConfig[timeName].starts, class: sunTimesConfig[timeName].class, new_class: sunTimesConfig[timeName].new_class })
        }
    }

    //add moon times (if enabled)
    if (plugin_options.moon) {
        for (const timeName in moonTimes) {
            if (moonTimesConfig[timeName] && !isNaN(moonTimes[timeName])) {
                timeline.push({ time: moonTimes[timeName], name: moonTimesConfig[timeName].name, raw_name: "moon" + timeName, class: moonTimesConfig[timeName].class })
            }
        }
    }

    // sort timeline
    timeline.sort((a, b) => (a.time > b.time) ? 1 : -1)

    // create entries in sidebar timeline
    const tlo = d3.select(".sun-times .timeline").html("") // get html timeline object
    let current_class = ""
    for (const i in timeline) {
        if (timeline[i].new_class) {
            current_class = timeline[i].new_class
        }

        if (timeline[i].time > 0) { //hide first element used to set first timeframe
            const tle = tlo.append("div").attr("class", "timeline-entry timestamp " + (timeline[i].class ? timeline[i].class + " " : "") + current_class) // add timeline entry
            tle.append("span").attr("class", "time-column").html(time_format(timeline[i].time)) // add time column
            tle.append("span").attr("class", "name-column").html(timeline[i].name)
            tle.data([timeline[i].raw_name]).on("click", function (d) { setTime(d) })
        }

        if (timeline[i].starts) {
            const tle = tlo.append("div").attr("class", "timeline-entry timeframe " + current_class) // add timeline entry
            tle.append("span").attr("class", "time-column") // add time column
            tle.append("span").attr("class", "name-column").html(timeline[i].starts)
        }
    }


    //===== update current time and data
    document.getElementById('current_time').innerHTML = time_format(new Date(time))
    document.getElementById('azimuth').innerHTML = (sunPos.azimuth * 180 / Math.PI).toFixed(1) + "&deg;"
    document.getElementById('altitude').innerHTML = (sunPos.altitude * 180 / Math.PI).toFixed(1) + "&deg;"

    const moonIllumination = SunCalc.getMoonIllumination(time)
    let phaseName
    for (const phase in moonPhases) {
        if (phase < moonIllumination.phase) {
            phaseName = moonPhases[phase]
        }
    }

    document.getElementById('azimuth-moon').innerHTML = (moonPos.azimuth * 180 / Math.PI).toFixed(1) + "&deg;"
    document.getElementById('altitude-moon').innerHTML = (moonPos.altitude * 180 / Math.PI).toFixed(1) + "&deg;"
    document.getElementById('phase-moon').innerHTML = phaseName
    document.getElementById('fraction-moon').innerHTML = (moonIllumination.fraction * 100).toFixed(1) + "%"

    d3.select(".current-sun").classed("hide", !(plugin_options.astroSun || plugin_options.photoSun))
    d3.select(".current-moon").classed("hide", !plugin_options.moon)

    //===== draw altitude diagram =====

    const data = []
    const moonData = []

    const t = times.nadir.getTime()
    const steps = 100
    const stepSize = 24.0 * 60 * 60 * 1000 / steps
    //get altitude for each time
    for (let i = 0; i <= steps; i++) {
        data[i] = { x: 1.0 * i / steps, y: -SunCalc.getPosition(t + stepSize * i, lat, lon).altitude }
        moonData[i] = { x: 1.0 * i / steps, y: -SunCalc.getMoonPosition(t + stepSize * i, lat, lon).altitude }
    }

    // set line
    const line = d3.line()
        .x(function (d) { return d['x'] * 200 })
        .y(function (d) { return (d['y'] + Math.PI / 2) * 100 / Math.PI });

    // set d attirubte of line
    d3.select('#sun_path').attr('d', (plugin_options.astroSun || plugin_options.photoSun) ? line(data) : "");
    d3.select('#moon_path').attr('d', plugin_options.moon ? line(moonData) : "");

    // set current sun position (yellow circle)
    d3.select('.path-circle#sun')
        .attr('cx', mod((time - t) * 200.0 / (24.0 * 60 * 60 * 1000), 200))
        .attr('cy', (-sunPos.altitude + Math.PI / 2) * 100 / Math.PI)
        .style('opacity', (plugin_options.astroSun || plugin_options.photoSun) ? 1 : 0)

    d3.select('.path-circle#moon')
        .attr('cx', mod((time - t) * 200.0 / (24.0 * 60 * 60 * 1000), 200))
        .attr('cy', (-moonPos.altitude + Math.PI / 2) * 100 / Math.PI)
        .style('opacity', plugin_options.moon ? 1 : 0)


}


function time_format(d) {
    if (isNaN(d)) {
        return "--:--" + (store.get('zuluMode') ? "Z" : "")
    }

    const d_local = new Date(new Date(d.getTime()).toLocaleString("en-US", { timeZone: timezone }));

    const hours = format_two_digits(d_local.getHours());
    const minutes = format_two_digits(d_local.getMinutes());
    return hours + ":" + minutes + (store.get('zuluMode') ? "Z" : "");
}

function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
}

function setTime(timeString) {
    if (timeString.substring(0, 4) == "moon") {
        store.set('timestamp', moonTimes[timeString.substring(4)].getTime())
    } else {
        //var times = SunCalc.getTimes(time, lat, lon)
        store.set('timestamp', times[timeString].getTime())
    }
}

// picker has been opened at latLon coords
picker.emitter.on('pickerOpened', latLon => {
    if (!isOpen) { return; }
    onPickerOpened()

    movedPickerRedraw(latLon)
})

// picker was dragged by user to latLon coords
picker.emitter.on('pickerMoved', latLon => {
    if (!isOpen) { return; }

    movedPickerRedraw(latLon)
})

// picker was closed
picker.emitter.on('pickerClosed', () => {
    d3.select(".sun-times").attr("id", "hide")
    d3.select(".open-picker").attr("id", "")

    d3.select(".picker").select("svg").remove()
})

store.on('timestamp', () => { movedPickerRedraw() })
