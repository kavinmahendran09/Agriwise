"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase } from "./SupabaseClient"
import Navbar from "./Navbar"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import InputGroup from "react-bootstrap/InputGroup"

interface Listing {
  id: number
  crop_type: string
  farmer_name: string
  price_per_quintal: number
  yield: number
  location: string
  image_url: string
  created_at: string
}

const OpenMarket = () => {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString())
  const [showModal, setShowModal] = useState<boolean>(false)
  const [newListing, setNewListing] = useState({
    crop_type: "",
    farmer_name: "",
    price_per_quintal: 0,
    yield: 0,
    location: "",
  })

  useEffect(() => {
    fetchListings()

    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [])

  const fetchListings = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("listings").select("*")
    if (error) console.error("Error fetching listings:", error)
    else setListings(data || [])
    setLoading(false)
  }

  const handleBuy = (listingId: number) => {
    alert(`You have purchased listing #${listingId}`)
  }

  const handleAddListing = () => {
    setShowModal(true) // Show the modal
  }

  const handleCloseModal = () => {
    setShowModal(false) // Hide the modal
    setNewListing({
      crop_type: "",
      farmer_name: "",
      price_per_quintal: 0,
      yield: 0,
      location: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewListing({ ...newListing, [name]: value })
  }

  const cropImageMapping: { [key: string]: string } = {
    Wheat: "https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg?w=300",
    Barley: "https://cdn-prod.medicalnewstoday.com/content/images/articles/295/295268/barley-grains-in-a-wooden-bowl.jpg",
    Rice: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnFjjMmMYrGdwxx0rcuKFqMlcY8Juj5_4ZNg&s",
    Maize: "https://i0.wp.com/www.pakissan.com/wp-content/uploads/2017/10/maize.jpg?fit=720%2C420&ssl=1",
    Cotton: "https://images.ctfassets.net/3s5io6mnxfqz/4TV7YTCO1DJuMhhn7RD1Ol/b5a6c12340e6529a86bc1b557ed2d8f8/AdobeStock_136921602.jpeg?w=1920",
    Groundnut: "https://theonlinecook.com/wp-content/uploads/2021/08/Roasted-Groundnut-easy-recipe.png",
    Jowar: "https://www.livofy.com/health/wp-content/uploads/2020/08/2556-10-Amazing-Health-Benefits-Of-Sorghum-Jowar-SS.jpg",
    Lentil: "https://cdn.britannica.com/14/157214-050-3A82D9CD/kinds-lentils.jpg",
    Bajra: "https://post.healthline.com/wp-content/uploads/2020/09/bajra-pearl-millet-grain-1296x728-header.jpg",
    Moong: "https://png.pngtree.com/png-clipart/20220823/original/pngtree-green-gram-or-golden-png-image_8470868.png",
    Linseed: "https://cdn.pixabay.com/photo/2023/02/28/10/52/linseed-7820554_1280.jpg",
    Jute: "https://jutesparkle.com/wp-content/uploads/2021/01/Fine-Jute-Fabrics.jpg",
    Mesta: 'https://www.apnikheti.com/upload/crops/4325idea99mesta_crop_banner.jpg',
    Potato: 'https://t3.ftcdn.net/jpg/02/90/84/84/360_F_290848444_WWHweQdEJlU5OrKKdnsdVaJDaegs5cKR.jpg',
    Onion: 'https://static.vecteezy.com/system/resources/thumbnails/042/666/678/small/ai-generated-organic-red-onion-close-up-on-the-field-eco-friendly-products-generative-ai-photo.jpg',
    Paddy: 'https://png.pngtree.com/thumb_back/fh260/background/20241029/pngtree-ripe-paddy-field-background-image-image_16467542.jpg',
    Palm_Oil: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/11496/723f36e0-71b8-4bcc-8c0b-9d0ddfd009cc.jpg',
    Peas: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30px9Idz_YHQOLtSVGSrPgHkSYBvrzwcCE6mMufifdSh5G8JLkOWwzAuEEFfmySNacw0&usqp=CAU',
    Ragi: 'https://www.atulyam.co.in/cdn/shop/articles/ragi_picture.jpg?v=1705326736&width=1100',
    Rajma: 'https://kashmiridarakth.com/wp-content/uploads/2024/10/Kashmiri-Red-Rajma.jpg',
    Safflower: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG2ppivud_A9Cr23wD_yoo3jD7cQp9J1ZXWw&s',
    Sesamum: 'https://cdn.britannica.com/66/212766-050-FF1A49A0/sesame-seeds-wooden-spoon.jpg',
    Soya_oil: 'https://5.imimg.com/data5/GL/BS/TK/SELLER-50434478/loose-refined-soyabean-oil-500x500.jpg',
    Soybean: 'https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_745986_16823072833517897.jpg',
    Sugarcane: 'https://static.wixstatic.com/media/6e2303_4f8371354e4841ea9b2e392c0ff76c4e~mv2.webp/v1/fill/w_568,h_366,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6e2303_4f8371354e4841ea9b2e392c0ff76c4e~mv2.webp',
    Sunflower: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMyDlEWXrh1VXBf7eaEXV3d3lvUk5tnU1QQw&s',
    Tomato: 'https://media.post.rvohealth.io/wp-content/uploads/2020/09/AN313-Tomatoes-732x549-Thumb.jpg',
    Tur: 'https://3.imimg.com/data3/RP/XP/MY-4567113/tur-pulses.jpg',
    Nigerseed: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Niger_Seed.jpg/220px-Niger_Seed.jpg',
    WheatAtta: 'https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg?w=300',
    Urad: 'https://aarogyamastu.in/wp-content/uploads/2022/11/urad-dal.png',
    Gram: 'https://cdn.justgotochef.com/uploads/1551504741-gram%20dal_landing.png?w=633&h=381&fit=crop'
  }

  const handleSubmit = async () => {
    const image_url = cropImageMapping[newListing.crop_type] || "https://source.unsplash.com/200x200/?crop"

    const { error } = await supabase.from("listings").insert([{ ...newListing, image_url }])

    if (error) {
      console.error("Error adding listing:", error)
    } else {
      // Refresh the listings
      fetchListings()
      // Close the modal
      handleCloseModal()
    }
  }

  const cropTypes = [
    "Bajra",
    "Barley",
    "Castorseed",
    "Cotton",
    "Cotton Oil",
    "Gram",
    "Groundnut",
    "Groundnut Oil",
    "Jowar",
    "Jute",
    "Lentil",
    "Linseed",
    "Maize",
    "Mesta",
    "Moong",
    "Nigerseed",
    "Onion",
    "Paddy",
    "Palm oil",
    "Peas",
    "Potato",
    "Ragi",
    "Rajma",
    "Rapeseed & Mustard",
    "Rapeseed & Mustard (Meal/Cake)",
    "Rapeseed & Mustard Oil",
    "Rice",
    "Safflower",
    "Sesamum",
    "Soya oil",
    "Soybean",
    "Sugarcane",
    "Sunflower",
    "Sunflower oil",
    "Tobacco",
    "Tomato",
    "Tur",
    "Urad",
    "Wheat",
    "Wheat Atta",
  ]

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4">
        {/* Header Section */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body className="bg-success bg-gradient text-white rounded">
            <Row className="align-items-center">
              <Col>
                <h1 className="mb-0 fw-bold">Open Market</h1>
                <p className="mb-0 opacity-75">Find and purchase crops directly from farmers</p>
              </Col>
              <Col xs="auto" className="text-end">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-white bg-opacity-25 px-3 py-2 rounded-pill">
                    <i className="bi bi-clock me-2"></i>
                    {currentTime}
                  </div>
                  <Button
                    variant="light"
                    className="fw-semibold d-flex align-items-center gap-2"
                    onClick={handleAddListing}
                  >
                    <i className="bi bi-plus-circle"></i>
                    Add Listing
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Listings Section */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2 text-muted">Loading listings...</p>
          </div>
        ) : listings.length === 0 ? (
          <Card className="text-center p-5 border-0 shadow-sm">
            <Card.Body>
              <h3 className="text-muted">No listings available</h3>
              <p>Be the first to add a crop listing!</p>
              <Button variant="success" onClick={handleAddListing}>
                Add Listing
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {listings.map((listing) => (
              <Col md={6} lg={4} key={listing.id} className="mb-4">
                <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={listing.image_url}
                      alt={listing.crop_type}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <Badge bg="success" className="position-absolute top-0 end-0 m-2 px-2 py-1">
                      ID: {listing.id}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h4 className="mb-0 text-success fw-bold">{listing.crop_type}</h4>
                      <Badge bg="light" text="dark" pill>
                        {listing.yield} quintals
                      </Badge>
                    </div>

                    <Card.Text className="mb-1">
                      <i className="bi bi-person-circle me-2 text-muted"></i>
                      {listing.farmer_name}
                    </Card.Text>
                    <Card.Text className="mb-3">
                      <i className="bi bi-geo-alt me-2 text-muted"></i>
                      {listing.location}
                    </Card.Text>

                    <Card className="bg-light border-0 mb-3 mt-auto">
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Price per Quintal:</span>
                          <span className="fw-bold">₹{listing.price_per_quintal.toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">Total Value:</span>
                          <span className="fw-bold text-success">
                            ₹{(listing.price_per_quintal * listing.yield).toLocaleString()}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>

                    <Button variant="success" className="w-100 fw-semibold" onClick={() => handleBuy(listing.id)}>
                      <i className="bi bi-cart-check me-2"></i>
                      Buy Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Add Listing Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static">
        <Modal.Header closeButton className="bg-success bg-opacity-10 border-bottom-0">
          <Modal.Title className="text-success">
            <i className="bi bi-plus-circle me-2"></i>
            Add New Listing
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Crop Type</Form.Label>
              <Form.Select
                name="crop_type"
                value={newListing.crop_type}
                onChange={handleInputChange}
                required
                className="py-2"
              >
                <option value="">Select Crop</option>
                {cropTypes.map((crop, index) => (
                  <option key={index} value={crop}>
                    {crop}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Farmer Name</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="farmer_name"
                  value={newListing.farmer_name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  className="py-2"
                />
              </InputGroup>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Price per Quintal (₹)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light">₹</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price_per_quintal"
                      value={newListing.price_per_quintal}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                      className="py-2"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Total Yield (quintals)</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="yield"
                      value={newListing.yield}
                      onChange={handleInputChange}
                      placeholder="0"
                      required
                      className="py-2"
                    />
                    <InputGroup.Text className="bg-light">quintals</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Location</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <i className="bi bi-geo-alt"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="location"
                  value={newListing.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                  required
                  className="py-2"
                />
              </InputGroup>
            </Form.Group>

            {newListing.crop_type && newListing.price_per_quintal > 0 && newListing.yield > 0 && (
              <Card className="bg-light border-0 mb-3">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Total Value:</span>
                    <h5 className="mb-0 text-success fw-bold">
                      ₹{(newListing.price_per_quintal * newListing.yield).toLocaleString()}
                    </h5>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0 px-4 pb-4">
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSubmit}
            className="px-4"
            disabled={
              !newListing.crop_type ||
              !newListing.farmer_name ||
              !newListing.location ||
              newListing.price_per_quintal <= 0 ||
              newListing.yield <= 0
            }
          >
            Add Listing
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OpenMarket

