import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const CreateBookForm = ({ publishers, backendURL, refreshBooks }) => {
    const [formData, setFormData] = useState({
        create_book_title: '',
        create_book_publisher: '',
        create_book_language: '',
        create_book_isbn: '',
        create_book_pub_date: ''
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
            const response = await fetch(backendURL + '/library/create-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Book created successfully.");
                refreshBooks();
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
        <h2>Create a Book</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_book_title">Title: </label>
            <input
                type="text"
                name="create_book_title"
                id="create_book_title"
                required="True"
                onChange={handleChange}
            /><br></br>
               
            <label htmlFor="create_book_publisher">Publisher: </label>
            <select
                name="create_book_publisher"
                id="create_book_publisher"
                onChange={handleChange}
            >
                <option value="">Select a Publisher</option>
                <option value="NULL">&lt; None &gt;</option>
                {publishers.map((publisher, index) => (
                    <option value={publisher.publisher_id} key={index}>{publisher.publisher_name}</option>
                ))}
                
            </select><br></br>
  
            <label htmlFor="create_book_language">Language: </label>
            <input
                type="text"
                name="create_book_language"
                id="create_book_language"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="create_book_isbn">ISBN: </label>
            <input
                type="text"
                name="create_book_isbn"
                id="create_book_isbn"
                onChange={handleChange}
            /><br></br>

              
            <label htmlFor="create_book_pub_date">Publication date: </label>
            <input
                type="date"
                id="create_book_pub_date"
                name="create_book_pub_date"
                onChange={handleChange}
            /><br></br>

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateBookForm;