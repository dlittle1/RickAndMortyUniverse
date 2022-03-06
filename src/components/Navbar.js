import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Tabs,
  Tab,
  SwipeableDrawer,
  useTheme,
  useMediaQuery,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faAlien,
  faPlanetMoon,
  faFilm,
  faBars,
} from '@fortawesome/pro-duotone-svg-icons'

const Navbar = () => {
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const [openDrawer, setOpenDrawer] = useState(false)
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const path = window.location.href
    console.log(path)
    if (path.includes('/characters')) {
      if (value !== 1) setValue(1)
    } else if (path.includes('/locations')) {
      if (value !== 2) setValue(2)
    } else if (path.includes('/episodes')) {
      if (value !== 3) setValue(3)
    } else {
      if (value !== 0) setValue(0)
    }
  }, [])

  const rickGreen = '#78F37D'
  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        sx={{ zIndex: 0 }}
      >
        <List disablePadding>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false)
              setValue(0)
            }}
            divider
            component={Link}
            to='/'
            selected={value === 0}
          >
            <ListItemText
              onClick={() => setOpenDrawer(false)}
              sx={value === 0 ? { color: rickGreen } : { color: 'white' }}
            >
              Home
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false)
              setValue(1)
            }}
            divider
            component={Link}
            to='/characters'
            selected={value === 1}
          >
            <ListItemText
              sx={value === 1 ? { color: rickGreen } : { color: 'white' }}
            >
              Characters
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false)
              setValue(2)
            }}
            divider
            component={Link}
            to='/locations'
            selected={value === 2}
          >
            <ListItemText
              sx={value === 2 ? { color: rickGreen } : { color: 'white' }}
            >
              Locations
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(false)
              setValue(3)
            }}
            divider
            component={Link}
            to='/episodes'
            selected={value === 3}
          >
            <ListItemText
              sx={value === 3 ? { color: rickGreen } : { color: 'white' }}
            >
              Episodes
            </ListItemText>
          </ListItemButton>
        </List>
      </SwipeableDrawer>

      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        color={'secondary'}
      >
        <FontAwesomeIcon icon={faBars} />
      </IconButton>
    </>
  )

  const tabs = (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor='secondary'
      indicatorColor='secondary'
      aria-label='link tabs'
      sx={{ marginLeft: 'auto' }}
    >
      <Tab
        value={0}
        icon={<FontAwesomeIcon icon={faHouse} />}
        iconPosition='start'
        label='Home'
        component={Link}
        to='/'
      />
      <Tab
        value={1}
        icon={<FontAwesomeIcon icon={faAlien} />}
        iconPosition='start'
        label='Characters'
        component={Link}
        to='/characters'
      />
      <Tab
        value={2}
        icon={<FontAwesomeIcon icon={faPlanetMoon} />}
        iconPosition='start'
        label='Locations'
        component={Link}
        to='/locations'
      />
      <Tab
        value={3}
        icon={<FontAwesomeIcon icon={faFilm} />}
        iconPosition='start'
        label='Episodes'
        component={Link}
        to='/episodes'
      />
    </Tabs>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>{matches ? drawer : tabs}</Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
