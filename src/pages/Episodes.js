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

const Episodes = () => {
  const { loading, response, loadingPage, error } = useInfiteScroll('episode')
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
          Episodes
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent='center'
        sx={{ padding: '10px' }}
      >
        {response.map((episode, index) => (
          <Grid item key={index}>
            <Card sx={{ maxWidth: '330px', backgroundColor: 'cardColor.main' }}>
              <CardContent>
                <Typography variant='h5' color={'rickGreen.main'}>
                  {episode.name}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant='h6'>
                  Air Date: {episode.air_date}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant='h6'>Episode: {episode.episode}</Typography>
              </CardContent>
              <CardContent>
                <Typography variant='h6'>
                  Number of characters: {episode.characters.length}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/episodes/${episode.id}`}>
                  See characters from episode
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Episodes
