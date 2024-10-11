import React, { useState } from "react";
import "./LandingPage.css";

function LandingPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "cloiud.mongodb: mongodb+srv://simonvutov1:wuLnRzct3W0m2OU1@cluster0.4dqmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage("Thank you for signing up!");
        setEmail("");
      } else {
        setMessage("Failed to sign up. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">LifeAI</h1>
        <p className="subtitle">
          Your AI-powered assistant for a more productive and organized life.
          Seamlessly integrate Notion, Calendar, Email, and more.
        </p>

        <form onSubmit={handleFormSubmit} className="signup-form">
          <input
            type="email"
            placeholder="Enter your email to stay updated"
            value={email}
            onChange={handleEmailChange}
            className="email-input"
            required
          />
          <button type="submit" className="cta-button">
            Sign Up for Early Access
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </header>

      <section className="features-section">
        <h2 className="section-title">Why Choose LifeAI?</h2>
        <p className="section-description">
          LifeAI offers seamless integration of your favorite productivity
          tools, providing you with personalized, AI-driven insights to help you
          plan your day, make better decisions, and stay on top of your goals.
        </p>
      </section>

      <section className="cta-section">
        <h2 className="cta-text">
          Don't miss out on the future of productivity.
        </h2>
        <p>
          Be among the first to experience LifeAI. Join our mailing list today!
        </p>
      </section>

      <footer className="footer">
        <p className="footer-text">© 2024 LifeAI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
