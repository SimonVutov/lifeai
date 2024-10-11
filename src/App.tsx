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
        "mongodb+srv://simonvutov1:<db_password>@cluster0.4dqmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail("");
      } else {
        setMessage(data.error || "Failed to sign up. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">LifeAI</h1>
        <p className="subtitle">
          LifeAI isn't just another productivity tool. It's your personalized
          AI-driven assistant designed to transform how you organize and
          navigate your day. By seamlessly integrating with your favorite
          platforms—like Notion, Google Calendar, and your email—LifeAI provides
          you with customized insights to help you prioritize, plan, and execute
          your tasks with ease.
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
        <h2 className="section-title">Vision</h2>
        <p className="section-description">
          LifeAI is built on the idea that productivity should be about more
          than just managing tasks—it's about creating space for the things that
          truly matter. With advanced AI algorithms, LifeAI analyzes your daily
          routines, recurring meetings, and tasks, and offers proactive
          suggestions to improve your workflow. It's not just a to-do list—it's
          your intelligent partner in navigating the complexities of modern
          life.
        </p>
      </section>

      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <ul className="section-description">
          <li>
            Seamless integration with Notion, Calendar, and Email for an
            all-in-one overview.
          </li>
          <li>
            AI-driven insights to prioritize tasks and balance work-life
            dynamics.
          </li>
          <li>
            Personalized daily, weekly, and monthly planning tips based on your
            habits and preferences.
          </li>
          <li>
            Data privacy and security are at the forefront—your information
            stays yours.
          </li>
        </ul>
      </section>

      <section className="cta-section">
        <h2 className="cta-text">Be Part of the Future of Productivity</h2>
        <p>
          LifeAI is designed for people who want to make the most of their time
          without feeling overwhelmed by the growing complexity of modern tools.
          Join us in shaping the future of productivity—sign up now to be the
          first to know when LifeAI launches.
        </p>
      </section>

      <footer className="footer">
        <p className="footer-text">© 2024 LifeAI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
