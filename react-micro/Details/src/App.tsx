import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Review from './components/Review'
import Header from './components/Header'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`

const Main = styled.div`
  padding-left: 60px;
`

const App = () => {
  const [shop, setShop] = useState({})
  const [reviews, setReviews] = useState([])
  const [review, setReview] = useState({ title: '', score: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(()=> {
    const slug = 'maxima'

    axios.get(`http://localhost:3000/api/v1/shops/${slug}`)
    .then( (resp) => {
      setShop(resp.data)
      setReviews(resp.data.included)
      setLoaded(true)
    })
    .catch( data => console.log('Error', data) )
  }, [])

  // Destroy a review
  const handleDestroy = (id, e) => {
    e.preventDefault()

    axios.delete(`http://localhost:3000/api/v1/reviews/${id}`)
    .then( (data) => {
      const included = [...reviews]
      const index = included.findIndex( (data) => data.id == id )
      included.splice(index, 1)

      setReviews(included)
    })
    .catch( data => console.log('Error', data) )
  }

  let total, average = 0
  let userReviews

  if (reviews && reviews.length > 0) {
    total = reviews.reduce((total, review) => total + review.attributes.score, 0)
    average = total > 0 ? (parseFloat(total) / parseFloat(reviews.length)) : 0
    
    userReviews = reviews.map( (review, index) => {
      return (
        <Review 
          key={index}
          id={review.id}
          attributes={review.attributes}
          handleDestroy={handleDestroy}
        />
      )
    })
  }

  return(
    <Wrapper>
      { 
        loaded &&
        <Fragment>
            <Main>
              <Header 
                attributes={shop.data.attributes}
                reviews={reviews}
                average={average}
              />
              {userReviews}
            </Main>
        </Fragment>
      }
    </Wrapper>
  )
}

export default App;