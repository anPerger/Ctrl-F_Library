import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const CreateBookLocationForm = ({ books, locations, backendURL, refreshBookLocations }) => {
    const [formData, setFormData] = useState({
        create_book_location_book_id: '',
        create_book_location_location_id: ''
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
            const response = await fetch(backendURL + '/library/create-book-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Book/location association created successfully.");
                refreshBookLocations();
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
        <h2>Create a Book in Location Association</h2>
        <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="create_book_location_book_id">Book to add location: </label>
                <select
                    name="create_book_location_book_id"
                    id="create_book_location_book_id"
                    required="True"
                    onChange={handleChange}
                >
                    <option value="">Select a Book</option>
                    {books.map((book) => (
                        <option key={book.book_id} value={book.book_id}>
                            {book.book_id} - {book.title} 
                        </option>
                    ))}
            </select><br></br>

            <label htmlFor="create_book_location_location_id">Book in location: </label>
                <select
                    name="create_book_location_location_id"
                    id="create_book_location_location_id"
                    required="True"
                    onChange={handleChange}
                >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                        <option key={location.location_id} value={location.location_id}>
                            {location.location_id} - {location.location_name}
                        </option>
                    ))}
            </select><br></br>
               
    
         
            <input type="submit" />
        </form>
        </>
    );
};

export default CreateBookLocationForm;