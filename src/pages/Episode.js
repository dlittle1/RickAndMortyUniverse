import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography, Grid } from '@mui/material'
import CharacterCardGridItem from '../components/CharacterCardGridItem'
import axios from 'axios'
const Episode = () => {
  let params = useParams()

  const [response, setResponse] = useState()
  const [characters, setCharacters] = useState([])
  const [characterIds, setCharacterIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/${params.episodeId}`)
      .then((res) => setResponse(res.data))
      .then(() => {})
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (response) {
      response.characters.forEach((character) => {
        const slash = character.lastIndexOf('/')
        setCharacterIds((prevstate) => [
          ...prevstate,
          character.slice(slash + 1),
        ])
      })
    }
  }, [response])

  useEffect(() => {
    if (response) {
      const url = 'https://rickandmortyapi.com/api/character/' + characterIds

      axios
        .get(url)
        .then((res) => setCharacters(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    }
  }, [characterIds])

  if (loading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
        }}
        textAlign='center'
      >
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box>
      <Box textAlign={'center'} p={4}>
        <Typography variant='h1'>{response.name}</Typography>
        <Typography variant='h3' color={'rickGreen.main'}>
          Season: {response.episode.slice(1, 3)}
          <br />
          Episode: {response.episode.slice(4)}
        </Typography>
        <Typography variant='h3' color={'rickGreen.main'}>
          Aired: {response.air_date}
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent='center'
        sx={{ padding: '10px' }}
      >
        {characters.length > 1 ? (
          characters.map((character, index) => (
            <CharacterCardGridItem
              character={character}
              index={index}
              key={index}
            />
          ))
        ) : (
          <CharacterCardGridItem character={characters} index={1} />
        )}
      </Grid>
    </Box>
  )
}

export default Episode
