"use strict";

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-sun-position",
  "version": "0.0.1",
  "author": "Jochen Jacobs",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jacobsjo/windy-plugin-sun-position"
  },
  "description": "Windy plugin that adds an indication of current sun direcection as well as sunset and sunrise directions at picker position",
  "displayName": "Sun Position",
  "hook": "menu",
  "dependencies": ["https://unpkg.com/d3@5.7.0/dist/d3.min.js", "https://unpkg.com/suncalc@1.8.0/suncalc.js"],
  "className": "plugin-lhpane plugin-mobile-fullscreen",
  "exclusive": "lhpane"
},
/* HTML */
'<div class="mobile-header">Sun Details</div> <div class="plugin-content"> <div class="open-picker"> <h2>Picker not open</h2> Please open the weather picker to define position for sun-details. </div> <div class="sun-times" id="hide"> <span class="time-column"></span><span class="timeframe first" id="nightColor">Nighttime</span><br> <span class="time-column time-text" id="nightEnd">04:00</span><span class="time" id="astroColor">Astronomical Dawn</span><br> <span class="time-column"></span><span class="timeframe" id="astroColor">Astron. Twilight</span><br> <span class="time-column time-text" id="nauticalDawn">04:00</span><span class="time" id="blueColor">Nautical Dawn</span><br> <span class="time-column"></span><span class="timeframe" id="blueColor">Blue Hour</span><br> <span class="time-column time-text" id="dawn">04:30</span><span class="time" id="goldenColor">Civil Dawn</span><br> <span class="time-column"></span><span class="timeframe" id="goldenColor">Golden Hour</span><br> <span class="time-column time-text" id="sunrise">05:00</span><span class="time-minor" id="goldenColor">Sunrise</span><br> <span class="time-column time-text" id="goldenHourEnd">05:30</span><span class="time" id="dayColor">&nbsp;</span><br> <span class="time-column"></span><span class="timeframe" id="dayColor">Daytime</span><br> <span class="time-column time-text" id="solarNoon">12:00</span><span class="time-minor" id="dayColor">Solar Noon</span><br> <span class="time-column time-text" id="goldenHour">18:00</span><span class="time" id="goldenColor">&nbsp;</span><br> <span class="time-column"></span><span class="timeframe" id="goldenColor">Golden Hour</span><br> <span class="time-column time-text" id="sunset">18:30</span><span class="time-minor" id="goldenColor">Sunset</span><br> <span class="time-column time-text" id="dusk">19:00</span><span class="time" id="blueColor">Civil Dusk</span><br> <span class="time-column"></span><span class="timeframe" id="blueColor">Blue Hour</span><br> <span class="time-column time-text" id="nauticalDusk">19:30</span><span class="time" id="astroColor">Nautical Dusk</span><br> <span class="time-column"></span><span class="timeframe" id="astroColor">Astron. Twilight</span><br> <span class="time-column time-text" id="night">19:30</span><span class="time" id="nightColor">Astronomical Dusk</span><br> <span class="time-column"></span><span class="timeframe last" id="nightColor">Nighttime</span><br> <div class="current-time" id="current_time">12:25</div> <span class="current-pos">Azimuth</span> <span class="current-pos">Altitude</span><br> <span class="current-pos" id="azimuth">0</span> <span class="current-pos" id="altitude">0</span> <svg class="sun-path"> <path id="sun_path"></path> <path id="horizon" d="M 0 50 H 200"></path> <circle class="sun-circle" id="sun" cx="50" cy="50" r="4"></circle> </svg> </div> </div>',
/* CSS */
'.onwindy-plugin-sun-position .left-border{left:250px}.onwindy-plugin-sun-position #search{display:none}#windy-plugin-sun-position{width:250px}#windy-plugin-sun-position .plugin-content{padding:20px 15px 15px 15px;font-size:14px;line-height:1.6;background-color:#404040;color:white}#windy-plugin-sun-position .plugin-content h2{color:white}#windy-plugin-sun-position .plugin-content .open-picker#hide,#windy-plugin-sun-position .plugin-content .sun-times#hide{display:none}#windy-plugin-sun-position .plugin-content .sun-times{margin-left:5px;margin-right:5px;margin-top:10px}#windy-plugin-sun-position .plugin-content .sun-times span{position:relative;left:20px;display:inline-block;margin-bottom:0;padding-bottom:.5em}#windy-plugin-sun-position .plugin-content .sun-times span.time-column{width:70px}#windy-plugin-sun-position .plugin-content .sun-times span.time-text{cursor:pointer}#windy-plugin-sun-position .plugin-content .sun-times .time-minor{font-size:11px}#windy-plugin-sun-position .plugin-content .sun-times .time::after,#windy-plugin-sun-position .plugin-content .sun-times .time-minor::after{display:block;position:absolute;left:-23px;top:0px;background-color:gray;width:20px;height:20px;border-radius:10px;content:\' \'}#windy-plugin-sun-position .plugin-content .sun-times .time-minor::after{width:15px;height:15px;border-radius:7px;left:-21px;top:4px}#windy-plugin-sun-position .plugin-content .sun-times .time::before,#windy-plugin-sun-position .plugin-content .sun-times .time-minor::before,#windy-plugin-sun-position .plugin-content .sun-times .timeframe::before{content:"";position:absolute;left:-15px;top:10px;border-left:4px solid;height:100%;width:3px}#windy-plugin-sun-position .plugin-content .sun-times .timeframe.first::before{top:0px;height:150%}#windy-plugin-sun-position .plugin-content .sun-times .timeframe.last::before{height:50%}#windy-plugin-sun-position .plugin-content .sun-times #nightColor{color:black}#windy-plugin-sun-position .plugin-content .sun-times #astroColor{color:#121654}#windy-plugin-sun-position .plugin-content .sun-times #blueColor{color:blue}#windy-plugin-sun-position .plugin-content .sun-times #goldenColor{color:orange}#windy-plugin-sun-position .plugin-content .sun-times #dayColor{color:yellow}#windy-plugin-sun-position .plugin-content .sun-times #nightColor::after{background-color:black}#windy-plugin-sun-position .plugin-content .sun-times #astroColor::after{background-color:#121654}#windy-plugin-sun-position .plugin-content .sun-times #blueColor::after{background-color:blue}#windy-plugin-sun-position .plugin-content .sun-times #goldenColor::after{background-color:orange}#windy-plugin-sun-position .plugin-content .sun-times #dayColor::after{background-color:yellow}#windy-plugin-sun-position .plugin-content .sun-times #nightColor::before{border-left-color:black}#windy-plugin-sun-position .plugin-content .sun-times #astroColor::before{border-left-color:#121654}#windy-plugin-sun-position .plugin-content .sun-times #blueColor::before{border-left-color:blue}#windy-plugin-sun-position .plugin-content .sun-times #goldenColor::before{border-left-color:orange}#windy-plugin-sun-position .plugin-content .sun-times #dayColor::before{border-left-color:yellow}#windy-plugin-sun-position .plugin-content .sun-times .current-time{font-size:25pt;text-align:center}#windy-plugin-sun-position .plugin-content .sun-times .current-pos{display:inline-block;width:45%;text-align:center}#windy-plugin-sun-position .plugin-content .sun-times .sun-path{width:200px;height:100px}#windy-plugin-sun-position .plugin-content .sun-times .sun-path path{fill:none;stroke:#606060;stroke-width:2px}#windy-plugin-sun-position .plugin-content .sun-times .sun-circle{fill:yellow}.windy-plugin-sun-position.sun-position-dial{position:absolute;left:-99.5px;top:24.5px;width:199px;height:199px}.windy-plugin-sun-position.sun-position-dial .dial-line-sun{stroke:rgba(68,65,65,0.84);stroke-width:3}.windy-plugin-sun-position.sun-position-dial .dial-line-sunrise,.windy-plugin-sun-position.sun-position-dial .dial-line-sunset{stroke:rgba(68,65,65,0.84);stroke-dasharray:5;stroke-width:2}.windy-plugin-sun-position.sun-position-dial #hover.dial-line-sunrise,.windy-plugin-sun-position.sun-position-dial #hover.dial-line-sunset{stroke-width:4}',
/* Constructor */
function () {
  var map = W.require('map');

  var store = W.require('store');

  var utils = W.require('utils');

  var picker = W.require('picker');

  var lineLength = 80;
  var isOpen = false;

  this.onopen = function () {
    if (isOpen) return;
    isOpen = true;

    if (!d3.select(".picker").empty() && d3.select(".picker").style("display") != "none") {
      onPickerOpened();
      redraw();
    }

    ;
  };

  this.onclose = function () {
    isOpen = false;
    d3.select(".picker").select("svg").remove();
  };

  var readValues = function readValues(latLon) {
    pickerOpen = true;
    redraw();
  };

  var svg;
  var sunLine;
  var sunriseLine;
  var sunsetLine;

  var onPickerOpened = function onPickerOpened() {
    var p = d3.select(".picker");
    svg = p.append("svg").attr("class", "windy-plugin-sun-position sun-position-dial");
    sunriseLine = svg.append("line").attr("class", "dial-line dial-line-sunrise").attr("x1", 100).attr("y1", 100).attr("x2", 100).attr("y2", 100).on("click", function (d) {
      setTime("sunrise");
    });
    sunsetLine = svg.append("line").attr("class", "dial-line dial-line-sunset").attr("x1", 100).attr("y1", 100).attr("x2", 100).attr("y2", 100).on("click", function (d) {
      setTime("sunset");
    });
    sunLine = svg.append("line").attr("class", "dial-line dial-line-sun").attr("x1", 100).attr("y1", 100).attr("x2", 100).attr("y2", 100);
    d3.selectAll(".dial-line").on("mouseover", function (d) {
      d3.select(this).attr("id", "hover");
    }).on("mouseout", function (d) {
      d3.select(this).attr("id", "");
    });
    d3.select(".sun-times").attr("id", "");
    d3.select(".open-picker").attr("id", "hide");
  };

  var redraw = function redraw() {
    var _picker$getParams = picker.getParams(),
        lat = _picker$getParams.lat,
        lon = _picker$getParams.lon,
        values = _picker$getParams.values,
        overlay = _picker$getParams.overlay;

    var time = store.get('timestamp');
    var times = SunCalc.getTimes(time, lat, lon);
    var sunPos = SunCalc.getPosition(time, lat, lon);
    var sunrisePos = SunCalc.getPosition(times.sunrise, lat, lon);
    var sunsetPos = SunCalc.getPosition(times.sunset, lat, lon);
    var sunLineLength;
    var sunLineOpacity;

    if (sunPos.altitude > 0) {
      sunLineLength = Math.cos(sunPos.altitude) * lineLength;
      sunLineOpacity = 1;
    } else if (sunPos.altitude > -0.1) {
      sunLineLength = lineLength;
      sunLineOpacity = 1 + 10.0 * sunPos.altitude;
    } else {
      sunLineLength = lineLength;
      sunLineOpacity = 0;
    }

    sunLine.attr("x2", 100 - Math.sin(sunPos.azimuth) * sunLineLength).attr("y2", 100 + Math.cos(sunPos.azimuth) * sunLineLength).attr("stroke-opacity", sunLineOpacity);

    if (isNaN(sunrisePos.azimuth)) {
      sunriseLine.attr("x2", 100).attr("y2", 100);
    } else {
      sunriseLine.attr("x2", 100 - Math.sin(sunrisePos.azimuth) * lineLength).attr("y2", 100 + Math.cos(sunrisePos.azimuth) * lineLength);
    }

    if (isNaN(sunsetPos.azimuth)) {
      sunsetLine.attr("x2", 100).attr("y2", 100);
    } else {
      sunsetLine.attr("x2", 100 - Math.sin(sunsetPos.azimuth) * lineLength).attr("y2", 100 + Math.cos(sunsetPos.azimuth) * lineLength);
    }

    Array.prototype.forEach.call(document.getElementsByClassName('time-text'), function (t) {
      t.innerHTML = time_format(times[t.id]);

      t.onclick = function () {
        return setTime(t.id);
      };
    });
    document.getElementById('current_time').innerHTML = time_format(new Date(time));
    document.getElementById('azimuth').innerHTML = (sunPos.azimuth * 180 / Math.PI).toFixed(1) + "&deg;";
    document.getElementById('altitude').innerHTML = (sunPos.altitude * 180 / Math.PI).toFixed(1) + "&deg;";
    var data = [];
    var t = new Date(time).setHours(0, 0, 0, 0);
    var steps = 100;
    var stepSize = 24.0 * 60 * 60 * 1000 / steps;

    for (var i = 0; i <= steps; i++) {
      var alt = -SunCalc.getPosition(t + stepSize * i, lat, lon).altitude;
      data[i] = {
        x: 1.0 * i / steps,
        y: alt
      };
    }

    var line = d3.line().x(function (d) {
      return d['x'] * 200;
    }).y(function (d) {
      return (d['y'] + Math.PI / 2) * 100 / Math.PI;
    });
    d3.select('#sun_path').attr('d', line(data));
    d3.select('#sun').attr('cx', (time - t) * 200.0 / (24.0 * 60 * 60 * 1000)).attr('cy', (-sunPos.altitude + Math.PI / 2) * 100 / Math.PI);
  };

  function time_format(d) {
    if (isNaN(d)) {
      return "--:--";
    }

    var hours = format_two_digits(d.getHours());
    var minutes = format_two_digits(d.getMinutes());
    return hours + ":" + minutes;
  }

  function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
  }

  var setTime = function setTime(timeString) {
    console.log('setting time to', timeString);

    var _picker$getParams2 = picker.getParams(),
        lat = _picker$getParams2.lat,
        lon = _picker$getParams2.lon,
        values = _picker$getParams2.values,
        overlay = _picker$getParams2.overlay;

    var time = store.get('timestamp');
    var times = SunCalc.getTimes(time, lat, lon);
    store.set('timestamp', times[timeString].getTime());
  };

  picker.on('pickerOpened', function (latLon) {
    if (!isOpen) return;
    onPickerOpened();
    redraw();
  });
  picker.on('pickerMoved', function (latLon) {
    if (!isOpen) return;
    redraw();
  });
  picker.on('pickerClosed', function () {
    d3.select(".sun-times").attr("id", "hide");
    d3.select(".open-picker").attr("id", "");
  });
  store.on('timestamp', function (ts) {
    redraw();
  });
});