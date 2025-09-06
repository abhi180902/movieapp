import "./css/App.css";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./Components/Navbar";
import { MovieProvider } from "./Contexts/MovieContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset"

// let router = createBrowserRouter([
//   {path:"/", element:<Home />},
//   {path:"/favorites", element:<Favorites />}
// ])

function App() {
  // <RouterProvider router={router}></RouterProvider>

  return (
    <div>
      <MovieProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup/>} />
            <Route path="/reset" element={<Reset/>} />
          </Routes>
        </main>
      </MovieProvider>
    </div>
  );
}

export default App;

// function Text({display}){
//   return (
//     <div>
//       <p>{display}</p>
//     </div>
//   );
// }
