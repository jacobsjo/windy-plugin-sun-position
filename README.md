<p align="center"><img src="https://www.windy.com/img/logo201802/logo-full-windycom-gray-v3.svg"></p>

Windy plugin that gives shows sun position on the map and gives details about sunset and sunrise times. To use the published version, go to [windy.com](https://www.windy.com), open the menu, click on "Install Windy plugin", enter "windy-plugin-sun-position" and click "Load plugin".

To open the display, click on "More layers..." on the bottom right, then select "Sun Position" (Currently does not work on mobile). Then open a picker by clicking on the map (but not on a city name).

### Sun dial
The sun dial displays the current sun azimuth on the map using a black line from the picker position. Additionally, dashed lines show the azimuth of sunrise and sunset. Clicking on the sunrise or sunset line will set the current time to the sunrise or sunset time respectively.

![Sun dial](pictures/sundial.jpg?raw=true "Sun dial")

### Sun detail pane
The sun detail pane on the left shows the time of astronomical, nautical, and civil dusk and dawn; start and end of golden hour and solar noon. Also, the current time and sun azimuth and altitude are displayed.

![Sun detail pane](pictures/sundetail.jpg?raw=true "Sun detail pane")

### Development
If you want to use the development build clone this repository and run,
```sh
npm i
npm run start-dev
```
Now open your browser browser at [https://localhost:9999/plugin.js](https://localhost:9999/plugin.js) to accept self signed SSL certificate.

Then open your browser at [www.windy.com/dev](https://www.windy.com/dev) to test the plugin.

If it fails, make sure that the plugin is correctly built and accessible with your browser at [https://localhost:9999/plugin.js](https://localhost:9999/plugin.js).

### Changelog
## V0.1.0
Original release
## V0.1.1
Fixed timezone issues:
- Displays times in timezone of position selected (instead of local timezone of user)
- When Windy setting to display all times in UTC is selected, displays all times in UTC
