import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateLocationForm = ({ rowObject, backendURL, refreshLocations }) => {
    const [showForm, setShowForm] = useState(false);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const [formData, setFormData] = useState({
            update_location_id: rowObject.location_id,
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
        <td>
            <button onClick={toggleFormVisibility}>
                {showForm ? 'Hide Form' : 'Update'}
            </button><br></br>

        {showForm && (

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="update_location_name">Name: </label>
            <input
                type="text"
                name="update_location_name"
                id="update_location_name"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="update_location_address">Address: </label>
            <input
                type="text"
                name="update_location_address"
                id="update_location_address"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="update_location_city">City: </label>
            <input
                type="text"
                name="update_location_city"
                id="update_location_city"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="update_location_state">State: </label>
            <input
                type="text"
                name="update_location_state"
                id="update_location_state"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="update_location_phone_number">Phone #: </label>
            <input
                type="text"
                name="update_location_phone_number"
                id="update_location_phone_number"
                onChange={handleChange}
            /><br></br>   

            <input type="submit" />
        </form>
        )}
            </td>
        </>
    );
};

export default UpdateLocationForm;