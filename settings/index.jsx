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
    </Page>
  );
}

registerSettingsPage(Colors);

// To change B&W colors, auto rainbow, colored
