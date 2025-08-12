import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteBookLocationForm = ({ rowObject, backendURL, refreshBookLocations }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (window.confirm("Are you sure you want to submit this form?")) {
      // User clicked "OK", proceed with form submission logic
      console.log("Form submitted!");
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

export default DeleteBookLocationForm;