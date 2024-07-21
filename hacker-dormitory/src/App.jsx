import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import ResidentsList from './components/ResidentsList';
import Error from './components/Error';

function App() {
    const [residents, setResidents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedResidents = JSON.parse(localStorage.getItem('residents')) || [];
        setResidents(savedResidents);
    }, []);

    useEffect(() => {
        localStorage.setItem('residents', JSON.stringify(residents));
    }, [residents]);

    const handleAddResident = (studentName, setError) => {
        if (residents.some(resident => resident.name === studentName)) {
            setError(`Sorry, ${studentName} is already present in the residents list!`);
            return;
        }

        setResidents([...residents, { name: studentName }]);
        setError('');
    };

    return (
        <div className="layout-column justify-content-center align-items-center w-100">
            <Search onAddResident={handleAddResident} />
            {error && <Error message={error} />}
            <ResidentsList residents={residents.map(resident => resident.name)} />
        </div>
    );
}

export default App;
