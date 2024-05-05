import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table, Button} from 'react-bootstrap';

function ListAccount() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        axios.get('http://localhost:8080/api/admin')
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }

    const toggleStatus = (accountId) => {
        axios.post(`http://localhost:8080/api/admin/${accountId}`,)
            .then(response => {
                console.log(response)
                getAll();
            })
            .catch(error => {
                console.error('Error toggling account status:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-uppercase mb-4">List of Accounts</h1>
            <Table striped bordered hover style={{fontSize: '17px'}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {accounts.map(account => (
                    <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.username}</td>
                        <td>{account.email}</td>
                        <td>{account.status}</td>
                        <td className="text-center">
                            <Button variant={account.status === 'active' ? 'danger' : 'success'}
                                    onClick={() => toggleStatus(account.id)}>
                                {account.status === 'active' ? 'Block' : 'Activate'}
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ListAccount;
