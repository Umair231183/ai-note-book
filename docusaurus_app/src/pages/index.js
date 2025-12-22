import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p className={styles.heroDescription}>
            Explore the transformative impact on K-12 classroom efficiency.
            This comprehensive research paper delves into how modern technologies are reshaping education,
            enhancing learning outcomes, and streamlining educational processes.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              Read Research Paper
            </Link>
            <Link
              className="button button--primary button--lg"
              to="/chatbot">
              Explore Assistant
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`AI Research Paper - ${siteConfig.title}`}
      description="Comprehensive research on AI's impact on K-12 classroom efficiency">
      <HomepageHeader />
      <main>
        <section className={styles.introSection}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className={styles.featureCard}>
                  <h3>Research Insights</h3>
                  <p>
                    Deep dive into the latest research on how AI is revolutionizing the educational landscape,
                    with focus on K-12 classroom efficiency and student outcomes.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureCard}>
                  <h3>AI-Powered Assistance</h3>
                  <p>
                    Interact with our intelligent chatbot assistant to get answers to your questions
                    about the research paper and AI in education.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureCard}>
                  <h3>Educational Resources</h3>
                  <p>
                    Access additional resources, datasets, and educational materials related to
                    AI in K-12 education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.researchSection}>
          <div className="container padding-vert--lg">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className={styles.keyFindingsContainer}>
                  <h2 className={styles.sectionTitle}>Key Research Findings</h2>
                  <p className={styles.translatableText}>
                    Our comprehensive research reveals significant improvements in classroom efficiency when AI technologies
                    are properly integrated into educational settings. Key findings include:
                  </p>
                  <div className={styles.findingsGrid}>
                    <div className={styles.findingCard}>
                      <div className={styles.findingIcon}>📚</div>
                      <h3>Engagement</h3>
                      <p className={styles.translatableText}>Increased student engagement by 40%</p>
                    </div>
                    <div className={styles.findingCard}>
                      <div className={styles.findingIcon}>🎯</div>
                      <h3>Personalization</h3>
                      <p className={styles.translatableText}>Personalized learning experiences for diverse student needs</p>
                    </div>
                    <div className={styles.findingCard}>
                      <div className={styles.findingIcon}>📋</div>
                      <h3>Efficiency</h3>
                      <p className={styles.translatableText}>Reduced administrative burden on educators</p>
                    </div>
                    <div className={styles.findingCard}>
                      <div className={styles.findingIcon}>📊</div>
                      <h3>Assessment</h3>
                      <p className={styles.translatableText}>Enhanced assessment and feedback mechanisms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
