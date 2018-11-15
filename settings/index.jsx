function Colors(props) {
  return (
    <Page>
      <Section>
        <Text>Thank you for trying <Text bold>Metrix</Text> !</Text>
      </Section>
      
      <Section
        title={<Text bold align="center">Background Color Settings</Text>}>
        
        <Text>This will change the clock face background</Text>
        
        <ColorSelect
          settingsKey="backgroundColor"
          colors={[
            {color: 'black'},
            {color: 'tomato'},
            {color: 'sandybrown'},
            {color: 'gold'},
            {color: 'aquamarine'},
            {color: 'deepskyblue'},
            {color: 'plum'}
          ]}
        />
      </Section>
      
      <Section title={<Text bold align="center">Weather</Text>}>
        <Toggle
          settingsKey="imperialUnit"
          label={`Imperial (Fahrenheit)`}
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

      </Section>
      
      <Section title={<Text bold align="center">Contact</Text>}>
        <Text>
          You can contact me on <Link source='https://twitter.com/jeremiecorpinot' bold>Twitter </Link>
          or by <Link source='mailto:jeremiecorpinot@outlook.com'>email</Link>.
        </Text> 
      </Section>
      
      <Section title={<Text bold align="center">About</Text>}>
        <Text>
          This project is open sourced on <Link source='https://github.com/rootasjey/metrix-fitbit' bold>GitHub.</Link> 
          You can ask there for a new feature or report an issue.
        </Text>
      </Section>
      
      <Section title={<Text bold align="center">Credits</Text>}>
                
        <Text>
          Weather data is provided by <Link source='https://darksky.net/' bold>DarkSky </Link>.
        </Text> 
        
        <Text>
          Icons made by <Link source='https://www.flaticon.com/authors/good-ware'>Good Ware </Link>,
          <Link source='https://www.freepik.com'> Freepik </Link>,
          <Link source='https://www.flaticon.com/authors/iconixar'> iconixar </Link>,
          <Link source='https://www.flaticon.com/authors/rns'> RNS </Link>,
          <Link source='https://www.flaticon.com/authors/smashicons'> Smashicons </Link>,
          <Link source='https://www.flaticon.com/authors/yannick'> Yannick </Link> from
          <Link source='https://www.flaticon.com/'> www.flaticon.com</Link> is licensed by 
          <Link source='http://creativecommons.org/licenses/by/3.0/'> CC 3.0 BY.</Link>
        </Text>
        
      </Section>
    </Page>
  );
}

registerSettingsPage(Colors);

// To change B&W colors, auto rainbow, colored
