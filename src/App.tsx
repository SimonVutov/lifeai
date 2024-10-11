import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send email to server
    try {
      const response = await fetch('http://localhost:5000/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Thank you for signing up!');
        setEmail(''); // Clear input field
      } else {
        setMessage('Failed to sign up. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
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