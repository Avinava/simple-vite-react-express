import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample contacts
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0101',
        company: 'Tech Corp',
        notes: 'Lead developer with 5+ years experience',
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-0102',
        company: 'Design Studio',
        notes: 'UI/UX designer specializing in mobile apps',
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@example.com',
        phone: '+1-555-0103',
        company: 'Marketing Inc',
        notes: 'Project manager with excellent communication skills',
      },
    }),
    prisma.contact.create({
      data: {
        firstName: 'Alice',
        lastName: 'Williams',
        email: 'alice.williams@example.com',
        phone: '+1-555-0104',
        company: 'Data Analytics Co',
        notes: 'Data scientist with machine learning expertise',
      },
    }),
  ]);

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'E-commerce Platform',
        description: 'Building a modern e-commerce platform with React and Node.js',
        status: 'active',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-30'),
      },
    }),
    prisma.project.create({
      data: {
        name: 'Mobile App Development',
        description: 'Cross-platform mobile app for task management',
        status: 'active',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-08-15'),
      },
    }),
    prisma.project.create({
      data: {
        name: 'Data Analytics Dashboard',
        description: 'Real-time analytics dashboard for business intelligence',
        status: 'planning',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-09-30'),
      },
    }),
  ]);

  // Add members to projects
  const projectMembers = await Promise.all([
    // E-commerce Platform team
    prisma.projectMember.create({
      data: {
        contactId: contacts[0].id, // John Doe
        projectId: projects[0].id,
        role: 'lead_developer',
      },
    }),
    prisma.projectMember.create({
      data: {
        contactId: contacts[1].id, // Jane Smith
        projectId: projects[0].id,
        role: 'designer',
      },
    }),
    prisma.projectMember.create({
      data: {
        contactId: contacts[2].id, // Bob Johnson
        projectId: projects[0].id,
        role: 'project_manager',
      },
    }),
    // Mobile App team
    prisma.projectMember.create({
      data: {
        contactId: contacts[0].id, // John Doe
        projectId: projects[1].id,
        role: 'developer',
      },
    }),
    prisma.projectMember.create({
      data: {
        contactId: contacts[1].id, // Jane Smith
        projectId: projects[1].id,
        role: 'lead_designer',
      },
    }),
    // Data Analytics team
    prisma.projectMember.create({
      data: {
        contactId: contacts[3].id, // Alice Williams
        projectId: projects[2].id,
        role: 'data_scientist',
      },
    }),
    prisma.projectMember.create({
      data: {
        contactId: contacts[2].id, // Bob Johnson
        projectId: projects[2].id,
        role: 'project_manager',
      },
    }),
  ]);

  // Create sample tasks
  const tasks = await Promise.all([
    // E-commerce Platform tasks
    prisma.task.create({
      data: {
        title: 'Set up project structure',
        description: 'Initialize React app with TypeScript and configure build tools',
        status: 'DONE',
        priority: 'HIGH',
        assigneeId: contacts[0].id,
        projectId: projects[0].id,
        dueDate: new Date('2024-01-20'),
      },
    }),
    prisma.task.create({
      data: {
        title: 'Design user authentication flow',
        description: 'Create wireframes and mockups for login/register pages',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        assigneeId: contacts[1].id,
        projectId: projects[0].id,
        dueDate: new Date('2024-02-15'),
      },
    }),
    prisma.task.create({
      data: {
        title: 'Implement product catalog',
        description: 'Build product listing and detail pages with search functionality',
        status: 'TODO',
        priority: 'MEDIUM',
        assigneeId: contacts[0].id,
        projectId: projects[0].id,
        dueDate: new Date('2024-03-01'),
      },
    }),
    // Mobile App tasks
    prisma.task.create({
      data: {
        title: 'Create app navigation structure',
        description: 'Design and implement bottom tab navigation',
        status: 'REVIEW',
        priority: 'HIGH',
        assigneeId: contacts[1].id,
        projectId: projects[1].id,
        dueDate: new Date('2024-02-20'),
      },
    }),
    prisma.task.create({
      data: {
        title: 'Implement task creation feature',
        description: 'Build forms and validation for creating new tasks',
        status: 'TODO',
        priority: 'MEDIUM',
        assigneeId: contacts[0].id,
        projectId: projects[1].id,
        dueDate: new Date('2024-03-10'),
      },
    }),
    // Data Analytics tasks
    prisma.task.create({
      data: {
        title: 'Research data visualization libraries',
        description: 'Evaluate Chart.js, D3.js, and other visualization options',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        assigneeId: contacts[3].id,
        projectId: projects[2].id,
        dueDate: new Date('2024-03-15'),
      },
    }),
    prisma.task.create({
      data: {
        title: 'Set up data pipeline',
        description: 'Configure ETL processes for real-time data ingestion',
        status: 'TODO',
        priority: 'HIGH',
        assigneeId: contacts[3].id,
        projectId: projects[2].id,
        dueDate: new Date('2024-04-01'),
      },
    }),
  ]);

  console.log('✅ Database seeded successfully!');
  console.log(`Created ${contacts.length} contacts`);
  console.log(`Created ${projects.length} projects`);
  console.log(`Created ${projectMembers.length} project memberships`);
  console.log(`Created ${tasks.length} tasks`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });