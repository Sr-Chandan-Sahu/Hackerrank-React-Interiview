import React, { useState } from 'react';
import './App.css';
// import 'h8k-components';
import UserList from './components/UserList';
import AddEditUser from './components/AddEditUser';

const title = 'User Management';

const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleSave = (user) => {
        if (selectedUserIndex !== null) {
            const updatedUsers = users.map((u, index) => index === selectedUserIndex ? user : u);
            setUsers(updatedUsers);
            setSelectedUserIndex(null);
        } else {
            setUsers([...users, user]);
        }
    };

    const handleEdit = (index) => {
        setSelectedUserIndex(index);
    };

    const handleDelete = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        if (index === selectedUserIndex) {
            setSelectedUserIndex(null);
        }
    };

    const handleCancel = () => {
        setSelectedUserIndex(null);
    };

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className='layout-row justify-content-center mt-100'>
                <div className='w-60 mr-75'>
                    <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
                <div className='layout-column w-40'>
                    <AddEditUser
                        selectedUser={selectedUserIndex !== null ? users[selectedUserIndex] : null}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
