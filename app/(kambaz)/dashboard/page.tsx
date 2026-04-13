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
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.png", description: "New Description"
  });

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(
    () => new Set()
  );
  const isFaculty = currentUser?.role === "FACULTY";

  /** Must reflect MongoDB enrollments (not static Redux seed) so refresh / Atlas stay correct. */
  const isEnrolled = (courseId: string) => enrolledCourseIds.has(courseId);

  const fetchMyCourses = async () => {
    try {
      const data = await client.findMyCourses();
      dispatch(setCourses(data));
      setEnrolledCourseIds(new Set(data.map((c: { _id: string }) => c._id)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, [currentUser]);

  const toggleEnrollmentsView = async () => {
    const next = !showAllCourses;
    setShowAllCourses(next);
    try {
      if (next) {
        const my = await client.findMyCourses();
        setEnrolledCourseIds(new Set(my.map((c: { _id: string }) => c._id)));
        const all = await client.fetchAllCourses();
        dispatch(setCourses(all));
      } else {
        await fetchMyCourses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isNewCourseDraft = course._id === "0";

  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
      setEnrolledCourseIds((prev) => new Set(prev).add(newCourse._id));
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.png",
        description: "New Description",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdateCourse = async () => {
    if (isNewCourseDraft) return;
    try {
      const updated = await client.updateCourse(course);
      dispatch(
        setCourses(
          courses.map((c) => (c._id === course._id ? updated : c))
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
    dispatch(enroll({ userId: currentUser._id, courseId }));
    setEnrolledCourseIds((prev) => new Set(prev).add(courseId));
    if (showAllCourses) {
      const all = await client.fetchAllCourses();
      dispatch(setCourses(all));
    } else {
      await fetchMyCourses();
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
    dispatch(unenroll({ userId: currentUser._id, courseId }));
    setEnrolledCourseIds((prev) => {
      const next = new Set(prev);
      next.delete(courseId);
      return next;
    });
    if (showAllCourses) {
      const all = await client.fetchAllCourses();
      dispatch(setCourses(all));
    } else {
      await fetchMyCourses();
    }
  };

  /** When not in "all courses" mode, list is already from findMyCourses (Mongo enrollments). */
  const filteredCourses = !currentUser
    ? []
    : showAllCourses
      ? courses
      : courses;

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">
        Dashboard
        {currentUser && (
          <Button variant="primary" className="float-end"
            onClick={() => void toggleEnrollmentsView()}>
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
              onClick={() => void onUpdateCourse()}
              id="wd-update-course-click"
              disabled={isNewCourseDraft}
              title={isNewCourseDraft ? "Click Edit on a course card first" : undefined}>
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
                <Link href={isEnrolled(course._id) ? `/courses/${course._id}/home` : `/dashboard`}
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