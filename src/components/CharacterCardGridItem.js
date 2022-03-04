import React from 'react'
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'

const CharacterCardGridItem = (props) => {
  const { character, index } = props
  return (
    <Grid item key={index}>
      <Card sx={{ maxWidth: '330px', backgroundColor: 'cardColor.main' }}>
        <CardContent>
          <Typography variant='h5'>{character.name}</Typography>
        </CardContent>
        <CardMedia component='img' height='300px' image={character.image} />
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
  )
}

export default CharacterCardGridItem
