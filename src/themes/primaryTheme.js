import { createTheme } from '@mui/material'

const rickGreen = '#78F37D'

export default createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: rickGreen,
    },
    success: {
      main: rickGreen,
    },
    neutral: {
      main: '#292D31',
    },
    cardColor: {
      main: '#292828',
    },
    rickGreen: {
      main: rickGreen,
    },
    rickHair: {
      main: 'white',
    },
  },
  typography: {
    fontFamily: ['Fredoka'],
    h1: {
      fontSize: '6rem',
      fontWeight: 700,
      color: 'white',
      '@media (max-width:950px)': {
        fontSize: '4rem',
      },
      '@media (max-width:600px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontSize: '4.5rem',
      color: 'white',
      '@media (max-width:950px)': {
        fontSize: '3.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '3rem',
      },
    },
    h3: {
      color: 'white',
    },
    h5: {
      color: 'white',
    },
    h6: {
      color: 'white',
    },
  },
  components: {
    MuiListItemButton: {
      root: {
        '&$selected': {
          color: '#5FBB7D',
          backgroundColor: '#F0F3F3',
        },
      },
    },
  },
})
