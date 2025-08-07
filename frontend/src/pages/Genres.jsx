import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowGenre from '../components/TableRowGenre';
import CreateGenreForm from '../components/CreateGenreForm';
import UpdateGenreForm from '../components/UpdateGenreForm';


function Genres({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [genres, setGenres] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/library/genres');
            console.log(response)
            // Convert the response into JSON format
            const {genres} = await response.json();
    
            // Update the people state with the response data
         
            setGenres(genres);
            
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }

    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Genres</h1>

            <table>
                <thead>
                    <tr>
                        {genres.length > 0 && Object.keys(genres[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {genres.map((genre, index) => (
                        <TableRowGenre key={index} rowObject={genre} backendURL={backendURL} refreshGenres={getData}/>
                    ))}

                </tbody>
            </table>
            
            <CreateGenreForm backendURL={backendURL} refreshGenres={getData} />
            <UpdateGenreForm genres={genres} backendURL={backendURL} refreshGenres={getData} />               
                
        </>
    );

} export default Genres;