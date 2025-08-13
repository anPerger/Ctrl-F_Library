-- #############################
-- CREATE book
-- #############################
DROP PROCEDURE IF EXISTS sp_create_book;

DELIMITER //
CREATE PROCEDURE sp_create_book(
    IN b_title VARCHAR(255), 
    IN b_publisher_id INT, 
    IN b_language VARCHAR(255), 
    IN b_isbn VARCHAR(255),
    IN b_publication_date DATE,
    OUT b_id INT)
BEGIN
    INSERT INTO books (title, publisher_id, publication_date, language, isbn)
    VALUES (b_title, b_publisher_id, b_publication_date, b_language, b_isbn);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into b_id;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- UPDATE book
-- #############################
DROP PROCEDURE IF EXISTS sp_update_book;

DELIMITER //
CREATE PROCEDURE sp_update_book(
    IN b_input_id INT, 
    IN b_publisher_id INT, 
    IN b_language VARCHAR(255), 
    IN b_isbn VARCHAR(255),
    IN b_publication_date DATE)
BEGIN
    UPDATE books 
    SET publisher_id = b_publisher_id, 
    publication_date = b_publication_date, 
    language = b_language, 
    isbn = b_isbn
    WHERE book_id = b_input_id;
        
END //
DELIMITER ;

-- #############################
-- DELETE book
-- #############################
DROP PROCEDURE IF EXISTS sp_delete_book;

