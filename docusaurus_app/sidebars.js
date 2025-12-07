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
      ],
    },
    {
      type: 'category',
      label: 'Module 3 — Simulation (Gazebo, Unity, Isaac Sim)',
      items: [
        'simulation-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Module 4 — NVIDIA Isaac AI Robotics',
      items: [
        'nvidia-isaac-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Module 5 — Humanoid Robotics',
      items: [
        'humanoid-robotics-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Module 6 — Conversational Robotics',
      items: [
        'conversational-robotics-introduction',
      ],
    },
    {
      type: 'category',
      label: 'Module 7 — Capstone Project',
      items: [
        'capstone-project-introduction',
      ],
    },
  ],
};

module.exports = sidebars;
