/**
 * Creating a sidebar enables you to:
 * - Create an ordered group of docs
 * - Render a sidebar in the docs side navigation (canonical way)
 * - Learn more https://docusaurus.io/docs/sidebar
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Module 1 — Introduction to Physical AI',
      link: {type: 'doc', id: 'intro'}, // Link to the module's intro page
      items: [
        'intro',
        'literature-review',
        'research-methodology',
        'analysis-ai-tools',
        'discussion-implications',
        'recommendations',
        'conclusion-future-work',
        
      ],
    },
    {
      type: 'category',
      label: 'Module 2 — Robot Operating System (ROS 2)',
      items: [
        'ros2-introduction',
        'ros2-detailed-introduction',
        'ros2-advanced-topics',
        'ros2-performance-optimization',
      ],
    },
    {
      type: 'category',
      label: 'Module 3 — Simulation (Gazebo, Unity, Isaac Sim)',
      items: [
        'simulation-introduction',
        'simulation-detailed-introduction',
        'simulation-advanced-techniques',
        'simulation-based-learning',
      ],
    },
    {
      type: 'category',
      label: 'Module 4 — NVIDIA Isaac AI Robotics',
      items: [
        'nvidia-isaac-introduction',
        'isaac-detailed-introduction',
        'isaac-ai-integration',
        'isaac-navigation-manipulation',
      ],
    },
    {
      type: 'category',
      label: 'Module 5 — Humanoid Robotics',
      items: [
        'humanoid-robotics-introduction',
        'humanoid-robotics-detailed-introduction',
        'humanoid-robotics-design-control',
        'humanoid-robotics-applications',
      ],
    },
    {
      type: 'category',
      label: 'Module 6 — Conversational Robotics',
      items: [
        'conversational-robotics-introduction',
        'conversational-robotics-detailed-introduction',
        'conversational-robotics-nlp',
        'conversational-robotics-social-interaction',
      ],
    },
    {
      type: 'category',
      label: 'Module 7 — Capstone Project',
      items: [
        'capstone-project-introduction',
        'capstone-project-detailed-introduction',
        'capstone-project-implementation',
        'capstone-project-evaluation',
      ],
    },
  ],
};

module.exports = sidebars;
