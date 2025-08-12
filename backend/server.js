
// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 1795;


// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES

app.get('/library/reset', async (req, res) => {

    try {

        const query = 'CALL sp_reset_db();';

        await db.query(query, []);

        
        res.status(200).json({ message: "DB reset" });  // Send the results to the frontend


    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }

})

app.get('/library/books', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = 'SELECT * FROM books';
        const query2 = 'SELECT * FROM publishers;';

        const [books] = await db.query(query1);
        const [publishers] = await db.query(query2);
   
        books.map((book, index) => {

            try { 
                book["publication_date"] = book["publication_date"].toLocaleDateString('en-CA')
            } catch (error) {
                book["publication_date"] = null
            }
        }
    );
   
        res.status(200).json({ books, publishers });  // Send the results to the frontend

    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
    
});

app.post('/library/create-book', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        console.log(data)

        // Cleanse data - If the homeworld or age aren't numbers, make them NULL.
        if (isNaN(parseInt(data.create_book_publisher))) {
            data.create_book_publisher = null
        };

        if (data.create_book_langauge == '') {
            data.create_book_langauge = null
        };

        if (data.create_book_isbn == '') {
            data.create_book_isbn = null
        };

        if (data.create_book_pub_date == '') {
            data.create_book_pub_date = null
        };
        

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_create_book(?, ?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_book_title,
            data.create_book_publisher,
            data.create_book_language,
            data.create_book_isbn,
            data.create_book_pub_date
        ]);

        console.log(`CREATE book. ID: ${rows.new_id} ` +
            `Title: ${data.create_book_title}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Book created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/update-book', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        const default_query = `SELECT * FROM books WHERE book_id = ${data.update_book_id}`;
        
        const [default_book] = await db.query(default_query);

        const default_publisher = default_book[0].publisher_id;
        const default_language = default_book[0].language;
        const default_isbn = default_book[0].isbn;
        const default_publication_date = default_book[0].publication_date;
        
        // Cleanse data - If the homeworld or age aren't numbers, make them NULL.
        if (isNaN(parseInt(data.update_book_publisher))) {
            data.update_book_publisher = default_publisher
        };
        if (data.update_book_language == '') {
            data.update_book_language = default_language
        };
        if (data.update_book_isbn == '') {
            data.update_book_isbn = default_isbn
        };
        if (data.update_book_pub_date == '') {
            data.update_book_pub_date = default_publication_date.toLocaleDateString('en-CA')
        };  
         
        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_update_book(?, ?, ?, ?, ?);`;
        
        // Store ID of last inserted row
        await db.query(query1, [
            data.update_book_id,
            data.update_book_publisher,
            data.update_book_language,
            data.update_book_isbn,
            data.update_book_pub_date
        ]);

        console.log(`Update book. ID: ${data.update_book_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});


// DELETE ROUTES
app.post('/library/delete-book', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;
        console.log(data)
        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_delete_book(?);`;
        await db.query(query1, [data.delete_book_id]);

        console.log(`DELETE book. ID: ${data.delete_book_id} `
        );

        // Redirect the user to the updated webpage data
        res.redirect('/library/books');
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});


app.get('/library/authors', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = 'SELECT * FROM authors';
        
        const [authors] = await db.query(query1);
       
        res.status(200).json({ authors });  // Send the results to the frontend

    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
    
});

