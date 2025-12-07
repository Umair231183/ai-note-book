import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router'; // For redirection

const OnboardingPage = () => {
  const history = useHistory();
  const [experienceLevel, setExperienceLevel] = useState('');
  const [hardwareOwnership, setHardwareOwnership] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, this would send data to the backend via an API call
    console.log('Onboarding data submitted:', {
      experienceLevel,
      hardwareOwnership,
      preferredLanguage,
    });
    // Simulate API call and then redirect
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    history.push('/'); // Redirect to homepage after submission
  };

  return (
    <Layout title="Welcome!" description="User onboarding questionnaire.">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="text--center">Welcome to the PAHR Textbook!</h1>
            <p className="text--center">Please tell us a little about yourself to personalize your experience.</p>
            <form onSubmit={handleSubmit} className="card padding--lg">
              <div className="margin-bottom--md">
                <label htmlFor="experienceLevel" className="form__label">Your Experience Level:</label>
                <select
                  id="experienceLevel"
                  className="form__input"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  required
                >
                  <option value="">-- Please select --</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="margin-bottom--md">
                <label htmlFor="hardwareOwnership" className="form__label">Do you own robotics hardware?</label>
                <input
                  type="text"
                  id="hardwareOwnership"
                  className="form__input"
                  value={hardwareOwnership}
                  onChange={(e) => setHardwareOwnership(e.target.value)}
                  placeholder="e.g., Raspberry Pi, Drone, Robot arm (optional)"
                />
              </div>

              <div className="margin-bottom--md">
                <label htmlFor="preferredLanguage" className="form__label">Preferred Language for content:</label>
                <select
                  id="preferredLanguage"
                  className="form__input"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  required
                >
                  <option value="en">English</option>
                  <option value="ur">Urdu</option>
                </select>
              </div>

              <button type="submit" className="button button--primary button--block">
                Start Learning!
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OnboardingPage;