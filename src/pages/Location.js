import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import useAxios from '../hooks/useAxios'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Character from './Character'
import CharacterCardGridItem from '../components/CharacterCardGridItem'

const Location = () => {
  let params = useParams()

  const [response, setResponse] = useState()
  const [residents, setResidents] = useState([])
  const [residentIds, setResidentIds] = useState([])
  const [dataReady, setDataReady] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${params.locationId}`)
      .then((res) => setResponse(res.data))
      .then(() => {})
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (response) {
      response.residents.forEach((resident) => {
        const slash = resident.lastIndexOf('/')
        setResidentIds((prevstate) => [...prevstate, resident.slice(slash + 1)])
      })
    }
  }, [response])

  useEffect(() => {
    if (response) {
      const url = 'https://rickandmortyapi.com/api/character/' + residentIds

      axios
        .get(url)
        .then((res) => setResidents(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    }
  }, [residentIds])

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
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent='center'
        sx={{ padding: '10px' }}
      >
        {residents.length > 1 ? (
          residents.map((character, index) => (
            <CharacterCardGridItem
              character={character}
              index={index}
              key={index}
            />
          ))
        ) : (
          <CharacterCardGridItem character={residents} index={1} />
        )}
      </Grid>
    </Box>
  )
}

export default Location
