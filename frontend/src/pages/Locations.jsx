import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRowLocation from '../components/TableRowLocation';
import CreateLocationForm from '../components/CreateLocationForm';
import UpdateLocationForm from '../components/UpdateLocationForm';


function Locations({ backendURL }) {

    // Set up a state variable `people` to store and display the backend response
    
    const [locations, setLocations] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/library/locations');
            console.log(response)
            // Convert the response into JSON format
            const { locations } = await response.json();
    
            // Update the people state with the response data
            setLocations(locations)


            
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
            <h1>Locations</h1>

            <table>
                <thead>
                    <tr>
                        {locations.length > 0 && Object.keys(locations[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {locations.map((location, index) => (
                        <TableRowLocation key={index} rowObject={location} backendURL={backendURL} refreshLocations={getData}/>
                    ))}

                </tbody>
            </table>
            
            <CreateLocationForm backendURL={backendURL} refreshLocations={getData} />
            <UpdateLocationForm locations={locations} backendURL={backendURL} refreshLocations={getData} />               
                
        </>
    );

} export default Locations;