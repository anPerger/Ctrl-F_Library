import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateGenreForm = ({ genres, backendURL, refreshGenres }) => {

    const [formData, setFormData] = useState({
                    update_genre_id: ''
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
                        const response = await fetch(backendURL + '/library/update-genre', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData),
                        });
            
                        if (response.ok) {
                            console.log("Genre updated successfully.");
                            refreshGenres();
                        } else {
                            console.error("Error updating genre.");
                        }
                    } catch (error) {
                        console.error('Error during form submission:', error);
                    }
                };

    return (
        <>
        <h2>Update a grenre</h2>

        <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="update_genre_id">Genre to Update: </label>
            <select
                name="update_genre_id"
                id="update_genre_id"
                onChange={handleChange}
            >
                <option value="">Select a Genre</option>
                {genres.map((genre) => (
                    <option key={genre.genre_id} value={genre.genre_id}>
                        {genre.genre_id} - {genre.name} 
                    </option>
                ))}
            </select>


            <label htmlFor="update_genre_name">Genre Name: </label>
            <input
                type="text"
                name="update_genre_name"
                id="update_genre_name"
                onChange={handleChange}
            />                  

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateGenreForm;