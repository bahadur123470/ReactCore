import React from 'react'
import Card from './components/card'
import Nav from './components/Nav'

const App = () => {

  let info = {
    username: 'alphaFTX',
    name: 'Bored Ape NFT',
    id: '#345'
  }

  return (
    <> 
    <Nav />
    <Card username="Special" id="#01" price="20$"/>
    <Card username="Custom" id="#02" price="25$"/>
    </> 
  )
}

export default App
