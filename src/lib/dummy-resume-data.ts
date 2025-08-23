
import type { ResumeData } from './types';

export const dummyResumeData: ResumeData = {
  id: 'dummy-resume',
  name: 'John Doe\'s Resume',
  template: 'classic',
  createdAt: new Date().toISOString(),
  personalDetails: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '123-456-7890',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
  },
  summary: 'Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing user-centered digital products from initial concept to final, polished deliverable.',
  experience: [
    {
      id: 'exp1',
      company: 'Tech Solutions Inc.',
      role: 'Senior Software Engineer',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '- Led a team of 5 engineers to develop a new e-commerce platform, resulting in a 30% increase in sales.\n- Optimized application performance by 40% through code refactoring and database query tuning.\n- Implemented a CI/CD pipeline which reduced deployment time by 50%.',
    },
    {
        id: 'exp2',
        company: 'Innovate Co.',
        role: 'Software Engineer',
        startDate: 'Jun 2017',
        endDate: 'Dec 2019',
        description: '- Developed and maintained web applications using React and Node.js.\n- Collaborated with product managers to define feature requirements.\n- Wrote unit and integration tests to ensure code quality.',
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      startDate: 'Aug 2013',
      endDate: 'May 2017',
      description: '- Graduated with a 3.8 GPA.\n- President of the Coding Club.',
    },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'Portfolio Website',
      description: '- Personal portfolio website to showcase my projects and skills.\n- Built with Next.js and deployed on Vercel.',
      url: 'https://johndoe.dev',
    },
  ],
  skills: [
    { id: 'skill1', name: 'JavaScript' },
    { id: 'skill2', name: 'React' },
    { id: 'skill3', name: 'Node.js' },
    { id: 'skill4', name: 'TypeScript' },
    { id: 'skill5', name: 'SQL' },
    { id: 'skill6', name: 'Docker' },
  ],
  jobDescription: '',
  jobPosition: '',
  company: '',
};
