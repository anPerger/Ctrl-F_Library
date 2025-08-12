import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowBook from '../components/TableRowBook';
import CreateBookForm from '../components/CreateBookForm';
import { Container, Table } from 'react-bootstrap';




function Books({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [books, setBooks] = useState([]);
    const [publishers, setPublishers] = useState([]);
    
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
            <Container style={{ maxWidth: "mw-100" }}>
            <Table striped bordered hover>
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
                        <TableRowBook key={index} rowObject={book} publishers={publishers} backendURL={backendURL} refreshBooks={getData}/>
                    ))}

                </tbody>
            </Table>
            </Container>
            
            <CreateBookForm publishers={publishers} backendURL={backendURL} refreshBooks={getData} />
                           
                
        </>
    );

} export default Books;