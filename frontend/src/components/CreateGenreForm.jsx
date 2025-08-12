import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const CreateGenreForm = ({ backendURL, refreshGenres }) => {
    
    const [formData, setFormData] = useState({
        create_genre_name: ''      
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
            const response = await fetch(backendURL + '/library/create-genre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Genre created successfully.");
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
        <h2>Create a grenre</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_genre_name">Genre Name: </label>
            <input
                type="text"
                name="create_genre_name"
                id="create_genre_name"
                onChange={handleChange}
            /><br></br>            

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateGenreForm;