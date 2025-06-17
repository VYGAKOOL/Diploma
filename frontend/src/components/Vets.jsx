import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Vets() {
    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVets();
    }, []);

    // Функція GET /api/vets
    const fetchVets = () => {
        setLoading(true);
        setError(null);
        axios
            .get('/api/vets')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setVets(response.data);
                } else {
                    console.warn('Очікував масив vets, але отримав:', response.data);
                    setVets([]);
                }
            })
            .catch(err => {
                console.error('Помилка при GET /api/vets:', err);
                setError('Не вдалося завантажити ветеринарів');
                setVets([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Veterinarians</h2>

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

            {/* Таблиця ветеринарів */}
            {!loading && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Specialties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vets.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No veterinarians found.
                                </td>
                            </tr>
                        )}
                        {vets.map((vet, index) => (
                            <tr key={vet.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {vet.firstName} {vet.lastName}
                                </td>
                                <td>
                                    {vet.specialties && vet.specialties.length > 0
                                        ? vet.specialties.map(s => s.name).join(', ')
                                        : '-'}
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

export default Vets;
