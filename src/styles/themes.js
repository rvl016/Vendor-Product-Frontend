import { createMuiTheme } from '@material-ui/core/styles';

export const mui_theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#2b2b2b',
      contrastText: '#f0f0f0',
    },
    secondary: {
      light: '#8e8e8e',
      main: '#616161',
      dark: '#373737',
      contrastText: '#000',
    },
  },
  red : '#ff3232',
  green : '#5cb65c',
});