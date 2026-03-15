import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";
import { v4 as uuidv4 } from "uuid";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: enrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: { userId, courseId } }) => {
      const newEnrollment: Enrollment = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
      };
      state.enrollments.push(newEnrollment);
    },
    unenroll: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
