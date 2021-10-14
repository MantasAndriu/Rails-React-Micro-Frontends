import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DetailsHeader = React.lazy(() => import("Details/Header"));

const DetailsPage = (props) => {
    const [shop, setShop] = useState({})
    const [reviews, setReviews] = useState([])
    const [loaded, setLoaded] = useState(false)

  useEffect(()=> {
    const slug = props.match.params.slug

    axios.get(`http://localhost:3000/api/v1/shops/${slug}`)
    .then( (resp) => {
      setShop(resp.data)
      setReviews(resp.data.included)
      setLoaded(true)
    })
    .catch( data => console.log('Error', data) )
    }, [])

    let total, average = 0

    total = reviews.reduce((total, review) => total + review.attributes.score, 0)
    average = total > 0 ? (parseFloat(total) / parseFloat(reviews.length)) : 0


    return(
        <div>      
        { 
            loaded &&
            <React.Suspense fallback="Loading Details Page">
                <DetailsHeader 
                    attributes={shop && shop.data && shop.data.attributes }
                    reviews={reviews}
                    average={average}
                />
            </React.Suspense>
        }
        </div>
    )
}

export default DetailsPage