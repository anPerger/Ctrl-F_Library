import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateLocationForm = ({ locations, backendURL, refreshLocations }) => {

    const [formData, setFormData] = useState({
            update_location_id: '',
            update_location_name: '',
            update_location_address: '',
            update_location_city: '',
            update_location_state: '',
            update_location_postal_code: '',
            update_location_phone_number: ''
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault(); // Prevent default form submission
            console.log(formData)
            try {
                const response = await fetch(backendURL + '/library/update-location', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
    
                if (response.ok) {
                    console.log("Location updated successfully.");
                    refreshLocations();
                } else {
                    console.error("Error updating book.");
                }
            } catch (error) {
                console.error('Error during form submission:', error);
            }
        };


    return (
        <>
        <h2>Update a location</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="update_location_id">Location to Update: </label>
            <select
                name="update_location_id"
                id="update_location_id"
                onChange={handleChange}
            >
                <option value="">Select a location</option>
                {locations.map((location) => (
                    <option key={location.location_id} value={location.location_id}>
                        {location.location_id} - {location.location_name} 
                    </option>
                ))}
            </select>

            <label htmlFor="update_location_name">Location Name: </label>
            <input
                type="text"
                name="update_location_name"
                id="update_location_name"
                onChange={handleChange}
            />

            <label htmlFor="update_location_address">Address: </label>
            <input
                type="text"
                name="update_location_address"
                id="update_location_address"
                onChange={handleChange}
            />

            <label htmlFor="update_location_city">City: </label>
            <input
                type="text"
                name="update_location_city"
                id="update_location_city"
                onChange={handleChange}
            />

            <label htmlFor="update_location_state">State: </label>
            <input
                type="text"
                name="update_location_state"
                id="update_location_state"
                onChange={handleChange}
            />

            <label htmlFor="update_location_phone_number">Phone Number: </label>
            <input
                type="text"
                name="update_location_phone_number"
                id="update_location_phone_number"
                onChange={handleChange}
            />     

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateLocationForm;