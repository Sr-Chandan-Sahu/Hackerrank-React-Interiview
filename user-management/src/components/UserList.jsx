import React from 'react';
import PropTypes from 'prop-types';

function UserList({ users, onEdit, onDelete }) {
    return (
        <section>
            <h3 className='p-3 text-center'>Users</h3>
            <table className="table table-striped table-bordered" data-testid='userListTable'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="4" className='text-center'>No users available</td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button type='button' onClick={() => onEdit(index)}>
                                        Edit
                                    </button>
                                    <button type='button' onClick={() => onDelete(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    })).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserList;
