import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteBookAuthorForm = ({ rowObject, backendURL, refreshBookAuthors }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

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

export default DeleteBookAuthorForm;