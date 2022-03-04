import { Typography } from '@mui/material'
import React from 'react'

const LocationUnknown = () => {
  return (
    <>
      <Typography variant='h1' sx={{ textAlign: 'center', marginTop: '10%' }}>
        WE HAVE NO IDEA WHERE THEY ARE
      </Typography>
      <Typography
        variant='h1'
        sx={{ textAlign: 'center', color: 'rickGreen.main' }}
      >
        Location Unknown!
      </Typography>
    </>
  )
}

export default LocationUnknown
