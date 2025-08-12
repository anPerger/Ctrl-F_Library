import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateGenreForm = ({ rowObject, backendURL, refreshGenres }) => {

    const [showForm, setShowForm] = useState(false);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const [formData, setFormData] = useState({
        update_genre_id: rowObject.genre_id,
        update_genre_name: ''
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
            const response = await fetch(backendURL + '/library/update-genre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Genre updated successfully.");
                refreshGenres();
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

            <label htmlFor="update_genre_name">Genre Name: </label>
            <input
                type="text"
                name="update_genre_name"
                id="update_genre_name"
                onChange={handleChange}
            /><br></br>                

            <input type="submit" />
        </form>
        )}
            </td>
        </>
    );
};

export default UpdateGenreForm;