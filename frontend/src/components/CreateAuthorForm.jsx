import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const CreateAuthorForm = ({ backendURL, refreshAuthors }) => {

    const [formData, setFormData] = useState({
        create_author_fname: '',
        create_author_lname: ''      
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
            const response = await fetch(backendURL + '/library/create-author', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Author created successfully.");
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
        <h2>Create an Author</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_author_fname">First Name: </label>
            <input
                type="text"
                name="create_author_fname"
                id="create_author_fname"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="create_author_lname">Last Name: </label>
            <input
                type="text"
                name="create_author_lname"
                id="create_author_lname"
                onChange={handleChange}
            /><br></br>
              
            <input type="submit" />
        </form>
        </>
    );
};

export default CreateAuthorForm;