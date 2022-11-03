export const Colors = {
  reddish: '#f87171',
  yellowish: '#facc15',
  bluish: '#22d3ee',
  greenish: '#68BAA6',
  removeAndDate: '#C32FA3',
  navbarInactive: '#393939',
  navbarActive: '#d62f64',
  background: '#F1F1F1',
  dark: '#393939', //mainly text inputs border

  //DARK THEME
  backgroundDarkMode: '#121212',
  textColorDarkMode: '#F1F1F1',
  blueishDarkMode: '#00B1FF',

  get buttons() {
    return '#c91c48'; // eye friendly
    // return this.greenish
  },
  get buttonsDarkMode() {
    return this.blueishDarkMode
  }
}
