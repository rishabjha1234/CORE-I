import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"]
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true,
      unique: true
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true
    },
    marks: {
      type: Number,
      required: [true, "Marks are required"],
      min: [0, "Marks cannot be less than 0"],
      max: [100, "Marks cannot be greater than 100"]
    },
    result: {
      type: String,
      enum: ["Pass", "Fail"],
      required: [true, "Result is required"]
    }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
