import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const REGEX_PATTERN = {
    regexMobileNumber: /^[1-9]{1}[0-9]{9}$/,
}

function AddEditUser({ selectedUser, onSave, onCancel, showAlert, setShowAlert }) {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '' });

    useEffect(() => {
        if (selectedUser) {
            setFormData(selectedUser);
        } else {
            setFormData({ firstName: '', lastName: '', phone: '' });
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCancel = () => {
        if (!formData.firstName && !formData.lastName && !formData.phone) {
            return;
        }
        setFormData({ firstName: '', lastName: '', phone: '' });
        setShowAlert(false);
        onCancel();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, phone } = formData;

        if (!firstName || !lastName || !phone || !REGEX_PATTERN.regexMobileNumber.test(phone)) {
            setShowAlert(true);
            return;
        }

        onSave(formData);
        setFormData({ firstName: '', lastName: '', phone: '' });
        setShowAlert(false);
    };

    return (
        <section>
            <div className='pa-30'>
                <form onSubmit={handleSubmit} noValidate='noValidate'>
                    <div className='layout-column mb-15'>
                        <label htmlFor='firstName' className='mb-3'>First Name</label>
                        <input type='text' placeholder='Enter first name'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            required data-testid='firstNameInput' />
                    </div>
                    <div className='layout-column mb-15'>
                        <label htmlFor='lastName' className='mb-3'>Last Name</label>
                        <input type='text' placeholder='Enter last name'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                            required data-testid='lastNameInput' />
                    </div>
                    <div className='layout-column mb-15'>
                        <label htmlFor='phone' className='mb-3'>Phone Number</label>
                        <input type='text' placeholder='Enter phone number'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            required data-testid='phoneInput' />
                    </div>
                    {showAlert && (
                        <div className='alert error mb-30' data-testid='validationAlert'>
                            Error: All fields are mandatory. And phone number to be of 10 digits.
                        </div>
                    )}
                    <div className='layout-row justify-content-end'>
                        <button type='button' className='' data-testid='cancelEditUserButton' onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type='submit' className='mx-0' data-testid='addEditButton'>
                            Add/Edit User
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

AddEditUser.propTypes = {
    selectedUser: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phone: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    showAlert: PropTypes.bool.isRequired,
    setShowAlert: PropTypes.func.isRequired,
};

export default AddEditUser;
