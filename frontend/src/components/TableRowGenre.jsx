import DeleteGenreForm from './DeleteGenreForm';
import UpdateGenreForm from '../components/UpdateGenreForm';

const TableRowGenre = ({ rowObject, backendURL, refreshGenres }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <UpdateGenreForm rowObject={rowObject} backendURL={backendURL} refreshGenres={refreshGenres} /> 
            <DeleteGenreForm rowObject={rowObject} backendURL={backendURL} refreshGenres={refreshGenres} />
        </tr>
    );
};

export default TableRowGenre;