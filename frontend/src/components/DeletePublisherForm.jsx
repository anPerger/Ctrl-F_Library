import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeletePublisherForm = ({ rowObject, backendURL, refreshPublishers }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_publisher_id: rowObject.publisher_id,
            delete_publisher_name: rowObject.publisher_name

        };

        try {
            const response = await fetch(backendURL + '/library/delete-publisher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Publisher deleted successfully.");
                refreshPublishers();
            } else {
                console.error("Error deleting publisher.");
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

export default DeletePublisherForm;