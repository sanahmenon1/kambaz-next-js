"use client"
import { useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse} from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";


export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.png", description: "New Description"
  });

  const isEnrolled = (courseId: string) => {
    return currentUser && enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );
  };

  const filteredCourses = showAllCourses
    ? courses
    : courses.filter((c: any) =>
        !currentUser || enrollments.some(
          (e: any) => e.user === currentUser._id && e.course === c._id
        )
      );

 return (
  <div id="wd-dashboard" className="p-3">
   <h1 id="wd-dashboard-title">Dashboard
     <Button variant="primary" className="float-end"
       onClick={() => setShowAllCourses(!showAllCourses)}>
       Enrollments
     </Button>
   </h1> <hr />
   <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={() => dispatch(addNewCourse(course))} > Add </button>
      <button className="btn btn-warning float-end me-2"
                onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
          Update </button>
    </h5> <br />
      <FormControl value={course.name} className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <FormControl as="textarea" value={course.description} rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value }) } />


    <hr />
   <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
   <div id="wd-dashboard-courses">
    <Row xs={1} md={5} className="g-4">
     {filteredCourses
     .map((course: any) => (
     <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
      <Card>
       <Link href={
         isEnrolled(course._id) ? `/courses/${course._id}/home` : "/dashboard"
       }
        className="wd-dashboard-course-link text-decoration-none text-dark" >
        <CardImg src={course.image} variant="top" width="100%" height={160} />
        <CardBody className="card-body">
         <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
          {course.name} </CardTitle>
         <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
          {course.description} </CardText>
         <Button variant="primary"> Go </Button>

         {showAllCourses && currentUser && (
           isEnrolled(course._id) ? (
             <Button variant="danger" className="float-end"
               onClick={(e) => {
                 e.preventDefault();
                 dispatch(unenroll({ userId: currentUser._id, courseId: course._id }));
               }}>
               Unenroll
             </Button>
           ) : (
             <Button variant="success" className="float-end"
               onClick={(e) => {
                 e.preventDefault();
                 dispatch(enroll({ userId: currentUser._id, courseId: course._id }));
               }}>
               Enroll
             </Button>
           )
         )}

         {!showAllCourses && (
           <>
             <Button onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(course._id)); 
                        }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
              </Button>
             <button id="wd-edit-course-click"
               onClick={(event) => {
                 event.preventDefault();
                 setCourse(course);
               }}
               className="btn btn-warning me-2 float-end" >
               Edit
             </button>
           </>
         )}

        </CardBody>
       </Link>
      </Card>
     </Col>
    ))}
   </Row>
  </div>
 </div>);
}
