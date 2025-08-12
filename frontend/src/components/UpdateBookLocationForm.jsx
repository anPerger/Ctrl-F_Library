import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateBookLocationForm = ({ rowObject, locations, backendURL, refreshBookLocations }) => {

    const [showForm, setShowForm] = useState(false);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const [formData, setFormData] = useState({
        update_old_book_location_book_id: rowObject.book_id,
        update_old_book_location_location_id: rowObject.location_id,
        update_new_book_location_location_id: ''
            
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
            const response = await fetch(backendURL + '/library/update-book-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Book/location updated successfully.");
                refreshBookLocations();
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

            <label htmlFor="update_new_book_location_location_id">Location to Update: </label>
            <select
                name="update_new_book_location_location_id"
                id="update_new_book_location_location_id"
                onChange={handleChange}
            >
                <option value="">Select a location</option>
                {locations.map((location) => (
                    <option key={location.location_id} value={location.location_id}>
                        {location.location_id} - {location.location_name} 
                    </option>
                ))}
            </select><br></br>         

            <input type="submit" />
        </form>
            )}
        </td>

        </>
    );
};

export default UpdateBookLocationForm;