import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const CreateBookAuthorForm = ({ books, authors, backendURL, refreshBookAuthors }) => {
    const [formData, setFormData] = useState({
        create_book_author_book_id: '',
        create_book_author_author_id: '',
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
            const response = await fetch(backendURL + '/library/create-book-author', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Book/Author association created successfully.");
                refreshBookAuthors();
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
        <h2>Create a Book to Author Association</h2>
        <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="create_book_author_book_id">Book to add author: </label>
                <select
                    name="create_book_author_book_id"
                    id="create_book_author_book_id"
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

            <label htmlFor="create_book_author_author_id">Author of Book: </label>
                <select
                    name="create_book_author_author_id"
                    id="create_book_author_author_id"
                    required="True"
                    onChange={handleChange}
                >
                    <option value="">Select an Author</option>
                    {authors.map((author) => (
                        <option key={author.author_id} value={author.author_id}>
                            {author.author_id} - {author.first_name} {author.last_name} 
                        </option>
                    ))}
            </select><br></br>
               
            
  

         
            <input type="submit" />
        </form>
        </>
    );
};

export default CreateBookAuthorForm;