DELIMITER //
CREATE PROCEDURE sp_delete_book(IN b_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propagate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM books WHERE book_id = b_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in authors for id: ', b_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- CREATE author
-- #############################
DROP PROCEDURE IF EXISTS sp_create_author;

DELIMITER //
CREATE PROCEDURE sp_create_author(
    IN a_first_name VARCHAR(255), 
    IN a_last_name VARCHAR(255),
    OUT a_id INT)
BEGIN
    INSERT INTO authors (first_name, last_name)
    VALUES (a_first_name, a_last_name);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into a_id;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- UPDATE author
-- #############################
DROP PROCEDURE IF EXISTS sp_update_author;

DELIMITER //
CREATE PROCEDURE sp_update_author(
    IN a_input_id INT, 
    IN a_first_name VARCHAR(255), 
    IN a_last_name VARCHAR(255))
BEGIN
    UPDATE authors
    SET first_name = a_first_name, 
    last_name = a_last_name
    WHERE author_id = a_input_id;
        
END //
DELIMITER ;

-- #############################
-- DELETE author
-- #############################
DROP PROCEDURE IF EXISTS sp_delete_author;

DELIMITER //
CREATE PROCEDURE sp_delete_author(IN a_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propagate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM authors WHERE author_id = a_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in authors for id: ', a_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- CREATE publisher
-- #############################
DROP PROCEDURE IF EXISTS sp_create_publisher;

DELIMITER //
CREATE PROCEDURE sp_create_publisher(
    IN p_name VARCHAR(255), 
    OUT p_id INT)
BEGIN
    INSERT INTO publishers (publisher_name)
    VALUES (p_name);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into p_id;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- UPDATE publisher
-- #############################
DROP PROCEDURE IF EXISTS sp_update_publisher;

DELIMITER //
CREATE PROCEDURE sp_update_publisher(
    IN p_input_id INT, 
    IN p_name VARCHAR(255))
BEGIN
    UPDATE publishers
    SET publisher_name = p_name 
    WHERE publisher_id = p_input_id;
        
END //
DELIMITER ;

-- #############################
-- DELETE publisher
-- #############################
DROP PROCEDURE IF EXISTS sp_delete_publisher;

DELIMITER //
CREATE PROCEDURE sp_delete_publisher(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propagate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM publishers WHERE publisher_id = p_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in genres for id: ', p_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- CREATE location
-- #############################
DROP PROCEDURE IF EXISTS sp_create_location;

DELIMITER //
CREATE PROCEDURE sp_create_location(
    IN l_name VARCHAR(255), 
	IN l_address VARCHAR(255),
    IN l_city VARCHAR(255),
    IN l_state VARCHAR(255),
    IN l_postal_code VARCHAR(255),
    IN l_phone_number VARCHAR(255),
    OUT l_id INT)
BEGIN
    INSERT INTO locations (location_name, address, city, state, postal_code, phone_number)
    VALUES (l_name, l_address, l_city, l_state, l_postal_code, l_phone_number);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into l_id;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- UPDATE location
-- #############################
DROP PROCEDURE IF EXISTS sp_update_location;

DELIMITER //
CREATE PROCEDURE sp_update_location(
    IN l_input_id INT, 
    IN l_name VARCHAR(255), 
    IN l_address VARCHAR(255), 
    IN l_city VARCHAR(255),
    IN l_state VARCHAR(255),
    IN l_postal_code VARCHAR(255),
    IN l_phone_number VARCHAR(255))
    
BEGIN
    UPDATE locations
    SET location_name = l_name, 
    address = l_address, 
    city = l_city,
    state = l_state, 
    postal_code = l_postal_code,
    phone_number = l_phone_number
    WHERE location_id = l_input_id;
        
END //
DELIMITER ;

-- #############################
-- DELETE location
-- #############################
DROP PROCEDURE IF EXISTS sp_delete_location;

DELIMITER //
CREATE PROCEDURE sp_delete_location(IN l_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propagate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM locations WHERE location_id = l_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in authors for id: ', l_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- CREATE genre
-- #############################
DROP PROCEDURE IF EXISTS sp_create_genre;

DELIMITER //
CREATE PROCEDURE sp_create_genre(
    IN g_name VARCHAR(255), 
    OUT g_id INT)
BEGIN
    INSERT INTO genres (genre_name)
    VALUES (g_name);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into g_id;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- UPDATE genre
-- #############################
DROP PROCEDURE IF EXISTS sp_update_genre;

DELIMITER //
CREATE PROCEDURE sp_update_genre(
    IN g_input_id INT, 
    IN g_name VARCHAR(255))
BEGIN
    UPDATE genres
    SET genre_name = g_name 
    WHERE genre_id = g_input_id;
        
END //
DELIMITER ;

-- #############################
-- DELETE genre
-- #############################
DROP PROCEDURE IF EXISTS sp_delete_genre;

DELIMITER //
CREATE PROCEDURE sp_delete_genre(IN g_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propagate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM genres WHERE genre_id = g_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in genres for id: ', g_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- #############################
-- CREATE book_author
-- #############################
DROP PROCEDURE IF EXISTS sp_create_book_author;

DELIMITER //
CREATE PROCEDURE sp_create_book_author(
    IN b_id INT, 
    IN a_id INT)
BEGIN
    INSERT INTO books_has_authors (book_id, author_id)
    VALUES (b_id, a_id);
END //
DELIMITER ;

-- #############################
-- UPDATE book_author
-- #############################
DROP PROCEDURE IF EXISTS sp_update_book_author;

DELIMITER //
CREATE PROCEDURE sp_update_book_author(
    IN b_old_id INT, 
    IN a_old_id INT,
    IN a_new_id INT)
BEGIN
    UPDATE books_has_authors
    SET author_id = a_new_id 
    WHERE book_id = b_old_id AND author_id = a_old_id;
        
END //
DELIMITER ;

-- #############################
-- DELETE book_author
-- #############################
DROP PROCEDURE IF EXISTS sp_delete_book_author;

DELIMITER //
CREATE PROCEDURE sp_delete_book_author(
    IN b_id INT, 
    IN a_id INT)
BEGIN
    DELETE FROM books_has_authors
    WHERE book_id = b_id
    AND author_id = a_id;
END //
DELIMITER ;

-- #############################
-- CREATE book_location
-- #############################
DROP PROCEDURE IF EXISTS sp_create_book_location;

DELIMITER //
CREATE PROCEDURE sp_create_book_location(
    IN b_id INT, 
    IN l_id INT)
BEGIN
    INSERT INTO books_in_locations (book_id, location_id)
    VALUES (b_id, l_id);
END //
DELIMITER ;

-- #############################
-- UPDATE book_location
-- #############################
DROP PROCEDURE IF EXISTS sp_update_book_location;

DELIMITER //
CREATE PROCEDURE sp_update_book_location(
    IN b_old_id INT, 
    IN l_old_id INT,
    IN l_new_id INT)
BEGIN
    UPDATE books_in_locations
    SET location_id = l_new_id 
    WHERE book_id = b_old_id AND location_id = l_old_id;
        
END //
DELIMITER ;

-- #############################
-- DELETE book_location
-- #############################
DROP PROCEDURE IF EXISTS sp_delete_book_location;

DELIMITER //
CREATE PROCEDURE sp_delete_book_location(
    IN b_id INT, 
    IN l_id INT)
BEGIN
    DELETE FROM books_in_locations
    WHERE book_id = b_id
    AND location_id = l_id;
END //
DELIMITER ;

-- #############################
-- CREATE book_genre
-- #############################
DROP PROCEDURE IF EXISTS sp_create_book_genre;

DELIMITER //
CREATE PROCEDURE sp_create_book_genre(
    IN b_id INT, 
    IN g_id INT)
BEGIN
    INSERT INTO books_has_genres (book_id, genre_id)
    VALUES (b_id, g_id);
END //
DELIMITER ;

-- ############################
-- UPDATE book_genre
-- #############################
DROP PROCEDURE IF EXISTS sp_update_book_genre;

DELIMITER //
CREATE PROCEDURE sp_update_book_genre(
    IN b_old_id INT, 
    IN g_old_id INT,
    IN g_new_id INT)
BEGIN
    UPDATE books_has_genres
    SET genre_id = g_new_id 
    WHERE book_id = b_old_id AND genre_id = g_old_id;
        
END //
DELIMITER ;

-- #############################
-- DELETE book_genre
-- #############################
DROP PROCEDURE IF EXISTS sp_delete_book_genre;

DELIMITER //
CREATE PROCEDURE sp_delete_book_genre(
    IN b_id INT, 
    IN g_id INT)
BEGIN
    DELETE FROM books_has_genres
    WHERE book_id = b_id
    AND genre_id = g_id;
END //
DELIMITER ;

-- #############################
-- RESET DB
-- #############################
DROP PROCEDURE IF EXISTS sp_reset_db;

DELIMITER //
CREATE PROCEDURE sp_reset_db()
BEGIN
    SET FOREIGN_KEY_CHECKS=0;
	SET AUTOCOMMIT = 0;
	DROP TABLE IF EXISTS books;
	DROP TABLE IF EXISTS publishers;
	DROP TABLE IF EXISTS locations;
	DROP TABLE IF EXISTS authors;
	DROP TABLE IF EXISTS genres;
	DROP TABLE IF EXISTS books_in_locations;
	DROP TABLE IF EXISTS books_has_authors;
	DROP TABLE IF EXISTS books_has_genres;

	-- create books table  
	CREATE TABLE books (
			book_id int(11) NOT NULL AUTO_INCREMENT,
			title varchar(245) NOT NULL,
			publisher_id int(11),
			publication_date date,
			language varchar(245),
			isbn varchar(245) UNIQUE,
			PRIMARY KEY (book_id),
			FOREIGN KEY (publisher_id) REFERENCES publishers (publisher_id)
			ON DELETE SET NULL
	);

	-- inserting spoof data 
	INSERT INTO books (title, publisher_id, publication_date, language, isbn)
	VALUES ('Actually debate include while audience court phone.', '9', '1993-11-06', 'Arabic','978-0-339-63792-4'),
	('Center bad risk.', '3', '1991-09-07', 'Esperanto','978-0-682-23028-5'),
	('Throughout so very successful very piece guess.', '5', '1984-06-10', 'Arabic','978-0-401-13191-6'),
	('International across though discussion body.', '6', '2024-10-09', 'Spanish','978-0-86581-715-9'),
	('Call project town.', '4', '2006-02-02', 'Bosnian','978-0-8340-2213-3'),
	('Mean class growth age middle.', '10', '1987-03-20', 'Slovenian','978-0-7882-8990-3'),
	('Likely article reach service.', '2', '1991-01-17', 'Arabic','978-0-02-544209-2'),
	('Expert red education cut collection.', '3', '1988-10-05', 'Quechua','978-0-940602-06-9'),
	('Brother democratic see fine.', '9', '2023-07-10', 'Arabic','978-0-428-39276-5'),
	('Relationship dark purpose information miss democratic worker.', '4', '2012-09-07', 'Spanish','978-1-07-128670-8'),
	('Wear fine me off board sit enjoy cultural.', '1', '2000-07-17', 'Spanish','978-1-269-34987-1'),
	('Mean find light white or.', '4', '1999-01-02', 'Ganda','978-1-374-53526-8'),
	('You material everyone.', '10', '1975-09-05', 'English','978-0-499-63019-3'),
	('Again rest majority step store stock drug face.', '8', '2019-11-09', 'Spanish','978-0-10-445473-2'),
	('Hard against truth hospital treatment paper onto each.', '4', '1972-04-28', 'English','978-0-206-21981-9'),
	('Environment general be sit life lay late know.', '9', '2008-01-03', 'English','978-0-266-53533-1'),
	('Easy wind sister.', '6', '2017-12-03', 'Spanish','978-1-57009-631-0'),
	('Establish cost name identify oil amount.', '1', '1993-10-11', 'Arabic','978-1-72075-941-6'),
	('Window high way water phone while.', '3', '2025-04-11', 'English','978-1-81825-188-4'),
	('Some high poor act action.', '4', '2019-03-27', 'Japanese','978-0-504-89473-2'),
	('Community oil everybody present expect address.', '7', '1994-03-12', 'Spanish','978-1-07-671116-8'),
	('Side particular then first which responsibility ability.', '3', '1980-04-08', 'Northern Sami','978-0-262-49444-1'),
	('Charge growth probably national might.', '5', '2003-01-08', 'English','978-1-65682-470-7'),
	('Near put leave share.', '7', '1982-01-12', 'Bulgarian','978-1-246-59456-0'),
	('Third improve better represent own.', '7', '1988-05-17', 'Arabic','978-1-107-30158-0'),
	('Option race sell second.', '6', '2008-08-17', 'Spanish','978-1-5348-2506-2'),
	('Per natural individual none its system another.', '8', '2015-07-09', 'Arabic','978-0-578-72000-5'),
	('Sound role money agency.', '7', '2001-05-17', 'English','978-0-88521-772-4'),
	('Behavior item avoid.', '5', '2015-06-08', 'English','978-1-331-34888-7'),
	('Large deep beautiful game view.', '5', '1976-05-07', 'Spanish','978-1-61248-285-9'),
	('Newspaper democratic score above fire major.', '7', '1976-11-26', 'Spanish','978-1-78725-528-9'),
	('List easy late leader citizen network benefit.', '7', '1997-07-08', 'Spanish','978-1-5195-2212-2'),
	('Role teach result city.', '1', '1996-02-13', 'Danish','978-1-82351-971-9'),
	('Stuff enjoy him foot of.', '1', '1972-05-29', 'Arabic','978-0-618-11667-6'),
	('Chair arm record their scene.', '3', '2000-06-07', 'Spanish','978-0-11-038494-8'),
	('To party party stage indeed court.', '7', '1993-05-07', 'Arabic','978-1-293-77401-4'),
	('Subject church win happy our design Mrs.', '10', '1970-11-21', 'Arabic','978-0-9534412-3-5'),
	('Marriage several make station hold receive manage discussion.', '2', '1982-02-15', 'English','978-1-902506-66-1'),
	('Necessary toward amount add direction.', '4', '1993-07-16', 'Ossetian','978-1-874561-95-8'),
	('Test task indeed tell instead billion.', '1', '1999-10-08', 'Arabic','978-1-173-99397-9'),
	('Story thousand factor sense born.', '1', '1987-08-02', 'Fijian','978-0-356-86242-2'),
	('Until plan clear garden.', '8', '1978-01-24', 'Spanish','978-1-186-11965-6'),
	('Interview all fight administration head recent so.', '10', '1974-05-11', 'Spanish','978-1-04-577147-6'),
	('Style again difficult position.', '6', '2015-12-27', 'Arabic','978-0-948368-04-2'),
	('Have sort indeed answer both lay meeting.', '10', '1976-08-21', 'Ojibwa','978-1-04-438611-4'),
	('Although international beautiful claim most many.', '7', '2021-09-21', 'Spanish','978-1-66832-750-0'),
	('Within front natural should focus along claim their.', '9', '1972-06-25', 'Arabic','978-0-494-17475-3'),
	('Out bill strong blood reason figure.', '5', '2001-04-09', 'Aymara','978-0-296-19408-9'),
	('Stay education small include beautiful.', '10', '2012-07-31', 'Spanish','978-0-277-26130-4'),
	('Example able opportunity offer democratic include source.', '9', '1971-10-19', 'Kazakh','978-0-686-93296-3'),
	('Lay director Congress turn.', '7', '2006-04-12', 'Burmese','978-0-550-97866-0'),
	('High environmental light great or pay place computer.', '8', '2022-05-10', 'Arabic','978-0-331-25165-4'),
	('Seat charge century.', '5', '1971-01-31', 'English','978-0-297-22675-8'),
	('Notice serve minute name report move foot.', '10', '2015-05-28', 'Arabic','978-0-340-66982-2'),
	('Sell build break left.', '3', '2020-04-13', 'Spanish','978-0-7109-9766-1'),
	('Whether seven issue us billion become.', '7', '2016-03-23', 'English','978-1-189-05595-1'),
	('Fall light sport spring.', '7', '1992-03-06', 'Arabic','978-0-13-862510-8'),
	('Agreement many case mother just less open.', '4', '1997-04-21', 'Spanish','978-0-274-41635-6'),
	('Lay media character everybody.', '7', '2024-10-18', 'Hausa','978-0-473-89914-1'),
	('Political staff threat team action make.', '8', '2009-05-28', 'English','978-1-72082-824-2'),
	('Interview rate purpose family guy care color.', '4', '1972-02-18', 'Spanish','978-0-312-00623-5'),
	('Family hundred history word collection.', '1', '1977-07-01', 'English','978-0-07-417946-8'),
	('Maybe fill need eight under.', '4', '2020-07-07', 'Arabic','978-1-75018-858-3'),
	('Job establish development why.', '8', '1970-04-18', 'Arabic','978-1-140-09781-5'),
	('Near theory hit manage else current.', '4', '2014-06-28', 'Spanish','978-1-64129-622-9'),
	('Nation member so director sea.', '9', '2000-04-15', 'Arabic','978-1-80588-325-8'),
	('Wife lead positive white do artist.', '9', '2012-04-05', 'English','978-0-7945-7389-8'),
	('Record decide yet join cut their.', '8', '1999-12-03', 'Arabic','978-1-159-34319-4'),
	('Peace you senior put understand standard painting.', '9', '1984-04-24', 'Spanish','978-1-4090-7043-6'),
	('Future thing charge officer dream.', '10', '1984-04-27', 'Kashmiri','978-0-434-01559-7'),
	('Spring week board plant.', '1', '2019-12-31', 'Spanish','978-0-8325-8013-0'),
	('Stay call something father.', '5', '2019-05-13', 'Arabic','978-0-297-94436-2'),
	('Just everyone campaign process.', '3', '2002-07-30', 'Spanish','978-1-4354-2712-9'),
	('Huge local sport side quickly customer.', '7', '1976-08-30', 'Nepali','978-1-219-52528-7'),
	('Position their ready large look between use.', '4', '1995-01-02', 'Chechen','978-0-322-49248-6'),
	('Weight realize must school young.', '1', '2004-04-15', 'Spanish','978-0-375-75089-2'),
	('Question radio serious green hear avoid federal.', '10', '1990-05-26', 'Spanish','978-1-953678-80-5'),
	('Clearly low wrong son understand.', '1', '1972-02-19', 'Arabic','978-1-4321-3705-2'),
	('Real guess one nearly.', '9', '2010-06-06', 'Spanish','978-0-533-57746-0'),
	('Power song myself off answer article true.', '7', '2013-06-18', 'Spanish','978-0-7566-7430-4'),
	('Card hundred boy wrong key.', '10', '2021-11-07', 'Arabic','978-1-361-38461-9'),
	('Themselves meeting fish table minute growth.', '4', '1972-08-24', 'Spanish','978-0-914940-44-9'),
	('Loss direction chair effort bit.', '10', '1986-10-12', 'Arabic','978-1-08-819527-7'),
	('Similar environment alone husband imagine.', '5', '2015-05-12', 'Spanish','978-0-89069-180-9'),
	('Energy rock look factor.', '4', '1985-09-19', 'Arabic','978-0-657-20088-6'),
	('Big peace key.', '8', '1981-12-20', 'Spanish','978-0-06-195119-0'),
	('Modern I big most.', '7', '2009-12-12', 'Arabic','978-0-06-398469-1'),
	('Travel others purpose effect discover require structure with.', '6', '1993-01-23', 'Arabic','978-0-7959-9488-3'),
	('Tough light put chance let best.', '1', '1980-07-09', 'Arabic','978-0-220-57231-0'),
	('Government concern open something everything finally.', '3', '2018-03-05', 'Spanish','978-0-9989171-5-3'),
	('Strategy least dream fall.', '6', '1995-06-19', 'Welsh','978-0-533-69506-5'),
	('Direction whatever plant last either.', '2', '2015-06-18', 'Spanish','978-0-03-859108-4'),
	('Bring affect play view goal participant everything message.', '3', '2024-02-16', 'Arabic','978-0-11-120017-9'),
	('Prepare score Democrat two generation deal chance.', '3', '1986-11-12', 'English','978-1-56080-458-1'),
	('Interview young likely.', '3', '2013-02-08', 'English','978-0-07-939238-1'),
	('Now offer law important.', '3', '1977-07-19', 'Spanish','978-0-15-767960-1'),
	('Analysis out name next.', '4', '2019-08-25', 'Arabic','978-1-194-52780-1'),
	('Office price between war.', '7', '1990-12-11', 'English','978-1-160-96028-1'),
	('Into much study why television we.', '5', '1990-04-04', 'Spanish','978-0-574-92168-0'),
	('Kind movement reason.', '9', '1994-06-18', 'English','978-1-4603-3074-6');


	-- creating publisher table 
	CREATE TABLE publishers (

		publisher_id int(11) NOT NULL AUTO_INCREMENT,
		publisher_name varchar(245) NOT NULL,
		PRIMARY KEY (publisher_id)
	);

	-- inserting spoof data for publishers 
	INSERT INTO publishers (publisher_name)
	VALUES ('Hill, Nichols and Williams'),
	('Jackson, Ramirez and Rodgers'),
	('Kane-Walker'),
	('Coleman, Riddle and Sharp'),
	('Lewis Inc'),
	('Cole Group'),
	('Clark Ltd'),
	('Lyons-Estrada'),
	('Gill Inc'),
	('Carter Group');

	-- creating authors table 
	CREATE TABLE authors (
		author_id int(11) NOT NULL AUTO_INCREMENT,
		first_name varchar(245) NOT NULL,
		last_name varchar(245) NOT NULL,
		PRIMARY KEY (author_id)
	);

	-- inserting spoof data for authors 
	INSERT INTO authors (first_name, last_name)
	VALUES ('Michael', 'Pierce'),
	('Michael', 'Wilkerson'),
	('Julie', 'Myers'),
	('Michele', 'Wallace'),
	('Joseph', 'Green'),
	('Rachel', 'Miller'),
	('Nicholas', 'Peterson'),
	('Kristina', 'Anthony'),
	('Victoria', 'Kelly'),
	('Rebecca', 'Griffin'),
	('Tiffany', 'Torres'),
	('Sarah', 'Burke'),
	('Stacy', 'Stuart'),
	('Shawn', 'Barnes'),
	('William', 'Patrick'),
	('Jill', 'Clark'),
	('Brett', 'Swanson'),
	('Brian', 'Wang'),
	('Anita', 'Duncan'),
	('William', 'Carson'),
	('Olivia', 'Kline'),
	('Michael', 'Johns'),
	('Kristin', 'Williams'),
	('Michael', 'Green'),
	('Tammy', 'Fuller'),
	('Steven', 'Simmons'),
	('Brian', 'Strickland'),
	('Kenneth', 'Becker'),
	('Michael', 'Johnson'),
	('Aaron', 'Ellis'),
	('Michael', 'Phelps'),
	('James', 'Ramirez'),
	('Christina', 'Flores'),
	('Toni', 'Estrada'),
	('Ronnie', 'Hubbard'),
	('Ricardo', 'Chen'),
	('Shaun', 'Greene'),
	('Jaime', 'Jenkins'),
	('April', 'Kim'),
	('Nathan', 'Juarez'),
	('Taylor', 'Cobb'),
	('Marcus', 'Harris'),
	('James', 'Shah'),
	('Kevin', 'Miller'),
	('Anthony', 'Patton'),
	('Sarah', 'Thomas'),
	('Julia', 'Reyes'),
	('George', 'Ray'),
	('Anthony', 'Moore'),
	('Melissa', 'Sullivan');

	-- creating table for genres 
	CREATE TABLE genres (

		genre_id int(11) NOT NULL AUTO_INCREMENT,
		genre_name varchar(245),
		PRIMARY KEY (genre_id)
	);

	-- inserting data for genres 
	INSERT INTO genres (genre_name)
	VALUES ('Action'),
	('Adventure'),
	('Biography'),
	('Childrens'),
	('Crime'),
	('Comedy'),
	('Drama'),
	('Fantasy'),
	('History'),
	('Thriller'),
	('Romance'),
	('Young-Adult');

	-- creating locations table 
	CREATE TABLE locations (
		location_id int(11) NOT NULL AUTO_INCREMENT,
		location_name varchar(245) NOT NULL,
		address varchar(245),
		city varchar(245),
		state varchar(245),
		postal_code varchar(245),
		phone_number varchar(245),
		PRIMARY KEY (location_id) 
	);

	-- inserting spoof locations data 
	INSERT INTO locations (location_name, address, city, state, postal_code, phone_number)
	VALUES ('fox', '1976 Nelson Union', 'New Cheryl', 'WI', '53339', '285-410-9738'),
	('adams', '9104 Jackson Keys Apt. 691', 'Destinystad', 'TN', '38232', '4369214637'),
	('williams', '04409 John Ports Apt. 956', 'South Ryanborough', 'ND', '58717', '230-684-9682'),
	('levine-wilkinson', '005 Amy Square Apt. 932', 'Morrishaven', 'CT', '06189', '(985)282-5517'),
	('gross', '74208 Andrew Corner', 'Warrenton', 'TN', '38069', '576-411-8328'),
	('tucker', '73755 Bonilla Divide Suite 871', 'Reidberg', 'VI', '00804', '6496951010'),
	('todd', '314 Mark Wells Suite 938', 'Robertsmouth', 'SD', '57730', '(877)270-5241'),
	('carney', '7331 Stone Hills', 'Lake Brendaburgh', 'AS', '96799', '3186524798'),
	('singleton-blair', '06731 Jessica Court', 'Elizabethchester', 'NY', '12516', '4123865000'),
	('davis', '78279 Jason Loop Apt. 778', 'Fitzgeraldfort', 'AR', '72736', '930-890-8794');

	CREATE TABLE books_has_authors (
		book_id int(11) NOT NULL,
		author_id int(11) NOT NULL,
		PRIMARY KEY (book_id, author_id),
		FOREIGN KEY (book_id) REFERENCES books (book_id) ON DELETE CASCADE,
		FOREIGN KEY (author_id) REFERENCES authors (author_id) ON DELETE CASCADE
	);

	INSERT INTO books_has_authors(book_id, author_id)
	VALUES (1, 31),
	(2, 24),
	(3, 27),
	(4, 4),
	(5, 45),
	(6, 45),
	(7, 12),
	(8, 26),
	(9, 37),
	(10, 8),
	(10, 39),
	(11, 21),
	(12, 39),
	(13, 34),
	(14, 12),
	(15, 41),
	(16, 26),
	(17, 10),
	(18, 21),
	(19, 47),
	(20, 28),
	(21, 30),
	(22, 27),
	(22, 49),
	(22, 36),
	(22, 34),
	(23, 5),
	(24, 30),
	(25, 1),
	(26, 2),
	(27, 29),
	(28, 34),
	(29, 12),
	(29, 47),
	(29, 38),
	(29, 43),
	(30, 43),
	(31, 28),
	(32, 42),
	(33, 8),
	(34, 40),
	(35, 25),
	(35, 27),
	(35, 14),
	(36, 35),
	(36, 28),
	(36, 20),
	(36, 37),
	(37, 40),
	(38, 32),
	(39, 35),
	(40, 42),
	(40, 12),
	(41, 49),
	(42, 28),
	(43, 21),
	(44, 38),
	(45, 39),
	(46, 9),
	(47, 19),
	(48, 21),
	(49, 30),
	(50, 4),
	(51, 14),
	(52, 9),
	(53, 2),
	(54, 44),
	(55, 28),
	(56, 3),
	(57, 2),
	(58, 24),
	(59, 27),
	(60, 21),
	(61, 47),
	(62, 38),
	(63, 7),
	(64, 25),
	(65, 19),
	(66, 16),
	(67, 33),
	(68, 43),
	(69, 8),
	(70, 12),
	(71, 40),
	(72, 7),
	(73, 10),
	(74, 47),
	(75, 33),
	(76, 19),
	(77, 48),
	(78, 42),
	(79, 18),
	(80, 16),
	(81, 19),
	(82, 41),
	(83, 8),
	(83, 36),
	(84, 47),
	(85, 34),
	(86, 13),
	(86, 47),
	(87, 4),
	(87, 5),
	(88, 21),
	(89, 12),
	(90, 49),
	(91, 20),
	(92, 20),
	(92, 37),
	(92, 32),
	(93, 47),
	(93, 25),
	(93, 43),
	(93, 27),
	(94, 31),
	(95, 30),
	(96, 24),
	(97, 46),
	(98, 15),
	(99, 30),
	(100, 47);

	CREATE TABLE books_in_locations (
	  book_id INT(11) NOT NULL,
	  location_id INT(11) NOT NULL,
	  PRIMARY KEY (book_id, location_id),
	  FOREIGN KEY (book_id) REFERENCES books (book_id) ON DELETE CASCADE,
	  FOREIGN KEY (location_id) REFERENCES locations (location_id) ON DELETE CASCADE
	);

	INSERT INTO books_in_locations (book_id, location_id)
	VALUES (1, 25),
	(1, 29),
	(1, 50),
	(1, 3),
	(1, 27),
	(1, 5),
	(1, 45),
	(2, 24),
	(2, 25),
	(2, 45),
	(2, 27),
	(2, 48),
	(2, 43),
	(2, 19),
	(2, 20),
	(2, 39),
	(3, 14),
	(4, 23),
	(4, 33),
	(4, 24),
	(4, 42),
	(4, 41),
	(4, 29),
	(4, 16),
	(5, 1),
	(5, 34),
	(5, 21),
	(5, 18),
	(5, 41),
	(5, 3),
	(5, 7),
	(5, 47),
	(5, 44),
	(5, 6),
	(6, 4),
	(7, 14),
	(7, 35),
	(7, 19),
	(7, 15),
	(8, 33),
	(8, 20),
	(8, 32),
	(9, 16),
	(9, 40),
	(9, 36),
	(10, 25),
	(10, 6),
	(10, 45),
	(10, 44),
	(10, 7),
	(10, 15),
	(10, 27),
	(10, 4),
	(11, 24),
	(11, 17),
	(11, 9),
	(12, 37),
	(12, 16),
	(13, 25),
	(13, 17),
	(13, 32),
	(13, 39),
	(13, 24),
	(13, 10),
	(14, 43),
	(14, 47),
	(14, 29),
	(14, 38),
	(15, 9),
	(15, 15),
	(16, 2),
	(16, 21),
	(16, 14),
	(16, 7),
	(16, 39),
	(16, 27),
	(16, 36),
	(16, 40),
	(16, 1),
	(17, 36),
	(17, 21),
	(17, 30),
	(17, 28),
	(17, 19),
	(17, 40),
	(17, 41),
	(17, 7),
	(18, 36),
	(18, 3),
	(19, 22),
	(19, 39),
	(19, 1),
	(19, 24),
	(19, 6),
	(19, 38),
	(20, 48),
	(20, 22),
	(21, 22),
	(21, 31),
	(22, 41),
	(22, 22),
	(22, 50),
	(22, 29),
	(23, 1),
	(23, 33),
	(23, 34),
	(23, 7),
	(23, 31),
	(23, 20),
	(23, 12),
	(24, 29),
	(24, 37),
	(24, 8),
	(24, 17),
	(24, 41),
	(24, 36),
	(24, 3),
	(25, 4),
	(25, 47),
	(25, 6),
	(25, 46),
	(25, 14),
	(25, 38),
	(26, 38),
	(26, 5),
	(26, 16),
	(26, 45),
	(26, 46),
	(27, 2),
	(27, 14),
	(27, 38),
	(27, 1),
	(27, 17),
	(27, 41),
	(27, 33),
	(27, 6),
	(27, 47),
	(27, 46),
	(28, 17),
	(28, 10),
	(28, 45),
	(28, 1),
	(28, 25),
	(28, 27),
	(28, 33),
	(28, 19),
	(28, 38),
	(29, 49),
	(29, 50),
	(29, 20),
	(29, 43),
	(29, 46),
	(29, 17),
	(29, 9),
	(30, 16),
	(30, 4),
	(30, 27),
	(30, 26),
	(30, 5),
	(30, 17),
	(30, 2),
	(31, 14),
	(31, 40),
	(31, 45),
	(31, 48),
	(31, 1),
	(31, 7),
	(32, 11),
	(32, 40),
	(32, 22),
	(32, 48),
	(32, 4),
	(32, 21),
	(32, 42),
	(33, 36),
	(33, 13),
	(34, 48),
	(34, 36),
	(34, 13),
	(34, 9),
	(34, 34),
	(34, 2),
	(34, 35),
	(34, 33),
	(35, 22),
	(35, 19),
	(35, 43),
	(35, 27),
	(35, 16),
	(35, 42),
	(36, 12),
	(36, 22),
	(36, 49),
	(36, 32),
	(37, 37),
	(37, 6),
	(37, 4),
	(38, 18),
	(38, 22),
	(38, 40),
	(38, 45),
	(38, 32),
	(38, 20),
	(38, 28),
	(38, 50),
	(38, 36),
	(39, 11),
	(40, 2),
	(40, 41),
	(40, 36),
	(40, 28),
	(40, 7),
	(40, 50),
	(40, 9),
	(40, 13),
	(40, 46),
	(40, 22),
	(41, 10),
	(41, 42),
	(41, 17),
	(41, 19),
	(41, 2),
	(42, 20),
	(42, 18),
	(42, 43),
	(42, 1),
	(42, 12),
	(43, 30),
	(43, 34),
	(43, 49),
	(43, 28),
	(43, 50),
	(43, 41),
	(43, 26),
	(43, 20),
	(44, 15),
	(44, 45),
	(44, 28),
	(44, 11),
	(44, 38),
	(44, 8),
	(44, 14),
	(44, 19),
	(45, 8),
	(45, 18),
	(45, 29),
	(45, 9),
	(45, 7),
	(45, 39),
	(45, 17),
	(45, 44),
	(45, 16),
	(45, 10),
	(46, 29),
	(46, 43),
	(46, 35),
	(46, 49),
	(46, 5),
	(46, 8),
	(46, 21),
	(47, 31),
	(47, 48),
	(47, 11),
	(47, 10),
	(47, 37),
	(47, 4),
	(47, 13),
	(47, 34),
	(47, 36),
	(47, 17),
	(48, 17),
	(48, 30),
	(48, 40),
	(48, 28),
	(48, 13),
	(49, 43),
	(50, 25),
	(50, 40),
	(50, 8),
	(50, 17),
	(50, 47),
	(50, 28),
	(50, 10),
	(50, 9),
	(50, 35),
	(50, 11),
	(51, 6),
	(51, 20),
	(52, 12),
	(52, 41),
	(52, 50),
	(53, 25),
	(54, 15),
	(54, 2),
	(54, 17),
	(54, 50),
	(54, 6),
	(54, 41),
	(54, 26),
	(54, 1),
	(54, 39),
	(55, 17),
	(55, 37),
	(55, 43),
	(55, 41),
	(55, 13),
	(55, 21),
	(55, 34),
	(55, 27),
	(55, 18),
	(55, 2),
	(56, 32),
	(56, 43),
	(56, 33),
	(57, 4),
	(57, 13),
	(57, 22),
	(57, 35),
	(57, 2),
	(57, 42),
	(57, 16),
	(58, 44),
	(58, 2),
	(58, 12),
	(58, 4),
	(58, 37),
	(59, 11),
	(59, 7),
	(59, 34),
	(59, 48),
	(59, 10),
	(59, 33),
	(59, 5),
	(59, 15),
	(59, 42),
	(60, 39),
	(61, 3),
	(61, 16),
	(61, 42),
	(61, 19),
	(61, 18),
	(62, 16),
	(62, 40),
	(62, 31),
	(62, 46),
	(62, 30),
	(62, 34),
	(62, 41),
	(63, 2),
	(63, 20),
	(64, 16),
	(64, 50),
	(64, 11),
	(64, 47),
	(64, 5),
	(64, 36),
	(64, 23),
	(65, 23),
	(65, 22),
	(66, 45),
	(67, 29),
	(67, 34),
	(67, 48),
	(67, 43),
	(67, 12),
	(67, 20),
	(68, 20),
	(68, 27),
	(69, 14),
	(69, 19),
	(69, 36),
	(69, 37),
	(69, 6),
	(69, 40),
	(69, 20),
	(69, 33),
	(69, 11),
	(69, 25),
	(70, 10),
	(70, 24),
	(70, 8),
	(71, 49),
	(71, 16),
	(71, 5),
	(71, 27),
	(71, 28),
	(71, 33),
	(71, 43),
	(71, 35),
	(72, 27),
	(72, 24),
	(72, 36),
	(72, 29),
	(72, 50),
	(72, 28),
	(73, 36),
	(73, 49),
	(73, 17),
	(73, 3),
	(73, 50),
	(73, 26),
	(74, 9),
	(74, 22),
	(74, 10),
	(74, 35),
	(74, 5),
	(74, 17),
	(74, 18),
	(74, 31),
	(75, 29),
	(75, 3),
	(75, 33),
	(75, 50),
	(75, 7),
	(75, 26),
	(75, 25),
	(76, 19),
	(76, 2),
	(76, 34),
	(77, 17),
	(77, 7),
	(77, 2),
	(77, 49),
	(77, 34),
	(77, 42),
	(77, 47),
	(77, 33),
	(78, 11),
	(79, 43),
	(79, 5),
	(79, 7),
	(79, 29),
	(80, 44),
	(80, 19),
	(80, 24),
	(80, 41),
	(80, 42),
	(80, 32),
	(80, 4),
	(80, 20),
	(80, 12),
	(80, 49),
	(81, 44),
	(81, 29),
	(81, 14),
	(81, 26),
	(81, 32),
	(81, 49),
	(81, 10),
	(82, 30),
	(83, 26),
	(83, 43),
	(84, 2),
	(84, 37),
	(84, 30),
	(84, 41),
	(85, 30),
	(85, 42),
	(86, 14),
	(86, 44),
	(86, 12),
	(86, 40),
	(86, 8),
	(86, 26),
	(86, 19),
	(86, 20),
	(87, 16),
	(87, 50),
	(87, 27),
	(87, 24),
	(87, 32),
	(87, 33),
	(87, 46),
	(87, 20),
	(87, 10),
	(87, 39),
	(88, 11),
	(88, 8),
	(88, 43),
	(88, 30),
	(88, 45),
	(89, 45),
	(89, 21),
	(89, 18),
	(89, 36),
	(89, 39),
	(89, 20),
	(89, 47),
	(89, 44),
	(89, 23),
	(90, 29),
	(90, 49),
	(90, 50),
	(90, 20),
	(90, 9),
	(90, 18),
	(90, 24),
	(91, 30),
	(91, 7),
	(91, 34),
	(91, 40),
	(92, 40),
	(92, 10),
	(92, 30),
	(92, 42),
	(92, 12),
	(92, 6),
	(92, 13),
	(92, 50),
	(92, 18),
	(93, 15),
	(93, 46),
	(93, 36),
	(93, 2),
	(93, 1),
	(93, 45),
	(93, 33),
	(93, 50),
	(94, 14),
	(94, 50),
	(94, 36),
	(94, 9),
	(94, 33),
	(94, 32),
	(94, 38),
	(94, 30),
	(95, 35),
	(95, 46),
	(95, 18),
	(95, 43),
	(95, 37),
	(95, 17),
	(96, 34),
	(96, 37),
	(96, 23),
	(96, 41),
	(96, 19),
	(96, 3),
	(96, 7),
	(96, 14),
	(96, 48),
	(97, 48),
	(97, 50),
	(97, 11),
	(98, 11),
	(98, 20),
	(98, 32),
	(98, 18),
	(99, 1),
	(99, 48),
	(99, 32),
	(99, 41),
	(99, 2),
	(99, 15),
	(99, 14),
	(99, 13),
	(99, 42),
	(100, 30),
	(100, 6),
	(100, 9),
	(100, 37),
	(100, 31),
	(100, 22),
	(100, 48);

	CREATE TABLE books_has_genres (
		book_id INT(11) NOT NULL,
		genre_id INT(11) NOT NULL,
		PRIMARY KEY (book_id, genre_id),
		FOREIGN KEY (book_id) REFERENCES books (book_id) ON DELETE CASCADE,
		FOREIGN KEY (genre_id) REFERENCES genres (genre_id) ON DELETE CASCADE
	);

	INSERT INTO books_has_genres (book_id, genre_id)
	VALUES (1, 4),
	(2, 5),
	(3, 7),
	(4, 1),
	(5, 7),
	(6, 4),
	(7, 2),
	(7, 8),
	(8, 4),
	(9, 3),
	(10, 8),
	(11, 1),
	(11, 11),
	(11, 4),
	(12, 11),
	(13, 9),
	(14, 11),
	(15, 6),
	(16, 1),
	(17, 11),
	(18, 4),
	(18, 1),
	(19, 11),
	(19, 7),
	(19, 3),
	(20, 11),
	(21, 12),
	(22, 2),
	(23, 6),
	(24, 11),
	(25, 8),
	(26, 7),
	(26, 8),
	(26, 1),
	(27, 8),
	(27, 2),
	(28, 12),
	(29, 1),
	(30, 8),
	(31, 1),
	(31, 5),
	(31, 11),
	(32, 10),
	(33, 11),
	(34, 3),
	(35, 9),
	(36, 3),
	(36, 9),
	(36, 8),
	(37, 6),
	(37, 2),
	(38, 8),
	(38, 5),
	(38, 1),
	(39, 12),
	(39, 11),
	(40, 2),
	(41, 1),
	(42, 10),
	(43, 1),
	(44, 4),
	(44, 8),
	(44, 9),
	(45, 2),
	(46, 3),
	(47, 1),
	(48, 3),
	(49, 9),
	(50, 11),
	(51, 7),
	(52, 9),
	(53, 3),
	(54, 9),
	(54, 6),
	(55, 5),
	(56, 7),
	(57, 4),
	(58, 6),
	(59, 3),
	(59, 10),
	(60, 12),
	(61, 11),
	(62, 9),
	(63, 5),
	(64, 12),
	(65, 6),
	(66, 2),
	(67, 10),
	(68, 3),
	(69, 8),
	(70, 12),
	(71, 5),
	(72, 2),
	(72, 12),
	(73, 4),
	(74, 4),
	(74, 8),
	(75, 3),
	(76, 9),
	(77, 4),
	(78, 1),
	(79, 12),
	(80, 4),
	(81, 6),
	(82, 8),
	(83, 1),
	(84, 5),
	(85, 4),
	(86, 9),
	(87, 2),
	(88, 5),
	(89, 12),
	(90, 10),
	(91, 3),
	(92, 11),
	(93, 4),
	(94, 10),
	(95, 11),
	(96, 10),
	(97, 12),
	(98, 4),
	(99, 11),
	(100, 8);

	SET FOREIGN_KEY_CHECKS=1;
	COMMIT;
END //
DELIMITER ;

