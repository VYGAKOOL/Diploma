import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function VisitForm() {
    const { petId } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState(null);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(`/api/pets/${petId}`)
            .then(response => {
                setPet(response.data);
            })
            .catch(err => {
                console.error(`Помилка завантаження pet з id=${petId}:`, err);
                setError('Не вдалося завантажити дані pet');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [petId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!date || !description) {
            setError('Будь ласка, вкажіть дату та опис візиту.');
            setLoading(false);
            return;
        }

        const payload = {
            date: date,
            description: description
        };

        axios.post(`/api/pets/${petId}/visits`, payload)
            .then(response => {
                navigate(`/pets`);
            })
            .catch(err => {
                console.error('Помилка створення візиту:', err);
                setError('Не вдалося створити візит');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Add Visit</h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {loading && !pet && (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && pet === null && (
                <div className="alert alert-warning" role="alert">
                    Pet not found.
                </div>
            )}

            {!loading && pet && (
                <div className="card">
                    <div className="card-header">
                        <strong>Pet:</strong> {pet.name} (Owner: {pet.owner.firstName} {pet.owner.lastName})
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label className="form-label">Date *</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Description *</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Add Visit'}
                            </button>
                            {' '}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VisitForm;
