import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdatePublisherForm = ({ publishers, backendURL, refreshPublishers }) => {

    const [formData, setFormData] = useState({
                    update_publisher_id: '',
                    update_publisher_name: ''
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
                        const response = await fetch(backendURL + '/library/update-publisher', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData),
                        });
            
                        if (response.ok) {
                            console.log("Publisher updated successfully.");
                            refreshPublishers();
                        } else {
                            console.error("Error updating publisher.");
                        }
                    } catch (error) {
                        console.error('Error during form submission:', error);
                    }
                };


    return (
        <>
        <h2>Update a publisher</h2>

        <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="update_publisher_id">Publisher to Update: </label>
            <select
                name="update_publisher_id"
                id="update_publisher_id"
                onChange={handleChange}
            >
                <option value="">Select a publisher</option>
                {publishers.map((publisher) => (
                    <option key={publisher.publisher_id} value={publisher.publisher_id}>
                        {publisher.publisher_id} - {publisher.publisher_name} 
                    </option>
                ))}
            </select>
            <label htmlFor="update_publisher_name">Publisher Name: </label>
            <input
                type="text"
                name="update_publisher_name"
                id="update_publisher_name"
                onChange={handleChange}
            />                  

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdatePublisherForm;