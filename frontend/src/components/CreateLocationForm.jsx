import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const CreateLocationForm = ({ backendURL, refreshLocations }) => {

    const [formData, setFormData] = useState({
        create_location_name: '',
        create_location_address: '',
        create_location_city: '',
        create_location_state: '',
        create_location_postal_code: '',
        create_location_phone_number: ''
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
        
        try {
            const response = await fetch(backendURL + '/library/create-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Location created successfully.");
                refreshLocations();
            } else {
                let errorData = await response.json();
                console.error("Error:", errorData.message);
                window.alert(errorData.message);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Create an location</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            
            <label htmlFor="create_location_name">Location Name: </label>
            <input
                type="text"
                name="create_location_name"
                id="create_location_name"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="create_location_address">Address: </label>
            <input
                type="text"
                name="create_location_address"
                id="create_location_address"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="create_location_city">City: </label>
            <input
                type="text"
                name="create_location_city"
                id="create_location_city"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="create_location_state">State: </label>
            <input
                type="text"
                name="create_location_state"
                id="create_location_state"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="create_location_postal_code">Postal Code: </label>
            <input
                type="text"
                name="create_location_postal_code"
                id="create_location_postal_code"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="create_location_phone">Phone Number: </label>
            <input
                type="text"
                name="create_location_phone_number"
                id="create_location_phone_number"
                onChange={handleChange}
            /><br></br>   

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateLocationForm;