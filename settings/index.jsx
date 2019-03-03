function Colors(props) {
  return (
    <Page>
      <Section>
        <Text>Thank you for trying <Text bold>Metrix</Text> ! ❤️</Text>
      </Section>

      <Section
        title={<Text bold align="center">Background Color Settings</Text>}>

        <Text>This will change the clock face background</Text>

        <ColorSelect
          settingsKey="backgroundColor"
          colors={[
            {color: '#535c68'},
            {color: '#2f3640'},
            {color: '#130f40'},
            {color: 'black'},
            {color: '#badc58'},
            {color: '#6ab04c'},
            {color: '#fd79a8'},
            {color: '#b71540'},
            {color: '#f53b57'},
            {color: '#3c40c6'},
            {color: '#0fbcf9'},
            {color: '#ecf0f1'},
            {color: '#fdcb6e'},
            {color: '#4a69bd'},
          ]}
        />
      </Section>


      <Section title={<Text bold align="center">Metrics colors</Text>}>
        <Text>This will reset all customized colors of all metrics.</Text>
        <Button
          label="Reset all colors"
          onClick={() => { props.settingsStorage.setItem('resetAllColors', 'true') }}
          />
      </Section>

      <Section title={<Text bold align="center">Weather</Text>}>
        <Toggle
          settingsKey="imperialUnit"
          label={`Imperial units (Fahrenheit)`}
        />

        <Select
          title="Weather refresh time"
          label={`Refresh time (in minutes)`}
          settingsKey="weatherRefreshTime"
          options={[
            {name:"15"},
            {name:"30"},
            {name:"60"},
            {name:"120"},
            {name:"180"},
          ]}
        />

        <Text bold>
          Manual Location
        </Text>

        <Toggle
          settingsKey="manualLocation"
          label="Use Manual Location"
        />

        <Text>
          Activate the manual location option to avoid using geolocation with GPS.
        </Text>

        <Text>
          This is useful if the weather does not display properly
          or if you want to keep your real location private 🕵.
        </Text>

        <Text italic>
          Only fill the inputs which make sense for your location.
        </Text>

        <TextInput
          placeholder="FR"
          settingsKey="countryRegion"
          title="Country Region"
        />

        <TextInput
          placeholder="Tour Eiffel - Parc du Champ-de-Mars"
          settingsKey="addressLine"
          title="Address"
        />

        <TextInput
          placeholder="75007"
          settingsKey="postalCode"
          title="Postal Code"
        />

        <TextInput
          placeholder="WA"
          settingsKey="adminDistrict"
          title="Administration District"
        />

        <Button
          label="Update"
          onClick={() => {
            props.settingsStorage.setItem('weatherNotification', 'updating...');
            props.settingsStorage.setItem('updateManualLocation', 'true');
          }}
        />

        <Text>
          {`${typeof props.settingsStorage.getItem('weatherNotification') === 'string' ?
            props.settingsStorage.getItem('weatherNotification') : '-'}`}
        </Text>

      </Section>

      <Section title={<Text bold align="center">Distance</Text>}>
        <Text>
          Activate this option to see distance in miles.
        </Text>

        <Toggle
          label={`Imperial units (miles)`}
          settingsKey="distanceImperialUnit"
        />
      </Section>

      <Section title={<Text bold align="center">Lock</Text>}>
        <Text>
          Activate this option to lock the clock face, so any interaction will be discarded.
          This prevent to accidentally change the user interface.
        </Text>

        <Toggle
          label={`Lock the clock face`}
          settingsKey="lockUI"
        />
      </Section>

      <Section title={<Text bold align="center">Contact</Text>}>
        <Text>
          You can contact me on <Link source='https://twitter.com/jeremiecorpinot' bold>Twitter </Link>
          or by <Link source='mailto:jeremiecorpinot@outlook.com'>email</Link>.
        </Text>
      </Section>

      <Section title={<Text bold align="center">Support</Text>}>
        <Text>
          You can pay me a beer on <Link source='https://paypal.me/rootasjey' bold>Paypal </Link>.
        </Text>

        <Text>
          As I pay for for the DarkSky API usage, I can't afford all API requests. Feel free to support the clock face if you use this daily.
        </Text>

        <Text>
          Because there's a API usage limit, the weather data may not update right away. This will depend on the amount of users using this clock face.
        </Text>
      </Section>

      <Section title={<Text bold align="center">About</Text>}>
        <Text>
          This project is open sourced on <Link source='https://github.com/rootasjey/metrix-fitbit' bold>GitHub.</Link>
          You can ask there for a new feature or report an issue.
        </Text>

        <Text>Coded with ❤️</Text>
      </Section>

      <Section title={<Text bold align="center">Credits</Text>}>

        <Text>
          Weather data is provided by <Link source='https://darksky.net/' bold>DarkSky </Link>.
        </Text>

        <Text>
          Icons made by <Link source='https://www.flaticon.com/authors/good-ware'>Good Ware </Link>,
          <Link source='https://www.freepik.com'> Freepik </Link>,
          <Link source='https://www.flaticon.com/authors/iconixar'> iconixar</Link>,
          <Link source='https://www.flaticon.com/authors/rns'> RNS</Link>,
          <Link source='https://www.flaticon.com/authors/smashicons'> Smashicons</Link>,
          <Link source='https://www.flaticon.com/authors/yannick'> Yannick</Link> from
          <Link source='https://www.flaticon.com/'> www.flaticon.com</Link> is licensed by
          <Link source='http://creativecommons.org/licenses/by/3.0/'> CC 3.0 BY.</Link>
        </Text>

      </Section>
    </Page>
  );
}

registerSettingsPage(Colors);

// To change B&W colors, auto rainbow, colored
