import type React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";
import { BarChart2, User, ClipboardList, TrendingUp, Layers, DollarSign, Award } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Card className="shadow border-0 p-4">
          <Card.Body className="text-center">
            <h3 className="text-secondary mb-3">No Data Available</h3>
            <p className="text-muted">Please submit crop analysis to view results</p>
          </Card.Body>
        </Card>
      </div>
    );
  }

  const formatIndianNumber = (number: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(number);
  };

  // Use the top 3 crops from the result
  const comparisonData = [
    { crop: result.best_crop.crop, yield: result.best_crop.yield_per_hectare },
    { crop: result.second_best_crop.crop, yield: result.second_best_crop.yield_per_hectare },
    { crop: result.third_best_crop.crop, yield: result.third_best_crop.yield_per_hectare },
  ];

  // Green color palette
  const colors = {
    primary: "#28a745", // Green
    secondary: "#218838", // Darker Green
    accent: "#1e7e34", // Even Darker Green
    highlight: "#155724", // Darkest Green
    light: "#d4edda", // Light Green
    backgroundGradient: "linear-gradient(135deg, rgba(40,167,69,0.8) 0%, rgba(33,136,56,0.8) 100%)", // Green Gradient
  };

  const chartData = {
    labels: comparisonData.map((item) => item.crop),
    datasets: [
      {
        label: "Estimated Yield per Hectare (Quintals)",
        data: comparisonData.map((item) => item.yield),
        backgroundColor: [colors.primary, colors.secondary, colors.accent],
        borderColor: [colors.primary, colors.secondary, colors.accent],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#495057",
          font: {
            size: 12,
            weight: "bold" as const,
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Crop Yield Comparison",
        color: "#212529",
        font: {
          size: 18,
          weight: "bold" as const,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#212529",
        bodyColor: "#495057",
        borderColor: "#e9ecef",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
          font: {
            weight: "bold" as const,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          dash: [4, 4],
        },
      },
    },
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <Navbar />
      <Container fluid className="px-0">
        <Row className="g-0">
          {/* Sidebar */}
          <Col md={2} className="bg-white shadow-sm min-vh-100 p-0">
            <div className="p-3 bg-primary text-white text-center">
              <h5 className="mb-0">Farm Analytics</h5>
            </div>
            <ListGroup variant="flush" className="border-radius-0">
              <ListGroup.Item className="py-3 border-0 d-flex align-items-center" active>
                <BarChart2 size={18} className="me-2" /> Dashboard
              </ListGroup.Item>
              <ListGroup.Item className="py-3 border-0 d-flex align-items-center">
                <User size={18} className="me-2" /> Account
              </ListGroup.Item>
              <ListGroup.Item className="py-3 border-0 d-flex align-items-center">
                <ClipboardList size={18} className="me-2" /> Weather
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Main Content */}
          <Col md={10} className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0 fw-bold text-dark">Crop Analysis Dashboard</h2>
              <Badge bg="primary" className="p-2">
                Last Updated: {new Date().toLocaleDateString()}
              </Badge>
            </div>

            {/* Stats Cards */}
            <Row className="g-4 mb-4">
              <Col md={3}>
                <Card className="h-100 shadow-sm border-0 hover-lift">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle p-2 me-3" style={{ backgroundColor: "rgba(40, 167, 69, 0.1)" }}>
                        <Award size={24} className="text-success" />
                      </div>
                      <Card.Title className="mb-0 fs-6 text-muted">Best Crop</Card.Title>
                    </div>
                    <h3 className="fw-bold text-success">{result.best_crop.crop}</h3>
                    <Card.Text className="text-muted small mt-2">Recommended based on Past Data</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card className="h-100 shadow-sm border-0 hover-lift">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle p-2 me-3" style={{ backgroundColor: "rgba(33, 136, 56, 0.1)" }}>
                        <TrendingUp size={24} className="text-secondary" style={{ color: colors.secondary }} />
                      </div>
                      <Card.Title className="mb-0 fs-6 text-muted">Estimated Yield</Card.Title>
                    </div>
                    <h3 className="fw-bold" style={{ color: colors.secondary }}>
                      {formatIndianNumber(result.best_crop.yield_per_hectare)}
                    </h3>
                    <Card.Text className="text-muted small mt-2">Quintals per hectare</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card className="h-100 shadow-sm border-0 hover-lift">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle p-2 me-3" style={{ backgroundColor: "rgba(30, 126, 52, 0.1)" }}>
                        <Layers size={24} className="text-accent" style={{ color: colors.accent }} />
                      </div>
                      <Card.Title className="mb-0 fs-6 text-muted">Price per Quintal</Card.Title>
                    </div>
                    <h3 className="fw-bold" style={{ color: colors.accent }}>
                      ₹{formatIndianNumber(result.best_crop.price_per_quintal)}
                    </h3>
                    <Card.Text className="text-muted small mt-2">Current market price</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card className="h-100 shadow-sm border-0" style={{ background: colors.backgroundGradient }}>
                  <Card.Body className="p-4 text-white">
                    <div className="d-flex align-items-center mb-3">
                      <div className="rounded-circle bg-white p-2 me-3">
                        <DollarSign size={24} style={{ color: colors.primary }} />
                      </div>
                      <Card.Title className="mb-0 fs-6">Total Revenue</Card.Title>
                    </div>
                    <h3 className="fw-bold">
                      ₹
                      {result.best_crop.total_revenue.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </h3>
                    <Card.Text className="small mt-2 text-white text-opacity-75">Estimated per hectare</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Chart */}
            <Row>
              <Col md={12}>
                <Card className="shadow-sm border-0 mb-4">
                  <Card.Body className="p-4">
                    <div style={{ height: "400px" }}>
                      <Bar data={chartData} options={options} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;