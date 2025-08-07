import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteBookLocationForm = ({ rowObject, backendURL, refreshBookLocations }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_book_location_book_id: rowObject.book_id,
            delete_book_location_location_id: rowObject.location_id
        };

        try {
            const response = await fetch(backendURL + '/library/delete-book-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log("Book/Location association deleted successfully.");
                refreshBookLocations();
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

export default DeleteBookLocationForm;