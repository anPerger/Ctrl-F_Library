import DeleteAuthorForm from './DeleteAuthorForm';
import UpdateAuthorForm from '../components/UpdateAuthorForm';

const TableRowAuthor = ({ rowObject, backendURL, refreshAuthors }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <UpdateAuthorForm rowObject={rowObject} backendURL={backendURL} refreshAuthors={refreshAuthors}  />
            <DeleteAuthorForm rowObject={rowObject} backendURL={backendURL} refreshAuthors={refreshAuthors} />
        </tr>
    );
};

export default TableRowAuthor;