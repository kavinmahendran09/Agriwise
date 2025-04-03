"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import "./landing.css"
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaRobot, FaStore, FaArrowRight } from "react-icons/fa"

const Landing = () => {
  const navigate = useNavigate();


  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <img src="src/assets/Logo.png" alt="Agriwise Logo" style={{ height: '70px' }} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item ms-lg-3">
                <a className="btn btn-outline-success" href="/user-form">
                  Dashboard
                </a>
              </li>
              <li className="nav-item ms-lg-2">
                <a className="btn btn-success" href="chatbot">
                  Chatbot
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-light text-success mb-3 px-3 py-2">Transforming Agriculture</span>
              <h1 className="display-4 fw-bold mb-3">Smart Farming Solutions for Modern Agriculture</h1>
              <p className="lead mb-4 opacity-90">
                AgriWise empowers farmers with AI-driven insights, market access, and multilingual support to maximize
                profits and sustainability.
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-light btn-lg px-4 fw-semibold">Get Started</button>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0 text-center">
              <div className="position-relative">
                <img
                  src="src/assets/Logo_2.png"
                  alt="AgriWise Dashboard"
                  className="img-fluid rounded-lg hero-image shadow-lg"
                />
                <div className="hero-shape"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Key Features Section */}
      <section className="py-5 key-features">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">Core Features</span>
            <h2 className="display-5 fw-bold">Powerful Tools for Agricultural Success</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Our platform combines market access, price prediction, and multilingual support to revolutionize farming.
            </p>
          </div>

          <div className="row g-4">
            {/* Feature 1: Open Market */}
            <div className="col-md-4">
              <div className="card feature-card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="feature-icon-wrapper mb-4">
                    <div className="feature-icon bg-success-subtle text-success">
                      <FaStore size={28} />
                    </div>
                  </div>
                  <h3 className="h4 mb-3">Open Market Platform</h3>
                  <p className="text-muted mb-4">
                    List your crops directly to buyers, compare market prices in real-time, and sell at the best rates
                    without middlemen.
                  </p>
                  <ul className="feature-list">
                    <li>Direct farmer-to-buyer connections</li>
                    <li>Real-time price comparisons</li>
                    <li>Secure payment processing</li>
                  </ul>
                  <a href="/open-market" className="feature-link">
                    Explore Market <FaArrowRight size={14} className="ms-2" />
                  </a>
                </div>
              </div>
            </div>

            {/* Feature 2: Price Prediction */}
            <div className="col-md-4">
              <div className="card feature-card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="feature-icon-wrapper mb-4">
                    <div className="feature-icon bg-success-subtle text-success">
                      <FaChartLine size={28} />
                    </div>
                  </div>
                  <h3 className="h4 mb-3">Price Prediction Dashboard</h3>
                  <p className="text-muted mb-4">
                    AI-powered analytics forecast crop prices with up to 85% accuracy, helping you decide when to sell
                    for maximum profit.
                  </p>
                  <ul className="feature-list">
                    <li>Advanced price forecasting</li>
                    <li>Historical price analysis</li>
                    <li>Personalized selling recommendations</li>
                  </ul>
                  <a href="/user-form" className="feature-link">
                    View Dashboard <FaArrowRight size={14} className="ms-2" />
                  </a>
                </div>
              </div>
            </div>

            {/* Feature 3: Regional Chatbot */}
            <div className="col-md-4">
              <div className="card feature-card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="feature-icon-wrapper mb-4">
                    <div className="feature-icon bg-success-subtle text-success">
                      <FaRobot size={28} />
                    </div>
                  </div>
                  <h3 className="h4 mb-3">Regional Language Chatbot</h3>
                  <p className="text-muted mb-4">
                    Our RAG-powered chatbot understands and responds in 12 regional languages, providing instant farming
                    advice.
                  </p>
                  <ul className="feature-list">
                    <li>Voice and text support in 12 languages</li>
                    <li>Region-specific agricultural knowledge</li>
                    <li>24/7 instant expert assistance</li>
                  </ul>
                  <a href="/Chatbot" className="feature-link">
                    Try Chatbot <FaArrowRight size={14} className="ms-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">Intelligent Analytics</span>
              <h2 className="display-6 fw-bold mb-4">Make Data-Driven Farming Decisions</h2>
              <p className="text-muted mb-4">
                Our comprehensive dashboard provides real-time insights into market trends, price forecasts, and optimal
                selling periods.
              </p>

              <div className="d-flex mb-4">
                <div className="feature-check-icon me-3">
                  <FaChartLine />
                </div>
                <div>
                  <h4 className="h6 mb-2">Price Trend Analysis</h4>
                  <p className="text-muted small mb-0">
                    Track historical and predicted price movements for your crops.
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="feature-check-icon me-3">
                  <FaChartLine />
                </div>
                <div>
                  <h4 className="h6 mb-2">Market Demand Forecasting</h4>
                  <p className="text-muted small mb-0">Understand future demand patterns to plan your harvests.</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="feature-check-icon me-3">
                  <FaChartLine />
                </div>
                <div>
                  <h4 className="h6 mb-2">Profit Optimization</h4>
                  <p className="text-muted small mb-0">Get recommendations on when to sell for maximum returns.</p>
                </div>
              </div>

              <button className="btn btn-success mt-2 px-4" onClick={() => navigate('/user-form')}>Explore Dashboard</button>
            </div>
            <div className="col-lg-7">
              <div className="dashboard-preview">
                <img
                  src="src/assets/Dashboard.png"
                  alt="AgriWise Dashboard Preview"
                  className="img-fluid rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Demo Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2 mb-5 mb-lg-0">
              <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">Multilingual Support</span>
              <h2 className="display-6 fw-bold mb-4">Get Expert Advice in Your Language</h2>
              <p className="text-muted mb-4">
                Our RAG-powered chatbot breaks language barriers by providing agricultural expertise in 12 regional
                languages.
              </p>

              <div className="language-badges mb-4">
                <span className="badge bg-light text-dark me-2 mb-2">हिन्दी</span>
                <span className="badge bg-light text-dark me-2 mb-2">தமிழ்</span>
                <span className="badge bg-light text-dark me-2 mb-2">తెలుగు</span>
                <span className="badge bg-light text-dark me-2 mb-2">ಕನ್ನಡ</span>
                <span className="badge bg-light text-dark me-2 mb-2">मराठी</span>
                <span className="badge bg-light text-dark me-2 mb-2">ગુજરાતી</span>
                <span className="badge bg-light text-dark me-2 mb-2">ਪੰਜਾਬੀ</span>
                <span className="badge bg-light text-dark me-2 mb-2">বাংলা</span>
              </div>

              <div className="d-flex mb-4">
                <div className="feature-check-icon me-3">
                  <FaRobot />
                </div>
                <div>
                  <h4 className="h6 mb-2">Voice & Text Interaction</h4>
                  <p className="text-muted small mb-0">
                    Speak or type in your regional language for instant responses.
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="feature-check-icon me-3">
                  <FaRobot />
                </div>
                <div>
                  <h4 className="h6 mb-2">Contextual Understanding</h4>
                  <p className="text-muted small mb-0">
                    Our RAG system understands regional farming contexts and terminology.
                  </p>
                </div>
              </div>

              <button className="btn btn-success mt-2 px-4" onClick={() => navigate('/chatbot')}> Try Chatbot Now </button>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="chatbot-demo">
                <img
                  src="src/assets/Chatbot.png"
                  alt="AgriWise Chatbot Demo"
                  className="img-fluid rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Market Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">Direct Market Access</span>
              <h2 className="display-6 fw-bold mb-4">Sell Your Crops Directly to Buyers</h2>
              <p className="text-muted mb-4">
                Our Open Market platform connects farmers directly with buyers, eliminating middlemen and maximizing
                your profits with transparent pricing.
              </p>

              <div className="d-flex mb-4">
                <div className="feature-check-icon me-3">
                  <FaStore />
                </div>
                <div>
                  <h4 className="h6 mb-2">Set Your Own Price</h4>
                  <p className="text-muted small mb-0">
                    Choose between AI-recommended prices or set your own selling price.
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="feature-check-icon me-3">
                  <FaStore />
                </div>
                <div>
                  <h4 className="h6 mb-2">Direct Buyer Connections</h4>
                  <p className="text-muted small mb-0">
                    Connect with verified buyers from across the country and beyond.
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="feature-check-icon me-3">
                  <FaStore />
                </div>
                <div>
                  <h4 className="h6 mb-2">Secure Transactions</h4>
                  <p className="text-muted small mb-0">Our platform ensures timely payments and quality assurance.</p>
                </div>
              </div>

              <button className="btn btn-success mt-2 px-4" onClick={() => navigate('/open-market')}>List Your Crops</button>
            </div>
            <div className="col-lg-7">
              <div className="market-preview">
                <img
                  src="src/assets/Listing.png"
                  alt="AgriWise Open Market Preview"
                  className="img-fluid rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <span className="badge bg-light text-success px-3 py-2 mb-3">Get Started Today</span>
              <h2 className="display-5 fw-bold mb-3">Ready to Transform Your Farming Business?</h2>
              <p className="lead mb-0 opacity-90">
                Join thousands of farmers who are growing smarter and earning more with AgriWise.
              </p>
            </div>
            <div className="col-lg-5 text-lg-end">
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-lg-end">
                <button className="btn btn-light btn-lg px-4 fw-semibold">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p className="mb-0">© 2025 AgriWise. Empowering farmers with AI-driven solutions.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing

