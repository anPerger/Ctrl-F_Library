import DeleteBookLocationForm from './DeleteBookLocationForm';
import UpdateBookLocationForm from './UpdateBookLocationForm';

const TableRowBookLocation = ({ locations, rowObject, backendURL, refreshBookLocations }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <UpdateBookLocationForm rowObject={rowObject} locations={locations} backendURL={backendURL} refreshBookLocations={refreshBookLocations} />
            <DeleteBookLocationForm rowObject={rowObject} backendURL={backendURL} refreshBookLocations={refreshBookLocations} />
        </tr>
    );
};

export default TableRowBookLocation;