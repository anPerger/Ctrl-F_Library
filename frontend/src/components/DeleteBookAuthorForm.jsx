import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteBookAuthorForm = ({ rowObject, backendURL, refreshBookAuthors }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (window.confirm("Are you sure you want to delete this item?")) {
        // User clicked "OK", proceed with form submission logic
        console.log("Item deleted");
        const formData = {
            delete_book_author_book_id: rowObject.book_id,
            delete_book_author_author_id: rowObject.author_id
        };

        try {
            const response = await fetch(backendURL + '/library/delete-book-author', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log("Book/Author association deleted successfully.");
                refreshBookAuthors();
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
                <button>
                    Delete
                </button>
            </form>
        </td>

    );
};

export default DeleteBookAuthorForm;