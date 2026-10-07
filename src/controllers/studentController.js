import prisma from "../lib/prisma.js";

// GET /api/students
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        id: "asc"
      }
    });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error("Error fetching students:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students"
    });
  }
};

// GET /api/students/:id
export const getStudentById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID"
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        id
      }
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error("Error fetching student:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student"
    });
  }
};

// POST /api/students
export const createStudent = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;

    // Validate required fields
    if (!name || !email || age === undefined || !course) {
      return res.status(400).json({
        success: false,
        message: "Name, email, age and course are required"
      });
    }

    // Validate name
    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters long"
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof email !== "string" || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Validate age
    if (
      !Number.isInteger(age) ||
      age < 16 ||
      age > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Age must be an integer between 16 and 100"
      });
    }

    // Validate course
    if (typeof course !== "string" || course.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Course must be at least 2 characters long"
      });
    }

    // Check whether email already exists
    const existingStudent = await prisma.student.findUnique({
      where: {
        email: email.toLowerCase().trim()
      }
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "A student with this email already exists"
      });
    }

    // Create student
    const student = await prisma.student.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        age,
        course: course.trim()
      }
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student
    });
  } catch (error) {
    console.error("Error creating student:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create student"
    });
  }
};

// PUT /api/students/:id
export const updateStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID"
      });
    }

    const { name, email, age, course } = req.body;

    // Validate required fields
    if (!name || !email || age === undefined || !course) {
      return res.status(400).json({
        success: false,
        message: "Name, email, age and course are required"
      });
    }

    // Validate name
    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters long"
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof email !== "string" || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Validate age
    if (
      !Number.isInteger(age) ||
      age < 16 ||
      age > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Age must be an integer between 16 and 100"
      });
    }

    // Validate course
    if (typeof course !== "string" || course.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Course must be at least 2 characters long"
      });
    }

    // Check whether student exists
    const existingStudent = await prisma.student.findUnique({
      where: {
        id
      }
    });

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // Check whether another student already uses this email
    const studentWithEmail = await prisma.student.findUnique({
      where: {
        email: email.toLowerCase().trim()
      }
    });

    if (studentWithEmail && studentWithEmail.id !== id) {
      return res.status(409).json({
        success: false,
        message: "A student with this email already exists"
      });
    }

    // Update student
    const updatedStudent = await prisma.student.update({
      where: {
        id
      },
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        age,
        course: course.trim()
      }
    });

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent
    });
  } catch (error) {
    console.error("Error updating student:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update student"
    });
  }
};

// DELETE /api/students/:id
export const deleteStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID"
      });
    }

    // Check whether student exists
    const existingStudent = await prisma.student.findUnique({
      where: {
        id
      }
    });

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // Delete student
    await prisma.student.delete({
      where: {
        id
      }
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting student:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete student"
    });
  }
};