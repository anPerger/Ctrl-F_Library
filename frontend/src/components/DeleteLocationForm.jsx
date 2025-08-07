import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteLocationForm = ({ rowObject, backendURL, refreshLocations }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_location_id: rowObject.location_id,
            delete_location_name: rowObject.location_name
        };

        try {
            const response = await fetch(backendURL + '/library/delete-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Location deleted successfully.");
                refreshLocations();
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

export default DeleteLocationForm;