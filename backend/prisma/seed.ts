import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const educations = [
    { name: 'Bachelor of Science (BSc) in Web Development' },
    {
      name: 'Bachelor of Science (BSc) in Computer Science with a focus on Web Development',
    },
    {
      name: 'Bachelor of Arts (BA) in Multimedia Design and Communication with Web Development',
    },
    { name: 'Bachelor of Engineering (BEng) in Software Development' },
    { name: 'Professional Bachelor`s Degree in Web Development' },
    {
      name: 'Master of Science (MSc) in Computer Science with specialization in Web Development',
    },
    { name: 'Master of Science (MSc) in Web Communication' },
    { name: 'Diploma in Web Development and Design' },
    { name: 'Associate Degree in IT and Web Development' },
    { name: 'Vocational or Technical Certificate in Web Development' },
  ];

  const skills = [
    { name: 'HTML/CSS' },
    { name: 'JavaScript' },
    { name: 'Responsive Design' },
    { name: 'Version Control/Git' },
    { name: 'Front-End Frameworks' },
    { name: 'Back-End Development' },
    { name: 'APIs (Application Programming Interfaces)' },
    { name: 'Web Performance Optimization' },
    { name: 'Security Basics' },
    { name: 'Problem-Solving' },
  ];

  const projects = [
    { name: 'Project 1' },
    { name: 'Project 2' },
    { name: 'Project 3' },
    { name: 'Project 4' },
    { name: 'Project 5' },
  ];

  const employees = Array.from({ length: 30 }, () => {
    return {
      name: faker.person.fullName(),
      employeeStartDate: '2021-01-01', // You can modify this as needed
      expertiseLevel: faker.number.int({ min: 1, max: 10 }),
      availableHours: faker.number.int({ min: 0, max: 37 }),
      education: faker.number.int({ min: 1, max: 10 }),
      projects: [
        faker.number.int({ min: 1, max: 5 }),
        faker.number.int({ min: 1, max: 5 }),
      ].filter((value, index, self) => self.indexOf(value) === index),
      skills: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () =>
        faker.number.int({ min: 1, max: 10 }),
      ),
    };
  });

  await Promise.all([
    prisma.education.createMany({ data: educations }),
    prisma.skill.createMany({ data: skills }),
    prisma.project.createMany({ data: projects }),
  ]);

  for (const employee of employees) {
    await prisma.employee.create({
      data: {
        name: employee.name,
        employeeStartDate: faker.date
          .between({ from: '2003-01-01', to: '2023-12-31' })
          .toISOString()
          .split('T')[0],
        expertiseLevel: employee.expertiseLevel,
        availableHours: employee.availableHours,
        education: {
          connect: { id: employee.education },
        },
        projects: {
          connect: employee.projects.map((id) => ({ id })),
        },
        skills: {
          connect: employee.skills.map((id) => ({ id })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