app.post('/library/create-author', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;
     
        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_create_author(?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_author_fname,
            data.create_author_lname
        ]);

        console.log(`CREATE author. ID: ${rows.new_id} ` +
            `Name: ${data.create_author_fname} ${data.create_author_lname}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Author created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/update-author', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        const default_query = `SELECT * FROM authors WHERE author_id = ${data.update_author_id}`;
        

        const [default_author] = await db.query(default_query);

        const default_fname = default_author[0].first_name;
        const default_lname = default_author[0].last_name;
      
        
        if (data.update_author_fname == '') {
            data.update_author_fname = default_fname
        };
        if (data.update_author_lname == '') {
            data.update_author_lname = default_lname
        };
         
         
        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_update_author(?, ?, ?);`;
        
        // Store ID of last inserted row
        await db.query(query1, [
            data.update_author_id,
            data.update_author_fname,
            data.update_author_lname
        ]);

        console.log(`Update author. ID: ${data.update_author_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Author updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});


// DELETE ROUTES
app.post('/library/delete-author', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_delete_author(?);`;
        await db.query(query1, [data.delete_author_id]);

        console.log(`DELETE book. ID: ${data.delete_author_id} ` +
            `Title: ${data.delete_title}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/library/authors');
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});


app.get('/library/genres', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = 'SELECT * FROM genres';
        
        const [genres] = await db.query(query1);
          
        res.status(200).json({ genres });  // Send the results to the frontend

    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
    
});

app.post('/library/create-genre', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_create_genre(?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_genre_name
        ]);

        console.log(`CREATE genre. ID: ${rows.new_id} ` +
            `Name: ${data.create_genre_name}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Genre created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/update-genre', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        const default_query = `SELECT * FROM genres WHERE genre_id = ${data.update_genre_id}`;
        

        const [default_genre] = await db.query(default_query);

        const default_name = default_genre[0].genre_name;
      
        
        if (data.update_genre_name == '') {
            data.update_genre_name = default_name
        };
      
         
        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_update_genre(?, ?);`;
        
        // Store ID of last inserted row
        await db.query(query1, [
            data.update_genre_id,
            data.update_genre_name
        ]);

        console.log(`Update genre. ID: ${data.update_genre_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'genre updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});


// DELETE ROUTES
app.post('/library/delete-genre', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_delete_genre(?);`;
        await db.query(query1, [data.delete_genre_id]);

        console.log(`DELETE genre. ID: ${data.delete_genre_id} ` +
            `Title: ${data.delete_genre_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/library/genres');
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.get('/library/publishers', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = 'SELECT * FROM publishers';
        
        const [publishers] = await db.query(query1);
          
        res.status(200).json({ publishers });  // Send the results to the frontend

    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
    
});

app.post('/library/create-publisher', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_create_publisher(?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_publisher_name
        ]);

        console.log(`CREATE publisher. ID: ${rows.new_id} ` +
            `Name: ${data.create_publisher_name}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Genre created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/update-publisher', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        const default_query = `SELECT * FROM publishers WHERE publisher_id = ${data.update_publisher_id}`;
        

        const [default_publisher] = await db.query(default_query);

        const default_name = default_publisher[0].publisher_name;
      
        
        if (data.update_publisher_name == '') {
            data.update_publisher_name = default_name
        };
      
         
        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_update_publisher(?, ?);`;
        
        // Store ID of last inserted row
        await db.query(query1, [
            data.update_publisher_id,
            data.update_publisher_name
        ]);

        console.log(`Update publisher. ID: ${data.update_publisher_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Publisher updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});


// DELETE ROUTES
app.post('/library/delete-publisher', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_delete_publisher(?);`;
        await db.query(query1, [data.delete_publisher_id]);

        console.log(`DELETE publisher. ID: ${data.delete_publisher_id} ` +
            `Title: ${data.delete_publisher_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/library/publishers');
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});


app.get('/library/locations', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = 'SELECT * FROM locations';
        
        const [locations] = await db.query(query1);
                  
        res.status(200).json({ locations });  // Send the results to the frontend

    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
    
});

app.post('/library/create-location', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_create_location(?, ?, ?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_location_name,
            data.create_location_address,
            data.create_location_city,
            data.create_location_state,
            data.create_location_postal_code,
            data.create_location_phone_number,

        ]);

        console.log(`CREATE location. ID: ${rows.new_id} ` +
            `Name: ${data.create_location_name}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Location created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/update-location', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        
        const default_query = `SELECT * FROM locations WHERE location_id = ${data.update_location_id}`;
        

        const [default_location] = await db.query(default_query);

        console.log(default_location)

        const default_name = default_location[0].location_name;
        const default_address = default_location[0].address;
        const default_city = default_location[0].city;
        const default_state = default_location[0].state;
        const default_postal_code = default_location[0].postal_code;
        const default_phone_number = default_location[0].phone_number;
      

        if (data.update_location_name == '') {
            data.update_location_name = default_name
        };

        if (data.update_location_address == '') {
            data.update_location_address = default_address
        };
        if (data.update_location_city == '') {
            data.update_location_city = default_city
        };
        if (data.update_location_state == '') {
            data.update_location_state = default_state
        };
        if (data.update_location_postal_code == '') {
            data.update_location_postal_code = default_postal_code
        };
        if (data.update_location_phone_number == '') {
            data.update_location_phone_number = default_phone_number
        };
               
        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_update_location(?, ?, ?, ?, ?, ?, ?);`;
        
        // Store ID of last inserted row
        await db.query(query1, [
            data.update_location_id,
            data.update_location_name,
            data.update_location_address,
            data.update_location_city,
            data.update_location_state,
            data.update_location_postal_code,
            data.update_location_phone_number
        ]);

        console.log(`Update location. ID: ${data.update_location_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Location updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});


// DELETE ROUTES
app.post('/library/delete-location', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // console.log(data)

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_delete_location(?);`;
        await db.query(query1, [data.delete_location_id]);

        console.log(`DELETE location. ID: ${data.delete_location_id} ` +
            `Name: ${data.delete_location_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/library/locations');
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.get('/library/book-authors', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = 'SELECT books.book_id, books.title, authors.author_id, authors.first_name, authors.last_name \
        FROM books \
        INNER JOIN books_has_authors ON books.book_id = books_has_authors.book_id \
        INNER JOIN authors ON books_has_authors.author_id = authors.author_id \
        ORDER BY books.book_id'  
        
        const query2 = 'SELECT book_id, title, publication_date FROM books'
        const query3 = 'SELECT author_id, first_name, last_name FROM authors'

        const [bookAuthors] = await db.query(query1);
        const [books] = await db.query(query2)
        const [authors] = await db.query(query3)

                  
        res.status(200).json({ bookAuthors, books, authors });  // Send the results to the frontend

    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
    
});

app.post('/library/create-book-author', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_create_book_author(?, ?);`;

        // Store ID of last inserted row
        await db.query(query1, [
            data.create_book_author_book_id,
            data.create_book_author_author_id,
        ]);

        console.log(`CREATE book author. Book ID: ${data.create_book_author_book_id} ` +
            `Authpr ID: ${data.create_book_author_author_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Location created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/update-book-author', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_update_book_author(?, ?, ?);`;
        
        if (data.update_new_book_author_author_id == '') {
            data.update_new_book_author_author_id = data.update_old_book_author_author_id
        }

        // Store ID of last inserted row
        await db.query(query1, [
            data.update_old_book_author_book_id,
            data.update_old_book_author_author_id,
            data.update_new_book_author_author_id
        ]);

        console.log(`Update book author. ID: ${data.update_old_book_author_book_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Publisher updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/delete-book-author', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // console.log(data)

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_delete_book_author(?, ?);`;
        await db.query(query1, [
            data.delete_book_author_book_id, 
            data.delete_book_author_author_id
        ]);

        console.log(`DELETE book author. Book ID: ${data.delete_book_author_book_id} ` +
            `Author ID: ${data.delete_book_author_author_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect("/library/book-authors")
        
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});


app.get('/library/book-locations', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = 'SELECT books.book_id, books.title, locations.location_id, locations.location_name \
        FROM books \
        INNER JOIN books_in_locations ON books.book_id = books_in_locations.book_id \
        INNER JOIN locations ON books_in_locations.location_id = locations.location_id \
        ORDER BY books.book_id'  
        
        const query2 = 'SELECT book_id, title, publication_date FROM books'
        const query3 = 'SELECT location_id, location_name FROM locations'

        const [bookLocations] = await db.query(query1);
        const [books] = await db.query(query2)
        const [locations] = await db.query(query3)

                  
        res.status(200).json({ bookLocations, books, locations });  // Send the results to the frontend

    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
    
});

app.post('/library/create-book-location', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_create_book_location(?, ?);`;

        // Store ID of last inserted row
        await db.query(query1, [
            data.create_book_location_book_id,
            data.create_book_location_location_id,
        ]);

        console.log(`CREATE book location. Book ID: ${data.create_book_location_book_id} ` +
            `Location ID: ${data.create_book_location_location_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Location created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/update-book-location', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_update_book_location(?, ?, ?);`;
        
        if (data.update_new_book_location_location_id == '') {
            data.update_new_book_location_location_id = data.update_old_book_location_location_id
        }

        // Store ID of last inserted row
        await db.query(query1, [
            data.update_old_book_location_book_id,
            data.update_old_book_location_location_id,
            data.update_new_book_location_location_id
        ]);

        console.log(`Update book location. ID: ${data.update_old_book_location_book_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Book/Location updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/delete-book-location', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // console.log(data)

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_delete_book_location(?, ?);`;
        await db.query(query1, [
            data.delete_book_location_book_id, 
            data.delete_book_location_location_id
        ]);

        console.log(`DELETE book location. Book ID: ${data.delete_book_location_book_id} ` +
            `Location ID: ${data.delete_book_location_location_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/library/book-locations');
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.get('/library/book-genres', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = 'SELECT books.book_id, books.title, genres.genre_id, genres.genre_name \
        FROM books \
        INNER JOIN books_has_genres ON books.book_id = books_has_genres.book_id \
        INNER JOIN genres ON books_has_genres.genre_id = genres.genre_id \
        ORDER BY books.book_id'  
        
        const query2 = 'SELECT book_id, title, publication_date FROM books'
        const query3 = 'SELECT genre_id, genre_name FROM genres'

        const [bookGenres] = await db.query(query1);
        const [books] = await db.query(query2)
        const [genres] = await db.query(query3)

                  
        res.status(200).json({ bookGenres, books, genres });  // Send the results to the frontend

    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/create-book-genre', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_create_book_genre(?, ?);`;

        // Store ID of last inserted row
        await db.query(query1, [
            data.create_book_genre_book_id,
            data.create_book_genre_genre_id,
        ]);

        console.log(`CREATE book genre. Book ID: ${data.create_book_genre_book_id} ` +
            `Genre ID: ${data.create_book_genre_genre_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Book/Genre created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/update-book-genre', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_update_book_genre(?, ?, ?);`;
        
        if (data.update_new_book_genre_genre_id == '') {
            data.update_new_book_genre_genre_id = data.update_old_book_genre_genre_id
        }

        // Store ID of last inserted row
        await db.query(query1, [
            data.update_old_book_genre_book_id,
            data.update_old_book_genre_genre_id,
            data.update_new_book_genre_genre_id
        ]);

        console.log(`Update book genre. ID: ${data.update_old_book_genre_book_id}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Publisher updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});

app.post('/library/delete-book-genre', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_delete_book_genre(?, ?);`;
        await db.query(query1, [
            data.delete_book_genre_book_id, 
            data.delete_book_genre_genre_id
        ]);

        console.log(`DELETE book genre. Book ID: ${data.delete_book_genre_book_id} ` +
            `Genre ID: ${data.delete_book_genre_genre_id}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/library/book-genres');
    } catch (error) {
        console.error('Error executing queries:', error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({message: error.sqlMessage}
        );
    }
});















































// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});