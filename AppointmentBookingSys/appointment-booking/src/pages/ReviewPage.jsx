import React, { useState, useEffect } from 'react';
import axios from 'axios';

const services = [
    { id: 1, name: 'General Physician', icon: '🩺' },
    { id: 2, name: 'Dental Care', icon: '🦷' },
    { id: 3, name: 'Eye Checkup', icon: '👁️' },
    { id: 4, name: 'Hair Treatment', icon: '💇' },
    { id: 5, name: 'Nail Art', icon: '💅' },
    { id: 6, name: 'Facial & Skincare', icon: '✨' }
];

function ReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [serviceId, setServiceId] = useState(1);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [avgRatings, setAvgRatings] = useState({});
    const [filterServiceId, setFilterServiceId] = useState('all');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId') || 1;

    useEffect(() => {
        fetchAllReviews();
        fetchAvgRatings();
    }, []);

    const fetchAllReviews = async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/reviews/all',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReviews(response.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    const fetchAvgRatings = async () => {
        try {
            const ratings = {};
            for (const service of services) {
                const response = await axios.get(
                    `http://localhost:8080/reviews/rating/${service.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                ratings[service.id] = response.data.averageRating;
            }
            setAvgRatings(ratings);
        } catch (err) {
            console.error('Error fetching ratings:', err);
        }
    };

    const handleSubmitReview = async () => {
        if (!comment.trim()) {
            setError('Please write a comment!');
            return;
        }
        try {
            await axios.post(
                'http://localhost:8080/reviews/add',
                {
                    rating: rating,
                    comment: comment,
                    user: { id: userId },
                    service: { id: serviceId }
                },
                { headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } }
            );
            setSuccess('Review submitted! ⭐');
            setComment('');
            setRating(5);
            setError('');
            fetchAllReviews();
            fetchAvgRatings();
        } catch (err) {
            setError('Failed to submit review!');
        }
    };

    const renderStars = (count) => '⭐'.repeat(count);

    const filteredReviews = filterServiceId === 'all'
        ? reviews
        : reviews.filter(r =>
            r.service?.id === parseInt(filterServiceId));

    return (
        <div style={{
            paddingTop: '80px',
            padding: '80px 40px 40px',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
        }}>
            <h2 style={{ color: '#1565c0' }}>
                ⭐ Reviews & Ratings
            </h2>
            <p style={{ color: 'gray', marginBottom: '40px' }}>
                See what customers say about our services
            </p>

            {/* Average Ratings */}
            <h3 style={{ color: '#1565c0' }}>
                📊 Service Ratings
            </h3>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px',
                marginBottom: '40px'
            }}>
                {services.map((service) => (
                    <div key={service.id} style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '15px',
                        textAlign: 'center',
                        minWidth: '160px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        border: filterServiceId == service.id
                            ? '2px solid #1565c0'
                            : '2px solid transparent'
                    }}
                    onClick={() => setFilterServiceId(
                        filterServiceId == service.id
                            ? 'all' : service.id)}>
                        <div style={{ fontSize: '40px' }}>
                            {service.icon}
                        </div>
                        <div style={{ fontWeight: 'bold',
                            margin: '8px 0 4px',
                            fontSize: '14px' }}>
                            {service.name}
                        </div>
                        <div style={{ color: '#f57c00',
                            fontSize: '18px' }}>
                            {avgRatings[service.id]
                                ? renderStars(Math.round(
                                    avgRatings[service.id]))
                                : '☆☆☆☆☆'}
                        </div>
                        <div style={{ color: 'gray',
                            fontSize: '12px' }}>
                            {avgRatings[service.id]
                                ? avgRatings[service.id]
                                    .toFixed(1) + ' / 5'
                                : 'No ratings'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Write Review */}
            {token && (
                <div style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '15px',
                    marginBottom: '40px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ color: '#1565c0',
                        marginBottom: '20px' }}>
                        ✍️ Write a Review
                    </h3>

                    {success && (
                        <div style={{
                            backgroundColor: '#e8f5e9',
                            color: 'green',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '15px'
                        }}>
                            {success}
                        </div>
                    )}
                    {error && (
                        <div style={{
                            backgroundColor: '#ffebee',
                            color: 'red',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '15px'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap',
                        marginBottom: '15px'
                    }}>
                        {/* Service Select */}
                        <div>
                            <label style={{ fontWeight: 'bold',
                                display: 'block',
                                marginBottom: '5px' }}>
                                Select Service
                            </label>
                            <select
                                value={serviceId}
                                onChange={(e) =>
                                    setServiceId(e.target.value)}
                                style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px',
                                    width: '220px'
                                }}>
                                {services.map((s) => (
                                    <option key={s.id}
                                        value={s.id}>
                                        {s.icon} {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Rating Select */}
                        <div>
                            <label style={{ fontWeight: 'bold',
                                display: 'block',
                                marginBottom: '5px' }}>
                                Your Rating
                            </label>
                            <select
                                value={rating}
                                onChange={(e) =>
                                    setRating(
                                        parseInt(e.target.value))}
                                style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px',
                                    width: '180px'
                                }}>
                                <option value={5}>
                                    ⭐⭐⭐⭐⭐ Excellent
                                </option>
                                <option value={4}>
                                    ⭐⭐⭐⭐ Very Good
                                </option>
                                <option value={3}>
                                    ⭐⭐⭐ Good
                                </option>
                                <option value={2}>
                                    ⭐⭐ Fair
                                </option>
                                <option value={1}>
                                    ⭐ Poor
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Comment */}
                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)}
                        placeholder="Write your experience here..."
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '16px',
                            marginBottom: '15px',
                            boxSizing: 'border-box',
                            resize: 'vertical'
                        }} />

                    <button
                        onClick={handleSubmitReview}
                        style={{
                            padding: '12px 40px',
                            backgroundColor: '#1565c0',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>
                        ⭐ Submit Review
                    </button>
                </div>
            )}

            {/* Filter + Reviews List */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h3 style={{ color: '#1565c0', margin: 0 }}>
                    💬 Reviews ({filteredReviews.length})
                </h3>
                <select
                    value={filterServiceId}
                    onChange={(e) =>
                        setFilterServiceId(e.target.value)}
                    style={{
                        padding: '8px 15px',
                        borderRadius: '20px',
                        border: '1px solid #1565c0',
                        fontSize: '14px',
                        cursor: 'pointer'
                    }}>
                    <option value="all">All Services</option>
                    {services.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.icon} {s.name}
                        </option>
                    ))}
                </select>
            </div>

            {filteredReviews.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    color: 'gray'
                }}>
                    <div style={{ fontSize: '50px' }}>💬</div>
                    <p>No reviews yet. Be the first to review!</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                }}>
                    {filteredReviews.map((review) => (
                        <div key={review.id} style={{
                            backgroundColor: 'white',
                            padding: '25px',
                            borderRadius: '15px',
                            boxShadow:
                                '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s'
                        }}>
                            {/* User */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '12px'
                            }}>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    backgroundColor: '#1565c0',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '18px'
                                }}>
                                    {review.user?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <div style={{
                                        fontWeight: 'bold'
                                    }}>
                                        {review.user?.name
                                            || 'Anonymous'}
                                    </div>
                                    <div style={{
                                        color: 'gray',
                                        fontSize: '12px'
                                    }}>
                                        {review.createdAt
                                            ?.split('T')[0]
                                            || ''}
                                    </div>
                                </div>
                            </div>

                            {/* Service Badge */}
                            <span style={{
                                backgroundColor: '#e3f2fd',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                marginBottom: '10px',
                                display: 'inline-block'
                            }}>
                                {review.service?.name
                                    || 'Unknown Service'}
                            </span>

                            {/* Stars */}
                            <div style={{
                                color: '#f57c00',
                                fontSize: '18px',
                                margin: '10px 0'
                            }}>
                                {renderStars(review.rating)}
                            </div>

                            {/* Comment */}
                            <p style={{
                                color: '#555',
                                fontStyle: 'italic',
                                lineHeight: '1.6',
                                margin: 0
                            }}>
                                "{review.comment}"
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ReviewPage;