import DeleteBookForm from './DeleteBookForm';
import UpdateBookForm from '../components/UpdateBookForm';

const TableRowBook = ({ rowObject, publishers, backendURL, refreshBooks }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <UpdateBookForm rowObject={rowObject} publishers={publishers} backendURL={backendURL} refreshBooks={refreshBooks} />
            <DeleteBookForm rowObject={rowObject} backendURL={backendURL} refreshBooks={refreshBooks} />
        </tr>
    );
};

export default TableRowBook;