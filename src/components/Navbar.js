import React, { useState, useEffect } from 'react'
import { AppBar, Box, Toolbar, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [value, setValue] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const path = window.location.pathname
    if (path === '/') {
      if (value !== 0) setValue(0)
    } else if (path === '/characters') {
      if (value !== 1) setValue(1)
    } else if (path.includes('/characters/')) {
      if (value !== 1) setValue(1)
    } else if (path === '/locations') {
      if (value !== 2) setValue(2)
    } else if (path.includes('/locations/')) {
      if (value !== 2) setValue(2)
    } else if (path === '/episodes') {
      if (value !== 3) setValue(3)
    }
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='secondary'
            indicatorColor='secondary'
            aria-label='link tabs'
            sx={{ marginLeft: 'auto' }}
          >
            <Tab value={0} label='Home' component={Link} to='/' />
            <Tab
              value={1}
              label='Characters'
              component={Link}
              to='/characters'
            />
            <Tab value={2} label='Locations' component={Link} to='/locations' />
            <Tab value={3} label='Episodes' component={Link} to='/episodes' />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
