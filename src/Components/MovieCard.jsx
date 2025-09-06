import React from 'react'
import "../css/MovieCard.css"
import { useMoviecontext } from '../Contexts/MovieContext'

const MovieCard = ({movie}) => {

    const { isFavorite, addToFavorites, removeFromFavorites} = useMoviecontext()
    const favorite = isFavorite(movie.id)

    function handleClick(e){
        e.preventDefault()
        if(favorite)
            removeFromFavorites(movie.id)
        else
            addToFavorites(movie)
    }

  return (
    <div className='movie-card'>
        <div className='movie-poster'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='image'></img>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={handleClick}>
                    ♥
                    {/* <i className="fa-regular fa-heart"></i> */} 
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
  )
}

export default MovieCard