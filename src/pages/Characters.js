import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

import useInfiteScroll from '../hooks/useInfiniteScroll'

const Characters = () => {
  const { loading, response, loadingPage } = useInfiteScroll('character')

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Box>
      {loadingPage && (
        <CircularProgress
          sx={{ position: 'fixed', bottom: '20px', left: '50%' }}
        />
      )}
      <Box textAlign={'center'} p={4}>
        <Typography variant='h1' color={'rickHair.main'}>
          Characters
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent='center'
        sx={{ padding: '10px' }}
      >
        {response.map((character, index) => (
          <Grid item key={index}>
            <Card sx={{ maxWidth: '330px', backgroundColor: 'cardColor.main' }}>
              <CardContent>
                <Typography variant='h5'>{character.name}</Typography>
              </CardContent>
              <CardMedia
                component='img'
                height='300px'
                image={character.image}
              />
              <Grid
                container
                justifyContent={'space-evenly'}
                direction='column'
                sx={{ marginLeft: '12px', marginTop: '10px' }}
              >
                <Grid item>
                  <Typography>
                    status:{' '}
                    <span
                      style={
                        character.status === 'Dead'
                          ? { color: 'red' }
                          : { color: '#78F37D' }
                      }
                    >
                      {character.status}
                    </span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>location: {character.location.name}</Typography>
                </Grid>
              </Grid>
              <CardActions>
                <Button
                  size='small'
                  component={Link}
                  to={`/characters/${character.id}`}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Characters
