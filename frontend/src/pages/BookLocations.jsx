import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowBookLocation from '../components/TableRowBookLocation';
import CreateBookLocationForm from '../components/CreateBookLocationForm';
// import UpdateBookAuthorForm from '../components/UpdateBookAuthorForm';


function BookLocations({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [books, setBooks] = useState([]);
    const [locations, setLocations] = useState([]);
    const [bookLocations, setBookLocations] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/library/book-locations');
            console.log(response)
            // Convert the response into JSON format
            const {books, locations, bookLocations} = await response.json();
            
    
            // Update the people state with the response data
            setBooks(books);
            setLocations(locations);
            setBookLocations(bookLocations);
            
            
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
            <h1>Book Locations</h1>

            <table>
                <thead>
                    <tr>
                        {bookLocations.length > 0 && Object.keys(bookLocations[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {bookLocations.map((bookLocation, index) => (
                        <TableRowBookLocation key={index} rowObject={bookLocation} locations={locations} backendURL={backendURL} refreshBookLocations={getData}/>
                    ))}

                </tbody>
            </table>
            <CreateBookLocationForm books={books} locations={locations} backendURL={backendURL} refreshBookLocations={getData} />                
        </>
    );

} export default BookLocations;