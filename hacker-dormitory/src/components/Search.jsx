import React, { useState } from 'react';
import { STUDENTS } from '../../studentList';

function Search({ onAddResident }) {
    const [studentName, setStudentName] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [error, setError] = useState('');

    const handleAdd = () => {
        if (!studentName || !joiningDate) {
            setError('Please enter all the fields');
            return;
        }

        const student = STUDENTS.find(
            (student) => student.name.toLowerCase() === studentName.toLowerCase()
        );

        if (!student) {
            setError(`Sorry, ${studentName} is not a verified student!`);
            return;
        }

        const joiningDateObj = new Date(joiningDate);
        const validityDateObj = new Date(student.validityDate);

        if (validityDateObj < joiningDateObj) {
            setError(`Sorry, ${studentName}'s validity has Expired!`);
            return;
        }

        onAddResident(studentName, setError);

        setStudentName('');
        setJoiningDate('');
    };

    return (
        <div className="my-50 layout-row align-items-end justify-content-end">
            <label htmlFor="studentName">Student Name:
                <div>
                    <input
                        id="studentName"
                        data-testid="studentName"
                        type="text"
                        className="mr-30 mt-10"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                    />
                </div>
            </label>
            <label htmlFor="joiningDate">Joining Date:
                <div>
                    <input
                        id="joiningDate"
                        data-testid="joiningDate"
                        type="date"
                        className="mr-30 mt-10"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                    />
                </div>
            </label>
            <button
                type="button"
                data-testid="addBtn"
                className="small mb-0"
                onClick={handleAdd}
            >
                Add
            </button>
            {error && (
                <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">
                    {error}
                </div>
            )}
        </div>
    );
}

export default Search;
