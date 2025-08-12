import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateAuthorForm = ({ rowObject, backendURL, refreshAuthors }) => {
    
    const [showForm, setShowForm] = useState(false);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };
    
    const [formData, setFormData] = useState({
                update_author_id: rowObject.author_id,
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
                        let errorData = await response.json();
                        console.error("Error:", errorData.message);
                        window.alert(errorData.message);
                    }
                } catch (error) {
                    console.error('Error during form submission:', error);
                }
            };

    return (
        <>
        

        <td>
            <button onClick={toggleFormVisibility}>
                {showForm ? 'Hide Form' : 'Update'}
            </button>

        {showForm && (
        <form className='cuForm' onSubmit={handleSubmit}>
        
            <label htmlFor="update_author_fname">First Name: </label>
            <input
                type="text"
                name="update_author_fname"
                id="update_author_fname"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="update_author_lname">Last Name: </label>
            <input
                type="text"
                name="update_author_lname"
                id="update_author_lname"
                onChange={handleChange}
            /><br></br>
                
            <input type="submit" />
        </form>
        )}
        </td>
        </>
    );
};

export default UpdateAuthorForm;