import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateAuthorForm = ({ authors, backendURL, refreshAuthors }) => {
    const [formData, setFormData] = useState({
                update_author_id: '',
                update_author_fname: '',
                update_author_lname: ''
            });
        
            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            };
        
            const handleSubmit = async (e) => {
                e.preventDefault(); // Prevent default form submission
                console.log(formData)
                try {
                    const response = await fetch(backendURL + '/library/update-author', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    });
        
                    if (response.ok) {
                        console.log("Author updated successfully.");
                        refreshAuthors();
                    } else {
                        console.error("Error updating author.");
                    }
                } catch (error) {
                    console.error('Error during form submission:', error);
                }
            };

    return (
        <>
        <h2>Update an Author</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="update_author_id">Author to Update: </label>
            <select
                name="update_author_id"
                id="update_author_id"
                onChange={handleChange}
            >
                <option value="">Select an author</option>
                {authors.map((author) => (
                    <option key={author.author_id} value={author.author_id}>
                        {author.author_id} - {author.first_name} {author.last_name} 
                    </option>
                ))}
            </select>

            <label htmlFor="update_author_fname">First Name: </label>
            <input
                type="text"
                name="update_author_fname"
                id="update_author_fname"
                onChange={handleChange}
            />

            <label htmlFor="update_author_lname">Last Name: </label>
            <input
                type="text"
                name="update_author_lname"
                id="update_author_lname"
                onChange={handleChange}
            />
                
            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateAuthorForm;