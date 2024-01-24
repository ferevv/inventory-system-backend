import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userVerification from '../../../utils/userVerification';
import { API } from '../../../env';
import '../../../styles/new-edit-form.css';

const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phoneNumber: '',
        email: '',
        address: '',
        state: '',
        city: ''
    });

    useEffect(() => {
        // Permission validation
        if (!userVerification().isAuthenticated) {
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Query data
        (async () => {
            const url = new URL(`${API}/api/v1/customer/${id}`);
            await fetch(url)
                .then(response => response.json())
                .then(data => setFormData({
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    address: data.address,
                    state: data.state,
                    city: data.city
                }))
                .catch(error => console.log(error))
        })();
    }, [id, navigate]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API}/api/v1/customer/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Cliente actualizado exitosamente');
                navigate('/customers');
                return;
            }
            alert("El cliente no pudo ser actualizado, verifique los datos");
        } catch (error) {
            console.log(error);
            alert("Error al actualizar el cliente");
        }
    }

    return (
        <div className="editCustomer-container">

            <div className="text">Editar Cliente</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="grid-form">
                        <div className="form-item">
                            <label htmlFor="phoneNumber">Teléfono</label>
                            <input
                                className="input"
                                type="text"
                                id="phoneNumber"
                                maxLength="20"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="email">Correo</label>
                            <input
                                className="input"
                                type="email"
                                id="email"
                                maxLength="100"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="two-together">
                            <div className="form-item">
                                <label htmlFor="state">Departamento</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="state"
                                    maxLength="45"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-item">
                                <label htmlFor="city">Ciudad</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="city"
                                    maxLength="45"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="address">Dirección</label>
                            <input
                                className="input"
                                type="text"
                                id="address"
                                maxLength="100"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="button-container">
                        <button className="btn" type="submit">
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditCustomer;
