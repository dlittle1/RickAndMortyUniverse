import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as cheerio from 'cheerio'
import sanitizeHtml from 'sanitize-html'
import axios from 'axios'
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Container,
  Divider,
  Button,
  CardActions,
  Card,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Character = () => {
  let params = useParams()
  const [loading, setLoading] = useState(true)
  const [character, setCharacter] = useState()
  const [wikiInfo, setWikiInfo] = useState()
  const [cleanedWikiInfo, setCleanedWikiInfo] = useState(null)
  const [locationAndOrigin, setLocationAndOrigin] = useState()

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${params.characterId}`)
      .then((res) => setCharacter(res.data))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (character) {
      // get data from rickandmorty wiki
      let name = character.name
      if (name === 'Abadango Cluster Princess') name = 'Abadongian Princess'
      if (name === 'Abradolf Lincler') name = 'Abrodolph_Lincoler'
      const refactoredName = name.replaceAll(' ', '_')
      axios
        .get(
          `https://rickandmorty.fandom.com/api.php?action=parse&page=${refactoredName}&section=1&format=json&origin=*`
        )
        .then((res) =>
          res.data.parse
            ? setWikiInfo(res.data.parse.text['*'])
            : setWikiInfo('<p>Info Missing</>')
        ) //.parse.text['*']
        .catch((err) => console.error(err))

      // get location and origin info
      const locationId = getParams(character.location.url)
      const originId = getParams(character.origin.url)
      axios
        .get(
          `https://rickandmortyapi.com/api/location/${locationId},${originId}`
        )
        .then((res) => setLocationAndOrigin(res.data))
        .catch((err) => console.error(err))
    }
  }, [character])

  // returns the id from the url
  function getParams(url) {
    const locationOfParam = url.lastIndexOf('/')
    return url.slice(locationOfParam + 1)
  }

  // parse wiki data, then clean it
  useEffect(() => {
    if (wikiInfo) {
      const $ = cheerio.load(wikiInfo)
      // finds the first p element
      const extractedData = $.html('p:first-of-type:not(.caption) ')
      // removes all tags except for p element
      const cleanExtractedData = sanitizeHtml(extractedData, {
        allowedTags: ['p'],
      })
      setCleanedWikiInfo(cleanExtractedData)
    }
  }, [wikiInfo])

  useEffect(() => {
    if (cleanedWikiInfo && locationAndOrigin) {
      setLoading(false)
    }
  }, [cleanedWikiInfo, locationAndOrigin])

  if (loading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'neutral.main',
        }}
        textAlign='center'
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ margin: '2rem' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} textAlign='center'>
          <Container
            sx={{
              backgroundColor: 'cardColor.main',
              paddingTop: '2rem',
              paddingBottom: '2rem',
              borderRadius: '.5rem',
            }}
          >
            <Typography
              variant='h4'
              sx={{ color: 'white', marginBottom: '15px' }}
            >
              {character.name}
            </Typography>
            <img
              src={character.image}
              style={{ borderRadius: '50%', width: '165px' }}
            />
            <Container sx={{ textAlign: 'left' }}>
              <Typography variant='h6' sx={{ marginTop: '15px' }}>
                Location: {character.location.name}
              </Typography>
              <Divider />
              <Typography variant='h6'>
                Origin: {character.origin.name}
              </Typography>
              <Divider />
              <Typography variant='h6'>Species: {character.species}</Typography>
              <Divider />
              <Typography variant='h6'>Gender: {character.gender}</Typography>
              <Divider />
              <Typography variant='h6'>Status: {character.status}</Typography>
              <Divider />
              <Typography variant='h6'>
                Is featured in{' '}
                {character.episode.length === 51
                  ? 'all'
                  : character.episode.length}{' '}
                episodes
              </Typography>
            </Container>
          </Container>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {cleanedWikiInfo && (
              <Grid item>
                <Box
                  sx={{ backgroundColor: 'cardColor.main', padding: '2rem' }}
                >
                  <Typography
                    color='white'
                    dangerouslySetInnerHTML={{ __html: cleanedWikiInfo }}
                  ></Typography>
                  <Typography color='rickGreen.main'>
                    {cleanedWikiInfo !== '<p>Info Missing</p>' && (
                      <>
                        <a
                          target={'_blank'}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                          href={`https://rickandmorty.fandom.com/wiki/${character.name.replaceAll(
                            ' ',
                            '_'
                          )}`}
                        >
                          More info found at rickandmorty.fandom.com/wiki/
                          {character.name.replaceAll(' ', '_')}
                        </a>
                      </>
                    )}
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Box
                    sx={{ backgroundColor: 'cardColor.main', padding: '2rem' }}
                  >
                    <Typography variant='h6'>
                      {locationAndOrigin[0].name}
                    </Typography>
                    <Typography sx={{ color: 'white' }}>
                      {locationAndOrigin[0].dimension}
                    </Typography>
                    <Typography sx={{ color: 'white' }}>
                      {locationAndOrigin[0].type}
                    </Typography>
                    <CardActions>
                      <Button
                        size='small'
                        component={Link}
                        to={`/locations/${locationAndOrigin[0].id}`}
                      >
                        view more residents
                      </Button>
                    </CardActions>
                  </Box>
                </Grid>
                {locationAndOrigin.length > 1 && (
                  <Grid item>
                    <Box
                      sx={{
                        backgroundColor: 'cardColor.main',
                        padding: '2rem',
                      }}
                    >
                      <Typography variant='h6'>
                        {locationAndOrigin[1].name}
                      </Typography>
                      <Typography sx={{ color: 'white' }}>
                        {locationAndOrigin[1].dimension}
                      </Typography>
                      <Typography sx={{ color: 'white' }}>
                        {locationAndOrigin[1].type}
                      </Typography>
                      <CardActions>
                        <Button
                          size='small'
                          component={Link}
                          to={`/locations/${locationAndOrigin[1].id}`}
                        >
                          view more residents
                        </Button>
                      </CardActions>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Character
