//import React from 'react';
import './LandingPage.css';  // You'll create this file to manage styles

function LandingPage() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">LifeAI</h1>
        <p className="subtitle">
          Seamlessly integrate your Notion, Calendar, Email, and more.
          Get personalized AI-driven insights for a productive life.
        </p>
        <button className="cta-button">Sign Up for Updates</button>
      </header>
      
      <section className="features-section">
        <h2 className="section-title">Why LifeAI?</h2>
        <p className="section-description">
          Unlock the full potential of your productivity tools by letting AI guide you through your daily tasks, 
          improve your decision-making, and keep you on track.
        </p>
      </section>
      
      <footer className="footer">
        <p className="footer-text">Stay tuned for more updates. Sign up to receive early access.</p>
      </footer>
    </div>
  );
}

export default LandingPage;