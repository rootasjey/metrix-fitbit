# metrix-fitbit
A Fitbit Ionic clock face showing metrics activities.

You can change each metric to one of the 9 available. You can even have the same activity multiple times and showing different states value.

For example, for steps, you could show both:

* the total steps value
* percentage achievement goal of steps

![metrix.gif](metrix.gif)

![metrix.png](metrix.png)

## Changelog

15/11/18
* Add weather metric
* Make the mode (stats/switch) button bigger
* Fix save color for clock

## Features

* Colorful design
* 9 available metrics (clock, weather, calories, ...)
* 3 different states meter (total, percent, missing/over)
* The switch mode button let you be in 2 different states:
  * **Stats:** you can change between 3 differents stats for metric value (total, percent, missing/over) _(note that some metric don't necessarly have all stats like the clock metric)_
  * **Next:** switch to the next available activity

## Activities metrics

* active minutes
* calories
* clock
* date
* distance
* elevation gain
* heart rate
* steps
* weather

## Permissions and Privacy

Because this clock face shows personal goals, heart rate and weather data, it uses these exact same information:

* Personal goals (steps, calories, distance, ...)
* Heart rate sensor
* **GPS location** for the weather

No data is keep nor send to first or third parties entities, companies or individuals. You can check by looking at the source code.

When installing the clock face, it'll ask you for these permissions. You can deny all, some or none. The non-functional activities metrics won't show on the clock face in that case.

## Ionic vs. Versa

Soon.

## Settings

In the settings, you can change the color background of the clock face and you can find some contact information.

## Weather

The weather data is provided by [DarkSky](https://darksky.net).

You can change the refresh time rate in the settings. By default, the cache lasts 1 hour (60 min).

Weather data is only updated when the clock face is active (i.e. screen turned on) and is not updated in background every X time. This is because there's a usage limite of the API.

As I pay for any extra usage of the DarkSky API, feel free to support the clock face if you use this daily.

_Because there's a API usage limit and I pay for extra queries, the weather data may not update right away. This will depend on the amount of users this clock face has._

## Contributing

Feel free to contribute to this project by:

* Opening a PR with a change proposition
* Openning an issue if
  * you want to propose a new feature
  * or if you encounter a problem

## Resources

Thanks for the following:

* [Fitbit's icons](https://github.com/Fitbit/sdk-design-assets)

The following assets are from [www.flaticon.com](https://www.flaticon.com/") and is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0).

* [Good Ware](https://www.flaticon.com/authors/good-ware)
* [Freepik](https://www.freepik.com)
* [Iconixar](https://www.flaticon.com/authors/iconixar)
* [RNS](https://www.flaticon.com/authors/rns)
* [Smalicons](https://www.flaticon.com/authors/smashicons)
* [Yannick](https://www.flaticon.com/authors/yannick)

## Licence

This project is under MIT Licence.
