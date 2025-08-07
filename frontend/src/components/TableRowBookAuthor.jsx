import DeleteBookAuthorForm from './DeleteBookAuthorForm';
import UpdateBookAuthorForm from './UpdateBookAuthorForm';

const TableRowBookAuthor = ({ authors, rowObject, backendURL, refreshBookAuthors }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <UpdateBookAuthorForm rowObject={rowObject} authors={authors} backendURL={backendURL} refreshBookAuthors={refreshBookAuthors} />
            <DeleteBookAuthorForm rowObject={rowObject} backendURL={backendURL} refreshBookAuthors={refreshBookAuthors} />
        </tr>
    );
};

export default TableRowBookAuthor;