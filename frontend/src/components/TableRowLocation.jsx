import DeleteLocationForm from './DeleteLocationForm';

const TableRowLocation = ({ rowObject, backendURL, refreshLocations }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteLocationForm rowObject={rowObject} backendURL={backendURL} refreshLocations={refreshLocations} />
        </tr>
    );
};

export default TableRowLocation;