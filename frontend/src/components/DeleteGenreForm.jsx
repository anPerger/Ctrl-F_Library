import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteGenreForm = ({ rowObject, backendURL, refreshGenres }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_genre_id: rowObject.genre_id,
            delete_genre_name: rowObject.genre_name

        };

        try {
            const response = await fetch(backendURL + '/library/delete-genre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Genre deleted successfully.");
                refreshGenres();
            } else {
                console.error("Error deleting person.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <td>
            <form onSubmit={handleSubmit}>
                <button type='submit'>
                    Delete
                </button>
            </form>
        </td>

    );
};

export default DeleteGenreForm;