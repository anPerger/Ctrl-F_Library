import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteAuthorForm = ({ rowObject, backendURL, refreshAuthors }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_author_id: rowObject.author_id,
            delete_author_fname: rowObject.first_name,
            delete_author_lname: rowObject.last_name

        };

        try {
            const response = await fetch(backendURL + '/library/delete-author', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Author deleted successfully.");
                refreshAuthors();
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

export default DeleteAuthorForm;