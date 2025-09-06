import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

const Home = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadPopularMovies = async () => {

      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to Load Movies...");
      } finally {
        setLoading(false);
      }

    };

    loadPopularMovies();

  }, []);

  const handleSearch=async(e)=> {

    e.preventDefault(); //
    if(!searchQuery.trim()) return
    if(loading) return

    setLoading(true)
    try{
      const serachResults = await searchMovies(searchQuery)
      setMovies(serachResults)
      setError(null)
    }catch(err){
      console.log(err);
      setError("Failed to  search Movies...")
    }finally{
      setLoading(false)
    }

  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form" action="">
        <input
          type="text"
          placeholder="Search for movies"
          className="search-input"
          name=""
          value={searchQuery} //
          onChange={(e) => setSearchQuery(e.target.value)} //
        />
        <input type="submit" className="search-button" name="" id="" />
        {/* <button type="submit" className="search-button">Submit</button> */}
      </form>

      {error && <div className="error-message">{error}</div> }

      {loading ? (
        <div className="loading">Loading...</div>
       ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            //  movie.title.toLowerCase().startsWith(searchQuery) &&
            <MovieCard movie={movie} key={movie.id}></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 
