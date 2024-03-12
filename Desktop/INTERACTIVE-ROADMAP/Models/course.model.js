import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true
    },
    focus: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    }
  },
  { 
    timestamps: true 
  }
);

export const Course = mongoose.model('Course', courseSchema);
