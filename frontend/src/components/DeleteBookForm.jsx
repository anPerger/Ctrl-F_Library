import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteBookForm = ({ rowObject, backendURL, refreshBooks }) => {
   
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_book_id: rowObject.book_id,
            delete_book_title: rowObject.title
        };

        try {
            const response = await fetch(backendURL + '/library/delete-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Book deleted successfully.");
                refreshBooks();
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

export default DeleteBookForm;