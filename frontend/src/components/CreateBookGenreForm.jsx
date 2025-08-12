import { useState, useEffect } from 'react';  // Importing useState for managing state in the component

const CreateBookGenreForm = ({ books, genres, backendURL, refreshBookGenres }) => {
    const [formData, setFormData] = useState({
        create_book_genre_book_id: '',
        create_book_genre_genre_id: ''

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
            const response = await fetch(backendURL + '/library/create-book-genre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            
                
            if (response.ok) {
                console.log("Book/genre association created successfully.");
                refreshBookGenres();
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
        <h2>Create a Book of genre Association</h2>
        <form className='cuForm' onSubmit={handleSubmit}>

            <label htmlFor="create_book_genre_book_id">Book to add genre: </label>
                <select
                    name="create_book_genre_book_id"
                    id="create_book_genre_book_id"
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

            <label htmlFor="create_book_genre_genre_id">Book has genre: </label>
                <select
                    name="create_book_genre_genre_id"
                    id="create_book_genre_genre_id"
                    required="True"
                    onChange={handleChange}
                >
                    <option value="">Select a genre</option>
                    {genres.map((genre) => (
                        <option key={genre.genre_id} value={genre.genre_id}>
                            {genre.genre_id} - {genre.genre_name}
                        </option>
                    ))}
            </select><br></br>
               
         
            <input type="submit" />
        </form>
        </>
    );
};

export default CreateBookGenreForm;