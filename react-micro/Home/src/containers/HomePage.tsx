import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Shop from '../components/Shop'
import Header from '../components/Header'
// import airlinesQuery from '../../queries/airlinesQuery'
import styled from 'styled-components'

const Home = styled.div`
  text-align:center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
  > div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`

const HomePage = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/shops.json')
    .then( resp => setShops(resp.data.data))
    .catch( data => console.log('error', data))
  }, [])

  const grid = shops.map( (shop, index) => {
    const { name, image_url, slug, average_score } = shop.attributes

    return (
      <Shop 
        key={index}
        name={name}
        image_url={image_url}
        slug={slug}
        average_score={average_score}
      />
    )
  })

  return (
    <Home>
      <Header/>
      <Grid>{grid}</Grid>
    </Home>
  )
}

export default HomePage