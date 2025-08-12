import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateBookForm = ({ rowObject, publishers, backendURL, refreshBooks }) => {

     const [showForm, setShowForm] = useState(false);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const [formData, setFormData] = useState({
            update_book_id: rowObject.book_id,
            update_book_publisher: '',
            update_book_language: '',
            update_book_isbn: '',
            update_book_pub_date: ''
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
                const response = await fetch(backendURL + '/library/update-book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
    
                if (response.ok) {
                    console.log("Book updated successfully.");
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
        <td>
        <button onClick={toggleFormVisibility}>
            {showForm ? 'Hide Form' : 'Update'}
        </button><br></br>

        {showForm && (
        <form className='cuForm' onSubmit={handleSubmit}>
                      
            <label htmlFor="update_book_publisher">Publisher: </label>
            <select
                name="update_book_publisher"
                id="update_book_publisher"
                onChange={handleChange}
            >
                <option value="">Select a Publisher</option>
                <option value="NULL">&lt; None &gt;</option>
                {publishers.map((publisher, index) => (
                    <option value={publisher.publisher_id} key={index}>{publisher.publisher_name}</option>
                ))}
            </select><br></br>
           
            <label htmlFor="update_book_language">Language: </label>
            <input
                type="text"
                name="update_book_language"
                id="update_book_language"
                placeholder="English"
                onChange={handleChange}
            /><br></br>

            <label htmlFor="update_book_isbn">ISBN: </label>
            <input
                type="text"
                name="update_book_isbn"
                id="update_book_isbn"
                onChange={handleChange}
            /><br></br>

              
            <label htmlFor="update_book_pub_date">Publication date:</label>
            <input
                type="date"
                id="update_book_pub_date"
                name="update_book_pub_date"
                onChange={handleChange}
            /><br></br>

            <input type="submit" />
        </form>
        )}
        </td>
        </>
    );
};

export default UpdateBookForm;