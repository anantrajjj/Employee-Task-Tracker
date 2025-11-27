const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all tasks with optional filtering (role-based)
exports.getAllTasks = async (req, res) => {
  try {
    const { status, employeeId } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (employeeId) where.employeeId = parseInt(employeeId);

    // Regular users can only see their own tasks
    if (req.user && req.user.role === 'USER') {
      where.employeeId = req.user.id;
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ success: true, data: tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch tasks',
      message: error.message 
    });
  }
};

// Get single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        error: 'Task not found' 
      });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch task',
      message: error.message 
    });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, employeeId } = req.body;

    // Validation
    if (!title || !employeeId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Title and Employee ID are required' 
      });
    }

    // Check if employee exists
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(employeeId) }
    });

    if (!employee) {
      return res.status(404).json({ 
        success: false, 
        error: 'Employee not found' 
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        status: status || 'TODO',
        dueDate: dueDate ? new Date(dueDate) : null,
        employeeId: parseInt(employeeId)
      },
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    res.status(201).json({ 
      success: true, 
      data: task,
      message: 'Task created successfully' 
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create task',
      message: error.message 
    });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate, employeeId } = req.body;

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingTask) {
      return res.status(404).json({ 
        success: false, 
        error: 'Task not found' 
      });
    }

    // If employeeId is being updated, validate it exists
    if (employeeId) {
      const employee = await prisma.employee.findUnique({
        where: { id: parseInt(employeeId) }
      });

      if (!employee) {
        return res.status(404).json({ 
          success: false, 
          error: 'Employee not found' 
        });
      }
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (employeeId !== undefined) updateData.employeeId = parseInt(employeeId);

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    res.json({ 
      success: true, 
      data: task,
      message: 'Task updated successfully' 
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update task',
      message: error.message 
    });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingTask) {
      return res.status(404).json({ 
        success: false, 
        error: 'Task not found' 
      });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.json({ 
      success: true, 
      message: 'Task deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete task',
      message: error.message 
    });
  }
};