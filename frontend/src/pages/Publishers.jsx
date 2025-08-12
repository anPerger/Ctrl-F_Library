import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowPublisher from '../components/TableRowPublisher';
import CreatePublisherForm from '../components/CreatePublisherForm';
import { Container, Table } from 'react-bootstrap';



function Publishers({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
  
    const [publishers, setPublishers] = useState([]);
  


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/library/publishers');
            console.log(response)
            // Convert the response into JSON format
            const { publishers } = await response.json();
    
            // Update the people state with the response data
            
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
            <h1>Publishers</h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        {publishers.length > 0 && Object.keys(publishers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {publishers.map((publisher, index) => (
                        <TableRowPublisher key={index} rowObject={publisher} backendURL={backendURL} refreshPublishers={getData}/>
                    ))}

                </tbody>
            </Table>
            
            <CreatePublisherForm backendURL={backendURL} refreshPublishers={getData} />
                         
                
        </>
    );

} export default Publishers;