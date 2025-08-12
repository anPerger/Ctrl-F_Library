import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteGenreForm = ({ rowObject, backendURL, refreshGenres }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (window.confirm("Are you sure you want to delete this item?")) {
        // User clicked "OK", proceed with form submission logic
        console.log("Item deleted");
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
                let errorData = await response.json();
                console.error("Error:", errorData.message);
                window.alert(errorData.message);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
        } else {
        // User clicked "Cancel", do nothing
        console.log("Submission cancelled.");
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