import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowBookGenre from '../components/TableRowBookGenre';
import CreateBookGenreForm from '../components/CreateBookGenreForm';



function BookGenres({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [bookGenres, setBookGenres] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/library/book-genres');
            console.log(response)
            // Convert the response into JSON format
            const {books, genres, bookGenres} = await response.json();
            
    
            // Update the people state with the response data
            setBooks(books);
            setGenres(genres);
            setBookGenres(bookGenres);
            
            
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
            <h1>Book Genres</h1>

            <table>
                <thead>
                    <tr>
                        {bookGenres.length > 0 && Object.keys(bookGenres[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {bookGenres.map((bookGenre, index) => (
                        <TableRowBookGenre key={index} rowObject={bookGenre} genres={genres} backendURL={backendURL} refreshBookGenres={getData}/>
                    ))}

                </tbody>
            </table>
            
            <CreateBookGenreForm books={books} genres={genres} backendURL={backendURL} refreshBookGenres={getData} />

                
        </>
    );

} export default BookGenres;