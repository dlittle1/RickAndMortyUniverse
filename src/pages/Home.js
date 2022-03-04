import React from 'react'
import rickAndMorty from '../assets/rickAndMortyHomeReduced.jpg'
import { Typography, Box, Button } from '@mui/material'

const imageStyle = {
  background: `url(${rickAndMorty})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: '100%',
  height: '100vh',
  position: 'relative',
}

const boxStyle = {
  textAlign: 'center',
  maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '80%' },
  midWidth: '70%',
  position: 'absolute',
  marginRight: { xs: '0px', sm: '40px' },
  left: { xs: '0px', sm: '100px' },
  top: { xs: '20px', sm: '40px', md: '40px', lg: '100px' },
}

const Home = () => {
  return (
    <div style={imageStyle}>
      <Box sx={boxStyle}>
        <Typography variant='h2'>Welcome to the Universe of</Typography>
        <Typography variant='h1'>Rick and Morty</Typography>
        <Button variant='contained' color='success' sx={{ marginTop: '20px' }}>
          <Typography variant='h6'>Explore!</Typography>
        </Button>
      </Box>
    </div>
  )
}

export default Home
