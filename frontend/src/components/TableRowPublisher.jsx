import DeletePublisherForm from './DeletePublisherForm';

const TableRowPublisher = ({ rowObject, backendURL, refreshPublishers }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeletePublisherForm rowObject={rowObject} backendURL={backendURL} refreshPublishers={refreshPublishers} />
        </tr>
    );
};

export default TableRowPublisher;