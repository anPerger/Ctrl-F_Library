import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowBook from '../components/TableRowBook';
import CreateBookForm from '../components/CreateBookForm';
import UpdateBookForm from '../components/UpdateBookForm';


function Books({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [books, setBooks] = useState([]);
    const [publishes, setPublishers] = useState([]);

    console.log(backendURL)
    
    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/library/books');
            console.log(response)
            // Convert the response into JSON format
            const {books, publishers} = await response.json();
            
    
            // Update the people state with the response data
            setBooks(books);
            setPublishers(publishers);
            
            
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
            <h1>Books</h1>

            <table>
                <thead>
                    <tr>
                        {books.length > 0 && Object.keys(books[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {books.map((book, index) => (
                        <TableRowBook key={index} rowObject={book} backendURL={backendURL} refreshBooks={getData}/>
                    ))}

                </tbody>
            </table>
            
            <CreateBookForm publishers={publishes} backendURL={backendURL} refreshBooks={getData} />
            <UpdateBookForm books={books} publishers={publishes} backendURL={backendURL} refreshBooks={getData} />               
                
        </>
    );

} export default Books;