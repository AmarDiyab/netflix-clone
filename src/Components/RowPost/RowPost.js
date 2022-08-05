import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl, API_KEY } from '../../constants/constants'
import YouTube from 'react-youtube'

function RowPost(props) {
    const [ movies, setMovies ] = useState([])
    const [ urlId, setUrlId ] = useState('')

    useEffect(() => {
      axios.get(props.url).then((response) => {
        setMovies(response.data.results)
      }).catch(err => {
        alert('ERROR OCCURED')
      })
    })
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 0
        }
    }
    const handleMovie = (id) => {
        console.log(id)
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
           if (response.data.results.length!==0) {
            setUrlId(response.data.results[0])
           }else {
            alert("Trailer is not Available")
           }
        })
    }
  return (
    <div className='row'>
        <br />
        <h2>{props.title}</h2>
        <div className='posters'>
            {movies.map((obj) => 
                <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} alt="poster" src={`${ imageUrl + obj.backdrop_path }`} />
            )}
        </div>
        { urlId &&  <YouTube videoId={urlId.key} opts={opts} /> }
    </div>
  )
}

export default RowPost