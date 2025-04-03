import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Spinner, Card, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from './Navbar'; // Assuming Navbar.tsx is in the same directory

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PredictionInput {
    crop_name: string;
    month: number;
    year: number;
}

interface PredictionOutput {
    crop_name: string;
    month: number;
    year: number;
    predicted_price: number;
}

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const PricePrediction: React.FC = () => {
    const [crops, setCrops] = useState<string[]>([]);
    const [selectedCrop, setSelectedCrop] = useState<string>('');
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [prediction, setPrediction] = useState<PredictionOutput | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch the list of crops from the backend
    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response = await axios.get<string[]>('http://127.0.0.1:8000/crops');
                setCrops(response.data);
            } catch (err) {
                setError('Failed to fetch crops. Please try again later.');
            }
        };
        fetchCrops();
    }, []);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setPrediction(null);
        setLoading(true);

        try {
            const inputData: PredictionInput = {
                crop_name: selectedCrop,
                month: month,
                year: year,
            };

            const response = await axios.post<PredictionOutput>(
                'http://127.0.0.1:8000/predict',
                inputData
            );

            setPrediction(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.detail || 'An error occurred while fetching the prediction.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Chart data for prediction visualization
    const chartData = {
        labels: ["Predicted Price"],
        datasets: [
            {
                label: `${selectedCrop || "Crop"} Price (₹)`,
                data: [prediction?.predicted_price || 0],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Predicted Crop Price",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Price (₹)",
                },
            },
        },
    };

    return (
        <div className="bg-gradient-to-r from-green-100 to-white min-vh-100">
            <Navbar />
            <Container className="py-5">
                <Row className="justify-content-center mb-5">
                    <Col md={10} lg={8}>
                        <div className="text-center mb-4">
                            <h1 className="display-4 fw-bold text-success">
                                <i className="bi bi-graph-up-arrow me-2"></i>
                                Crop Price Prediction
                            </h1>
                            <p className="lead text-muted">Forecast agricultural commodity prices with our advanced prediction model</p>
                            <hr className="my-4" />
                        </div>

                        <Row>
                            <Col lg={6} className="mb-4">
                                <Card className="shadow-sm border-0 h-100">
                                    <Card.Header className="bg-success text-white">
                                        <h4 className="mb-0">
                                            <i className="bi bi-input-cursor-text me-2"></i>
                                            Input Parameters
                                        </h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form onSubmit={handleSubmit}>
                                            {/* Crop Selection Dropdown */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <i className="bi bi-flower1 me-2"></i>
                                                    Select Crop
                                                </Form.Label>
                                                <Form.Select
                                                    value={selectedCrop}
                                                    onChange={(e) => setSelectedCrop(e.target.value)}
                                                    required
                                                    className="border-success"
                                                >
                                                    <option value="" disabled>Select a crop</option>
                                                    {crops.map((crop) => (
                                                        <option key={crop} value={crop}>
                                                            {crop}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            {/* Month Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    <i className="bi bi-calendar-month me-2"></i>
                                                    Month
                                                </Form.Label>
                                                <Form.Select
                                                    value={month}
                                                    onChange={(e) => setMonth(parseInt(e.target.value))}
                                                    required
                                                    className="border-success"
                                                >
                                                    {monthNames.map((name, index) => (
                                                        <option key={name} value={index + 1}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            {/* Year Input */}
                                            <Form.Group className="mb-4">
                                                <Form.Label>
                                                    <i className="bi bi-calendar-date me-2"></i>
                                                    Year
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    min="2012"
                                                    max="2030"
                                                    value={year}
                                                    onChange={(e) => setYear(parseInt(e.target.value))}
                                                    required
                                                    className="border-success"
                                                />
                                            </Form.Group>

                                            {/* Submit Button */}
                                            <div className="d-grid">
                                                <Button variant="success" type="submit" disabled={loading} className="py-2" size="lg">
                                                    {loading ? (
                                                        <>
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                                className="me-2"
                                                            />
                                                            Predicting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="bi bi-calculator me-2"></i>
                                                            Predict Price
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col lg={6} className="mb-4">
                                <Card className="shadow-sm border-0 h-100">
                                    <Card.Header className="bg-success text-white">
                                        <h4 className="mb-0">
                                            <i className="bi bi-bar-chart-fill me-2"></i>
                                            Prediction Results
                                        </h4>
                                    </Card.Header>
                                    <Card.Body className="d-flex flex-column justify-content-center">
                                        {loading && (
                                            <div className="text-center py-5">
                                                <Spinner animation="border" variant="success" style={{ width: "3rem", height: "3rem" }} />
                                                <p className="mt-3 text-muted">Analyzing market data and generating prediction...</p>
                                            </div>
                                        )}

                                        {error && (
                                            <Alert variant="danger" className="mb-0">
                                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                                {error}
                                            </Alert>
                                        )}

                                        {prediction && !loading && !error && (
                                            <div className="text-center">
                                                <div className="mb-4">
                                                    <h5 className="text-muted mb-3">Predicted Price for</h5>
                                                    <h3 className="fw-bold text-success mb-1">{prediction.crop_name}</h3>
                                                    <p className="text-muted">
                                                        {monthNames[prediction.month - 1]} {prediction.year}
                                                    </p>

                                                    <div className="d-flex justify-content-center align-items-center my-4">
                                                        <div className="display-4 fw-bold text-success">₹{prediction.predicted_price.toFixed(2)}</div>
                                                        <div className="ms-2 badge bg-success">per quintal</div>
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <Bar data={chartData} options={chartOptions} />
                                                </div>
                                            </div>
                                        )}

                                        {!prediction && !loading && !error && (
                                            <div className="text-center py-5 text-muted">
                                                <i className="bi bi-arrow-left-circle fs-1 mb-3"></i>
                                                <p>Fill out the form and click "Predict Price" to see the results here.</p>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <div className="mt-4 p-3 bg-light rounded-3">
                            <h5>
                                <i className="bi bi-info-circle me-2"></i>
                                About This Tool
                            </h5>
                            <p className="text-muted mb-0">
                                Our crop price prediction tool uses advanced machine learning algorithms to analyze historical price data,
                                seasonal trends, and market conditions to forecast future agricultural commodity prices. This helps
                                farmers and traders make informed decisions about planting, harvesting, and selling their crops.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PricePrediction;