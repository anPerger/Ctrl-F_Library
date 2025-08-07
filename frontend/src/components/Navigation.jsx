import React from 'react';
import { Link } from 'react-router-dom';


const Navigation = ({ backendURL }) => {
  const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        console.log(backendURL + '/library/reset')
        try {
            const response = await fetch(backendURL + '/library/reset');
          
          if (response.ok) {
              console.log("DB reset successfully.");
              window.location.reload(false);
            } else {
              console.error("Error resetting DB.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };
  return (
    <nav>
        <form onSubmit={handleSubmit}>
          <Link to="/">Home</Link>
          <Link to="/Books">Books</Link>
          <Link to="/Authors">Authors</Link>
          <Link to="/Locations">Locations</Link>
          <Link to="/Publishers">Publishers</Link>
          <Link to="/Genres">Genres</Link> 
          <Link to="/BookAuthors">Book Authors</Link> 
          <Link to="/BookLocations">Book Locations</Link>
          <Link to="/BookGenres">Book Genres</Link>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type='submit'>
              Reset DB
            </button>
          </div>
        </form>
    </nav>
  );
}

export default Navigation;
