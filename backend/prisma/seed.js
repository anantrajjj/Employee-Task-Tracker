const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.task.deleteMany({});
  await prisma.employee.deleteMany({});

  // Hash default password
  const defaultPassword = await bcrypt.hash('password123', 10);

  // Create Employees with passwords
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        name: 'Admin User',
        email: 'admin@company.com',
        password: defaultPassword,
        role: 'ADMIN'
      }
    }),
    prisma.employee.create({
      data: {
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        password: defaultPassword,
        role: 'MANAGER'
      }
    }),
    prisma.employee.create({
      data: {
        name: 'Bob Johnson',
        email: 'bob.johnson@company.com',
        password: defaultPassword,
        role: 'USER'
      }
    })
  ]);

  console.log(`Created ${employees.length} employees`);
  console.log('Login credentials:');
  console.log('  Admin: admin@company.com / password123');
  console.log('  Manager: jane.smith@company.com / password123');
  console.log('  User: bob.johnson@company.com / password123');

  // Create Tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: 'Complete Q4 Sales Report',
        description: 'Analyze sales data and prepare comprehensive report for stakeholders',
        status: 'IN_PROGRESS',
        dueDate: new Date('2025-12-15'),
        employeeId: employees[0].id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Update Employee Handbook',
        description: 'Review and update company policies in the employee handbook',
        status: 'TODO',
        dueDate: new Date('2025-12-20'),
        employeeId: employees[1].id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Fix Bug in Payment Module',
        description: 'Investigate and resolve the payment processing error reported by users',
        status: 'DONE',
        dueDate: new Date('2025-11-25'),
        employeeId: employees[2].id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Prepare Year-End Budget',
        description: 'Create detailed budget projection for next fiscal year',
        status: 'TODO',
        dueDate: new Date('2025-12-30'),
        employeeId: employees[0].id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Conduct Team Training Session',
        description: 'Organize and deliver training on new project management software',
        status: 'IN_PROGRESS',
        dueDate: new Date('2025-12-10'),
        employeeId: employees[1].id
      }
    })
  ]);

  console.log(`Created ${tasks.length} tasks`);
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });