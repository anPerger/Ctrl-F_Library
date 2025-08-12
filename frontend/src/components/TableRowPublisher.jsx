import DeletePublisherForm from './DeletePublisherForm';
import UpdatePublisherForm from '../components/UpdatePublisherForm';

const TableRowPublisher = ({ rowObject, backendURL, refreshPublishers }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <UpdatePublisherForm rowObject={rowObject} backendURL={backendURL} refreshPublishers={refreshPublishers} />  
            <DeletePublisherForm rowObject={rowObject} backendURL={backendURL} refreshPublishers={refreshPublishers} />
        </tr>
    );
};

export default TableRowPublisher;