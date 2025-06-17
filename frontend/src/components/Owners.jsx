import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Owners() {
    const [owners, setOwners] = useState([]);
    const [newOwner, setNewOwner] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        telephone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOwners();
    }, []);

    const fetchOwners = () => {
        setLoading(true);
        setError(null);
        axios
            .get('/api/owners')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setOwners(response.data);
                } else {
                    console.warn('Очікував масив, але отримав:', response.data);
                    setOwners([]);
                }
            })
            .catch(err => {
                console.error('Помилка при GET /api/owners:', err);
                setError('Не вдалося завантажити власників');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOwner(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddOwner = (e) => {
        e.preventDefault();      // зупинити перезавантаження форми
        setLoading(true);
        setError(null);

        if (!newOwner.firstName || !newOwner.lastName || !newOwner.telephone) {
            setError('First Name, Last Name та Telephone обовʼязкові.');
            setLoading(false);
            return;
        }

        axios
            .post('/api/owners', newOwner)
            .then(response => {
                const created = response.data;
                setOwners(prev => [...prev, created]);
                setNewOwner({
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    telephone: ''
                });
            })
            .catch(err => {
                console.error('Помилка створення власника:', err);
                setError('Не вдалося створити власника');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteOwner = (id) => {
        if (!window.confirm('Ви справді бажаєте видалити цього власника?')) {
            return;
        }
        setLoading(true);
        setError(null);
        axios
            .delete(`/api/owners/${id}`)
            .then(() => {
                setOwners(prev => prev.filter(owner => owner.id !== id));
            })
            .catch(err => {
                console.error(`Помилка видалення власника з id=${id}:`, err);
                setError('Не вдалося видалити власника');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Owners</h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="card mb-4">
                <div className="card-header">Add New Owner</div>
                <div className="card-body">
                    <form onSubmit={handleAddOwner}>
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    value={newOwner.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={newOwner.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={newOwner.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    value={newOwner.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-3">
                                <label className="form-label">Telephone *</label>
                                <input
                                    type="text"
                                    name="telephone"
                                    className="form-control"
                                    value={newOwner.telephone}
                                    onChange={handleInputChange}
                                    placeholder="Telephone"
                                    required
                                />
                            </div>
                            <div className="col-md-3 d-flex align-items-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Add Owner'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Telephone</th>
                        <th>Pets</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {owners.length === 0 && !loading && (
                        <tr>
                            <td colSpan="7" className="text-center">No owners found.</td>
                        </tr>
                    )}
                    {loading && (
                        <tr>
                            <td colSpan="7" className="text-center">Loading...</td>
                        </tr>
                    )}
                    {owners.map((owner, idx) => (
                        <tr key={owner.id}>
                            <td>{idx + 1}</td>
                            <td>
                                {owner.firstName} {owner.lastName}
                            </td>
                            <td>{owner.address || '-'}</td>
                            <td>{owner.city || '-'}</td>
                            <td>{owner.telephone}</td>
                            <td>
                                {owner.pets && owner.pets.length > 0
                                    ? owner.pets.map(pet => pet.name).join(', ')
                                    : 'none'}
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteOwner(owner.id)}
                                    disabled={loading}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Owners;
