"use client"
import { useParams, useRouter } from "next/navigation";
import Form from 'react-bootstrap/Form';
import { FormLabel, FormControl, FormSelect, FormCheck, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { useState } from "react";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

    const isNew = aid === "new";
    const existingAssignment = assignments.find((a: any) => a._id === aid);

    const [assignment, setAssignment] = useState<any>(
      !isNew && existingAssignment
        ? existingAssignment
        : {
            _id: "",
            title: "New Assignment",
            course: cid as string,
            description: "New Assignment Description",
            points: 100,
            group: "ASSIGNMENTS",
            displayGradeAs: "Percentage",
            submissionType: "Online",
            assignTo: "Everyone",
            dueDate: "",
            availableFrom: "",
            availableUntil: "",
          }
    );

    const handleSave = () => {
      if (isNew) {
        dispatch(addAssignment({ ...assignment, course: cid }));
      } else {
        dispatch(updateAssignment(assignment));
      }
      router.push(`/courses/${cid}/assignments`);
    };

    const handleCancel = () => {
      router.push(`/courses/${cid}/assignments`);
    };

    return (
      <div id="wd-assignments-editor" className="p-3">
        <Form>
            <div className="mb-3">
                <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
                <FormControl id="wd-name" type="text"
                  value={assignment.title}
                  onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
            </div>

            <div className="mb-3">
                <FormControl as="textarea" id="wd-description" rows={10}
                  value={assignment.description}
                  onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
            </div>

            <Row className="mb-3">
                <FormLabel column sm={4} className="text-end">Points</FormLabel>
                <Col sm={8}>
                    <FormControl id="wd-points" type="number"
                      value={assignment.points}
                      onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })} />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={4} className="text-end">Assignment Group</FormLabel>
                <Col sm={8}>
                    <FormSelect id="wd-group"
                      value={assignment.group}
                      onChange={(e) => setAssignment({ ...assignment, group: e.target.value })}>
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                        <option value="EXAMS">EXAMS</option>
                        <option value="PROJECT">PROJECT</option>
                    </FormSelect>
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={4} className="text-end">Display Grade as</FormLabel>
                <Col sm={8}>
                    <FormSelect id="wd-display-grade-as"
                      value={assignment.displayGradeAs}
                      onChange={(e) => setAssignment({ ...assignment, displayGradeAs: e.target.value })}>
                        <option value="Percentage">Percentage</option>
                        <option value="Points">Points</option>
                    </FormSelect>
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={4} className="text-end">Submission Type</FormLabel>
                <Col sm={8}>
                    <div className="border rounded p-3">
                        <div className="mb-3">
                            <FormSelect id="wd-submission-type"
                              value={assignment.submissionType}
                              onChange={(e) => setAssignment({ ...assignment, submissionType: e.target.value })}>
                                <option value="Online">Online</option>
                                <option value="On Paper">On Paper</option>
                            </FormSelect>
                        </div>
                        <div className="mb-3">
                            <FormLabel className="fw-bold">Online Entry Options</FormLabel>
                            <div>
                                <FormCheck type="checkbox" label="Text Entry" id="wd-text-entry" className="mb-2" />
                                <FormCheck type="checkbox" label="Website URL" id="wd-website-url" className="mb-2" defaultChecked />
                                <FormCheck type="checkbox" label="Media Recordings" id="wd-media-recordings" className="mb-2" />
                                <FormCheck type="checkbox" label="Student Annotation" id="wd-student-annotation" className="mb-2" />
                                <FormCheck type="checkbox" label="File Uploads" id="wd-file-upload" className="mb-2" />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={4} className="text-end">Assign</FormLabel>
                <Col sm={8}>
                    <div className="border rounded p-3">
                        <div className="mb-3">
                            <FormLabel htmlFor="wd-assign-to" className="fw-bold">Assign to</FormLabel>
                            <FormControl id="wd-assign-to" type="text"
                              value={assignment.assignTo}
                              onChange={(e) => setAssignment({ ...assignment, assignTo: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
                            <FormControl id="wd-due-date" type="date"
                              value={assignment.dueDate}
                              onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} />
                        </div>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                                    <FormControl id="wd-available-from" type="date"
                                      value={assignment.availableFrom}
                                      onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                                    <FormControl id="wd-available-until" type="date"
                                      value={assignment.availableUntil}
                                      onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <hr />
            <div className="text-end">
                <Button variant="secondary" className="me-2" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </Form>
      </div>
    );
}
