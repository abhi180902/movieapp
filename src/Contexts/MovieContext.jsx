import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'


const MovieContext = createContext()

export const useMoviecontext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {

  const [favorites,setFavorites] = useState([])

  useEffect( () => {

    const storedFavs = localStorage.getItem('favorites')
    if(storedFavs)
      setFavorites(JSON.parse(storedFavs))  // store all our fav movies in a array and that array is converted first into 'json String' in localstorage (cuz localsstorage store only Strings) and then convert 'json String' which is actually an array back into a real Javascript Object which JSON.parse() does  

  },[])

  useEffect(() => {
    localStorage.setItem('favorites',JSON.stringify(favorites))
  },[favorites])

  const addToFavorites = (movie) => {
    setFavorites(prev => [...prev, movie])
  }

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId))
  }

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId)
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }

  return <MovieContext.Provider value={value}>
    {children}
  </MovieContext.Provider>
}

export default MovieContext 