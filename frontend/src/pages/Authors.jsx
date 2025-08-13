import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowAuthor from '../components/TableRowAuthor';
import CreateAuthorForm from '../components/CreateAuthorForm';
import { Container, Table } from 'react-bootstrap';



function Authors({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    
    const [authors, setAuthors] = useState([]);
   


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/library/authors');
            console.log(response)
            // Convert the response into JSON format
            const { authors } = await response.json();
    
            // Update the people state with the response data
            setAuthors(authors);
           


            
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
            <h1>Authors</h1>
            <Container style={{ maxWidth: "mw-100" }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {authors.length > 0 && Object.keys(authors[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {authors.map((author, index) => (
                        <TableRowAuthor key={index} rowObject={author} backendURL={backendURL} refreshAuthors={getData}/>
                    ))}

                </tbody>
            </Table>
            </Container>
            
            <CreateAuthorForm backendURL={backendURL} refreshAuthors={getData} />
                           
                
        </>
    );

} export default Authors;