import './css/App.css';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import {Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  
  return(
    <AuthProvider>
    <MovieProvider>
      <NavBar/>
      <main className='main-content'>

        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/favorites" element = {<Favorites/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </MovieProvider>
    </AuthProvider>
  )

}


export default App
