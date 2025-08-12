import DeleteLocationForm from './DeleteLocationForm';
import UpdateLocationForm from '../components/UpdateLocationForm';

const TableRowLocation = ({ rowObject, backendURL, refreshLocations }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <UpdateLocationForm rowObject={rowObject} backendURL={backendURL} refreshLocations={refreshLocations} />
            <DeleteLocationForm rowObject={rowObject} backendURL={backendURL} refreshLocations={refreshLocations} />
        </tr>
    );
};


export default TableRowLocation;