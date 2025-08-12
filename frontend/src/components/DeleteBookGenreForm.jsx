import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteBookGenreForm = ({ rowObject, backendURL, refreshBookGenres }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (window.confirm("Are you sure you want to submit this form?")) {
      // User clicked "OK", proceed with form submission logic
      console.log("Form submitted!");
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
                let errorData = await response.json();
                console.error("Error:", errorData.message);
                window.alert(errorData.message);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    } else {
      // User clicked "Cancel", do nothing
      console.log("Form submission cancelled.");
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