import {createContext, useState, useContext, useEffect} from "react"
import { useAuth } from "./AuthContext"
import axios from "axios"
const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const {token} = useAuth();
    const [favorites, setFavorites] = useState([])

    useEffect(() => {

        if (token){
            axios.get("/api/favorites",{
                headers:{Authorization:`bearer ${token}`}
            })
            .then(res => setFavorites(res.data))
            .catch(console.error)
        }

        },[token])
        const addToFavorites = async (movie) => {
            try {
              const res = await axios.post("/api/favorites", movie, {
                headers: { Authorization: `Bearer ${token}` }
              });
              setFavorites(res.data);
            } catch (err) {
              console.error("Add failed", err);
            }
          };
        
          const removeFromFavorites = async (movieId) => {
            try {
              const res = await axios.delete(`/api/favorites/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              setFavorites(res.data);
            } catch (err) {
              console.error("Remove failed", err);
            }
          };
        
          const isFavorites = (id) => favorites.some(m => m.id === id);
        
    //    const storedFavs = localStorage.getItem("favorites")

    //    if (storedFavs) setFavorites(JSON.parse(storedFavs))
    //}, [])

    //useEffect(() => {
    //    localStorage.setItem('favorites', JSON.stringify(favorites))
    //}, [favorites])
    /*
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }*/

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorites
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}