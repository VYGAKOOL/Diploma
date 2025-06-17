import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Pets() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = () => {
        setLoading(true);
        setError(null);
        axios
            .get('/api/pets')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setPets(response.data);
                } else {
                    console.warn('Очікував масив pets, але отримав:', response.data);
                    setPets([]);
                }
            })
            .catch(err => {
                console.error('Помилка при GET /api/pets:', err);
                setError('Не вдалося завантажити pets');
                setPets([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Pets</h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Birth Date</th>
                            <th>Type</th>
                            <th>Owner</th>
                                           <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pets.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No pets found.
                                </td>
                            </tr>
                        )}
                        {pets.map((pet, index) => (
                            <tr key={pet.id}>
                                <td>{index + 1}</td>
                                <td>{pet.name}</td>
                                <td>{pet.type ? pet.type.name : '-'}</td>
                                <td>
                                    {pet.owner
                                        ? `${pet.owner.firstName} ${pet.owner.lastName}`
                                        : '-'}
                                </td>
                                <td>
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => navigate(`/pets/${pet.id}/visits/new`)}>
                                    Add Visit
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
</div>
);
}

export default Pets;
