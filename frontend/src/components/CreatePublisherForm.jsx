import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const CreatePublisherForm = ({ backendURL, refreshPublishers }) => {

    const [formData, setFormData] = useState({
        create_publisher_name: ''      
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
            const response = await fetch(backendURL + '/library/create-publisher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Publisher created successfully.");
                refreshPublishers();
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
        <h2>Create a publisher</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_publisher_name">Publisher Name: </label>
            <input
                type="text"
                name="create_publisher_name"
                id="create_publisher_name"
                onChange={handleChange}
            /><br></br>              

            <input type="submit" />
        </form>
        </>
    );
};

export default CreatePublisherForm;