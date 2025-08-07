import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const UpdateBookForm = ({ books, publishers, backendURL, refreshBooks }) => {
    const [formData, setFormData] = useState({
            update_book_id: '',
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
                    console.error("Error updating book.");
                }
            } catch (error) {
                console.error('Error during form submission:', error);
            }
        };

    return (
        <>
        <h2>Update a Book</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="update_book_id">Book to Update: </label>
            <select
                name="update_book_id"
                id="update_book_id"
                onChange={handleChange}
            >
                <option value="">Select a Book</option>
                {books.map((book) => (
                    <option key={book.book_id} value={book.book_id}>
                        {book.book_id} - {book.title} 
                    </option>
                ))}
            </select>
            

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
            </select>
           
            <label htmlFor="update_book_language">Language: </label>
            <input
                type="text"
                name="update_book_language"
                id="update_book_language"
                placeholder="English"
                onChange={handleChange}
            />

            <label htmlFor="update_book_isbn">ISBN: </label>
            <input
                type="text"
                name="update_book_isbn"
                id="update_book_isbn"
                onChange={handleChange}
            />

              
            <label htmlFor="update_book_pub_date">Publication date:</label>
            <input
                type="date"
                id="update_book_pub_date"
                name="update_book_pub_date"
                onChange={handleChange}
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateBookForm;