import DeleteBookGenreForm from './DeleteBookGenreForm';
import UpdateBookGenreForm from './UpdateBookGenreForm';

const TableRowBookGenre = ({ genres, rowObject, backendURL, refreshBookGenres }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <UpdateBookGenreForm rowObject={rowObject} genres={genres} backendURL={backendURL} refreshBookGenres={refreshBookGenres} />
            <DeleteBookGenreForm rowObject={rowObject} backendURL={backendURL} refreshBookGenres={refreshBookGenres} />
        </tr>
    );
};

export default TableRowBookGenre;