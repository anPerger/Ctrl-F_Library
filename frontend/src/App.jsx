import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Books from './pages/Books';
import Authors from './pages/Authors';
import Publishers from './pages/Publishers';
import Genres from './pages/Genres';
import Locations from './pages/Locations'
import BookAuthors from './pages/BookAuthors';
import BookLocations from './pages/BookLocations';
import BookGenres from './pages/BookGenres';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 1794;  // Use the port you assigned to the backend server, this would normally go in a .env file
// const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;
const backendURL = `http://localhost:${backendPort}`;

function App() {
    console.log(backendURL)
    return (
        <>
            <Navigation backendURL={backendURL} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Books" element={<Books backendURL={backendURL} />} />
                <Route path="/Authors" element={<Authors backendURL={backendURL} />} />
                <Route path="/Publishers" element={<Publishers backendURL={backendURL} />} />
                <Route path="/Genres" element={<Genres backendURL={backendURL} />} />
                <Route path="/Locations" element={<Locations backendURL={backendURL} />} />
                <Route path="/BookAuthors" element={<BookAuthors backendURL={backendURL} />} />
                <Route path="/BookLocations" element={<BookLocations backendURL={backendURL} />} />
                <Route path="/BookGenres" element={<BookGenres backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;