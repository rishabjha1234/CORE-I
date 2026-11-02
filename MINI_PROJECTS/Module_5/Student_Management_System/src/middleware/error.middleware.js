export function errorHandler(error, req, res, next) {
  if (error.code === 11000) {
    return res.status(409).json({ message: "Roll number already exists" });
  }

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map(
      (validationError) => validationError.message
    );

    return res.status(400).json({ message: "Validation failed", errors: messages });
  }

  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}
