import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteBookGenreForm = ({ rowObject, backendURL, refreshBookGenres }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_book_genre_book_id: rowObject.book_id,
            delete_book_genre_genre_id: rowObject.genre_id
        };

        try {
            const response = await fetch(backendURL + '/library/delete-book-genre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log("Book/Location association deleted successfully.");
                refreshBookGenres();
            } else {
                console.error("Error deleting association.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <td>
            <form onSubmit={handleSubmit}>
                <button>
                    Delete
                </button>
            </form>
        </td>

    );
};

export default DeleteBookGenreForm;