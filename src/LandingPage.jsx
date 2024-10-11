import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Send email to server
    const response = await fetch('http://localhost:5000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Thank you for signing up!');
      setEmail(''); // Clear input field
    } else {
      setMessage('Failed to sign up. Try again.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">LifeAI</h1>
        <p className="subtitle">
          Seamlessly integrate your Notion, Calendar, Email, and more.
          Get personalized AI-driven insights for a productive life.
        </p>

        <form onSubmit={handleFormSubmit} className="signup-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="email-input"
            required
          />
          <button type="submit" className="cta-button">Sign Up</button>
        </form>

        {message && <p className="message">{message}</p>}
      </header>
    </div>
  );
}

export default LandingPage;