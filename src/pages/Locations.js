import React from 'react'

import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
} from '@mui/material'
import { Link } from 'react-router-dom'

import useInfiteScroll from '../hooks/useInfiniteScroll'
const Locations = () => {
  const { loading, response, loadingPage, error } = useInfiteScroll('location')
  if (error) console.error(error)

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {loadingPage && (
        <CircularProgress
          sx={{ position: 'fixed', bottom: '20px', left: '50%' }}
        />
      )}
      <Box textAlign={'center'} p={4}>
        <Typography
          variant='h1'
          sx={{ marginBottom: '15px', color: 'rickHair.main' }}
        >
          Locations
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent='center'
        sx={{ padding: '10px' }}
      >
        {response.map((location, index) => (
          <Grid item key={index}>
            <Card sx={{ maxWidth: '330px', backgroundColor: 'cardColor.main' }}>
              <CardContent>
                <Typography variant='h5' color={'rickGreen.main'}>
                  {location.name}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant='h6'>
                  Dimension: {location.dimension}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant='h6'>Type: {location.type}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant='h6'>
                  Number of known residents: {location.residents.length}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/locations/${location.id}`}>
                  See Residents
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Locations
