import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateBookGenreForm = ({ rowObject, genres, backendURL, refreshBookGenres }) => {

    const [showForm, setShowForm] = useState(false);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    
    const [formData, setFormData] = useState({
        update_old_book_genre_book_id: rowObject.book_id,
        update_old_book_genre_genre_id: rowObject.genre_id,
        update_new_book_genre_genre_id: ''
            
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
            const response = await fetch(backendURL + '/library/update-book-genre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Book/genre updated successfully.");
                refreshBookGenres();
            } else {
                console.error("Error updating genre.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <td>
            <div>
            <button onClick={toggleFormVisibility}>
                {showForm ? 'Hide Form' : 'Update'}
            </button>

            {showForm && (
                <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="update_new_book_genre_genre_id">Genre to Update: </label>
            <select
                name="update_new_book_genre_genre_id"
                id="update_new_book_genre_genre_id"
                onChange={handleChange}
            >
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                    <option key={genre.genre_id} value={genre.genre_id}>
                        {genre.genre_id} - {genre.genre_name} 
                    </option>
                ))}
            </select>            

            <input type="submit" />
        </form>
            )}
            </div>
        </td>

        </>
    );
};

export default UpdateBookGenreForm;