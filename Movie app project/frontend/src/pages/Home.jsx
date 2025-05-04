import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies} from "../service/api";
import "../css/Home.css"

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    //const indexOfLast = currentPage * itemsPerPage;
    //const indexOfFirst = indexOfLast - itemsPerPage;
    //const currentMovies = movies.slice(indexOfFirst, indexOfLast);



/*
    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err){
                console.log(err)
                setError("Fail to load movies...")
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies();
    },[])
    */
    useEffect(() => {
        const loadMovies = async () => {
          setLoading(true);
          try {
            const { results, totalPages } = await getPopularMovies(currentPage);
            setMovies(results);
            setTotalPages(totalPages);
          } catch (err) {
            console.error(err);
            setError("Failed to load movies");
          } finally {
            setLoading(false);
          }
        };
        loadMovies();
      }, [currentPage]);



    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try{

            const searchResult = await searchMovies(searchQuery)
            setMovies(searchResult)
            setError(null)

        }catch (err){
            console.log(err)
            setError("Failed to search movies...")

        }finally{
            setLoading(false)
        }



        setSearchQuery("Search for movies...")

    };
    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
                type="text" 
                placeholder="Search for movies..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                >
            
            </input>
            <button type="submit" className="search-button">
                Search
            </button>
        </form>

        {error && <div className="error-message">{error}</div>}
        {loading ? (<div className="loading">
            loading...
        </div> 
        ) : (<>
        <div className="movie-grid">
            {movies.map(
                (movie) => (
                <MovieCard movie={movie} key={movie.id}/>
                ))}

        </div>
        <div className="pagination">
            <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>
                Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>

        </>
        )}
    </div>
}

export default Home