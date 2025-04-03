import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import './UserForm.css';

// Define types for API responses
interface State {
    adminCode1: string;
    name: string;
}

interface City {
    name: string;
}

const UserForm: React.FC = () => {
    const navigate = useNavigate();

    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState<number | ''>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    // Fetch countries on component mount
    useEffect(() => {
        // You can use a static list of countries or fetch from an API
        const staticCountries = [
            { code: 'IN', name: 'India' },
            // Add more countries as needed
        ];
        setCountries(staticCountries);
    }, []);

    // Fetch states for the selected country
    useEffect(() => {
        if (country) {
            axios.get(`http://api.geonames.org/childrenJSON`, {
                params: {
                    geonameId: country === 'US' ? 6252001 : 1269750, // Example geonameId for US and India
                    username: 'iamkavinnn0909', // Replace with your GeoNames username
                },
            })
            .then(response => {
                setStates(response.data.geonames);
            })
            .catch(error => {
                console.error('Error fetching states:', error);
            });
        }
    }, [country]);

    // Fetch cities for the selected state
    useEffect(() => {
        if (country && state) {
            axios.get(`http://api.geonames.org/searchJSON`, {
                params: {
                    country: country,
                    adminCode1: state,
                    maxRows: 10, // Limit the number of cities returned
                    username: 'iamkavinnn0909', // Replace with your GeoNames username
                },
            })
            .then(response => {
                setCities(response.data.geonames);
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
            });
        }
    }, [country, state]);

    const handleBackClick = () => {
        navigate('/');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const requestData = {
            country,
            state,
            city,
            month: new Date().toLocaleString('default', { month: 'long' }),
            area,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/predict-crop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                navigate('/dashboard', { state: { result } });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error during fetch:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="user-form-container">
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4 text-green">User Information</h2>
                <form onSubmit={handleSubmit} className="form-card">
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label text-green">Country</label>
                        <select
                            className="form-control"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label text-green">State</label>
                        <select
                            className="form-control"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            disabled={!country}
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state.adminCode1} value={state.adminCode1}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label text-green">City</label>
                        <select
                            className="form-control"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            disabled={!state}
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="area" className="form-label text-green">Area of Land (in hectares)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="area"
                            placeholder="Enter area in hectares"
                            value={area}
                            onChange={(e) => setArea(Number(e.target.value))}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={handleBackClick} disabled={isLoading}>
                            Back
                        </button>
                        <button type="submit" className="btn btn-primary-green" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;