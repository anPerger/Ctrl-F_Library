import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowBookAuthor from '../components/TableRowBookAuthor';
import CreateBookAuthorForm from '../components/CreateBookAuthorForm';
import { Container, Table } from 'react-bootstrap';



function BookAuthors({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [bookAuthors, setBookAuthors] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/library/book-authors');
            // console.log(response)
            // Convert the response into JSON format
            const {books, authors, bookAuthors} = await response.json();
            
    
            // Update the people state with the response data
            setBooks(books);
            setAuthors(authors);
            setBookAuthors(bookAuthors);
            
            
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
            <h1>Book Authors</h1>

            <Container style={{ maxWidth: "mw-100" }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {bookAuthors.length > 0 && Object.keys(bookAuthors[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {bookAuthors.map((bookAuthor, index) => (
                        <TableRowBookAuthor key={index} rowObject={bookAuthor} authors={authors} backendURL={backendURL} refreshBookAuthors={getData}/>
                    ))}

                </tbody>
            </Table>
            </Container>
            
            <CreateBookAuthorForm books={books} authors={authors} backendURL={backendURL} refreshBookAuthors={getData} />

                
        </>
    );

} export default BookAuthors;