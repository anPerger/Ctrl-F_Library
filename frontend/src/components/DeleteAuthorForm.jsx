import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const DeleteAuthorForm = ({ rowObject, backendURL, refreshAuthors }) => {

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (window.confirm("Are you sure you want to submit this form?")) {
      // User clicked "OK", proceed with form submission logic
      console.log("Form submitted!");
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
                <button type='submit'>
                    Delete
                </button>
            </form>
        </td>

    );
};

export default DeleteAuthorForm;