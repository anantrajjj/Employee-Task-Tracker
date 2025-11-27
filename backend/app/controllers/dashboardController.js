const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total tasks
    const totalTasks = await prisma.task.count();

    // Get completed tasks
    const completedTasks = await prisma.task.count({
      where: { status: 'DONE' }
    });

    // Get total employees
    const totalEmployees = await prisma.employee.count();

    // Get tasks by status
    const todoTasks = await prisma.task.count({
      where: { status: 'TODO' }
    });

    const inProgressTasks = await prisma.task.count({
      where: { status: 'IN_PROGRESS' }
    });

    // Get recent tasks
    const recentTasks = await prisma.task.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    const stats = {
      totalTasks,
      completedTasks,
      totalEmployees,
      todoTasks,
      inProgressTasks,
      completionRate: totalTasks > 0 
        ? Math.round((completedTasks / totalTasks) * 100) 
        : 0,
      recentTasks
    };

    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch dashboard statistics',
      message: error.message 
    });
  }
};