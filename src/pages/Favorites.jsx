import React from 'react'
import "../css/Favorites.css"
import MovieCard from '../Components/MovieCard'
import { useMoviecontext } from '../Contexts/MovieContext'

const Favorites = () => {

  const {favorites} = useMoviecontext();

  if(favorites){
    return (
      <div className='favorites'>
        <h2>Your favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            //  movie.title.toLowerCase().startsWith(searchQuery) &&
            <MovieCard movie={movie} key={movie.id}></MovieCard>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='favorites-empty'>
        <h2>No favorite movies yet</h2>
        <p>Start adding movies to your favorites and they will appear here</p>
    </div>
  )
}

export default Favorites 