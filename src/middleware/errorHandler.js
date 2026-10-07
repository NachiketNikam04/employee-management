import { Prisma } from "@prisma/client";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Prisma unique constraint violation
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A record with this value already exists"
      });
    }

    // Prisma record not found
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }
  }

  // Default server error
  return res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};