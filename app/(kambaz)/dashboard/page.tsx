"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import * as client from "../courses/client";
import * as enrollmentClient from "../enrollments/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.png", description: "New Description"
  });

  const [showAllCourses, setShowAllCourses] = useState(false);
  const isFaculty = currentUser?.role === "FACULTY";

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e) => e.user === currentUser?._id && e.course === courseId
    );

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })));
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
    dispatch(enroll({ userId: currentUser._id, courseId }));
    fetchCourses();
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
    dispatch(unenroll({ userId: currentUser._id, courseId }));
    fetchCourses();
  };

  const filteredCourses = !currentUser
    ? []
    : showAllCourses
      ? courses
      : courses.filter((c) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">
        Dashboard
        {currentUser && (
          <Button variant="primary" className="float-end"
            onClick={() => setShowAllCourses(!showAllCourses)}>
            Enrollments
          </Button>
        )}
      </h1>
      <hr />
      {isFaculty && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}> Add </button>
            <button className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse} id="wd-update-course-click">
              Update </button>
          </h5> <br />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
              <Card>
                <Link href={isEnrolled(course._id) ? `/kambaz/courses/${course._id}/home` : `/kambaz/dashboard`}
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                  <CardImg src={course.image} variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </CardText>
                    <Button variant="primary"> Go </Button>
                    {isFaculty && (
                      <>
                        <Button onClick={(event) => {
                          event.preventDefault();
                          onDeleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </Button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end">
                          Edit
                        </button>
                      </>
                    )}
                    {showAllCourses && currentUser && (
                      isEnrolled(course._id) ? (
                        <Button variant="danger" className="float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            handleUnenroll(course._id);
                          }}>
                          Unenroll
                        </Button>
                      ) : (
                        <Button variant="success" className="float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            handleEnroll(course._id);
                          }}>
                          Enroll
                        </Button>
                      )
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}