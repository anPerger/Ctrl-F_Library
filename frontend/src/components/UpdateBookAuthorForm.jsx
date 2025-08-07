import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateBookAuthorForm = ({ rowObject, authors, backendURL, refreshBookAuthors }) => {

    const [showForm, setShowForm] = useState(false);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const [formData, setFormData] = useState({
        update_old_book_author_book_id: rowObject.book_id,
        update_old_book_author_author_id: rowObject.author_id,
        update_new_book_author_author_id: ''
            
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
        
        try {
            const response = await fetch(backendURL + '/library/update-book-author', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Book/author updated successfully.");
                refreshBookAuthors();
            } else {
                console.error("Error updating genre.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <td>
            <div>
            <button onClick={toggleFormVisibility}>
                {showForm ? 'Hide Form' : 'Update'}
            </button>

            {showForm && (
                <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="update_new_book_author_author_id">Author to Update: </label>
            <select
                name="update_new_book_author_author_id"
                id="update_new_book_author_author_id"
                onChange={handleChange}
            >
                <option value="">Select an author</option>
                {authors.map((author) => (
                    <option key={author.author_id} value={author.author_id}>
                        {author.author_id} - {author.first_name} {author.last_name} 
                    </option>
                ))}
            </select>            

            <input type="submit" />
        </form>
            )}
            </div>
        </td>

        </>
    );
};

export default UpdateBookAuthorForm;