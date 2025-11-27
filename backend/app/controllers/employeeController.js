const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ success: true, data: employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch employees',
      message: error.message 
    });
  }
};

// Get single employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
      include: {
        tasks: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: { tasks: true }
        }
      }
    });

    if (!employee) {
      return res.status(404).json({ 
        success: false, 
        error: 'Employee not found' 
      });
    }

    res.json({ success: true, data: employee });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch employee',
      message: error.message 
    });
  }
};

// Create new employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and Email are required' 
      });
    }

    // Check if email already exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { email }
    });

    if (existingEmployee) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email already exists' 
      });
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        role: role || 'USER'
      }
    });

    res.status(201).json({ 
      success: true, 
      data: employee,
      message: 'Employee created successfully' 
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create employee',
      message: error.message 
    });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingEmployee) {
      return res.status(404).json({ 
        success: false, 
        error: 'Employee not found' 
      });
    }

    // If email is being updated, check for duplicates
    if (email && email !== existingEmployee.email) {
      const emailExists = await prisma.employee.findUnique({
        where: { email }
      });

      if (emailExists) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email already exists' 
        });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;

    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({ 
      success: true, 
      data: employee,
      message: 'Employee updated successfully' 
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update employee',
      message: error.message 
    });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingEmployee) {
      return res.status(404).json({ 
        success: false, 
        error: 'Employee not found' 
      });
    }

    // Delete employee (cascade will delete associated tasks)
    await prisma.employee.delete({
      where: { id: parseInt(id) }
    });

    res.json({ 
      success: true, 
      message: 'Employee deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete employee',
      message: error.message 
    });
  }
};