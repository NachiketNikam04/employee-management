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