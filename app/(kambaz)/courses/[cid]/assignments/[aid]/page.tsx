"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import { FormLabel, FormControl, FormSelect, FormCheck, Row, Col } from 'react-bootstrap';
import * as db from "../../../../database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = db.assignments.find((a: any) => a._id === aid);

    return (
      <div id="wd-assignments-editor" className="p-3">
        <Form>
            <div className="mb-3">
                <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
                <FormControl id="wd-name" type="text" defaultValue={assignment?.title ?? ""} />
            </div>

            <div className="mb-3">
                <FormControl as="textarea" id="wd-description" rows={10} defaultValue={assignment?.description ?? ""} />
            </div>

            <Row className="mb-3">
                <FormLabel column sm={4} className="text-end">Points</FormLabel>
                <Col sm={8}>
                    <FormControl id="wd-points" type="number" defaultValue={assignment?.points ?? 100} />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel column sm={4} className="text-end">Assignment Group</FormLabel>
                <Col sm={8}>
                    <FormSelect id="wd-group" defaultValue={assignment?.group ?? "ASSIGNMENTS"}>
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
                    <FormSelect id="wd-display-grade-as" defaultValue={assignment?.displayGradeAs ?? "Percentage"}>
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
                            <FormSelect id="wd-submission-type" defaultValue={assignment?.submissionType ?? "Online"}>
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
                            <FormControl id="wd-assign-to" type="text" defaultValue={assignment?.assignTo ?? "Everyone"} />
                        </div>
                        <div className="mb-3">
                            <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
                            <FormControl id="wd-due-date" type="date" defaultValue={assignment?.dueDate ?? ""} />
                        </div>
                        <Row>
                            <Col md={6}>
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                                    <FormControl id="wd-available-from" type="date" defaultValue={assignment?.availableFrom ?? ""} />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="mb-3">
                                    <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                                    <FormControl id="wd-available-until" type="date" defaultValue={assignment?.availableUntil ?? ""} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <hr />
            <div className="text-end">
                <Link href={`/courses/${cid}/assignments`} className="btn btn-secondary me-2">
                    Cancel
                </Link>
                <Link href={`/courses/${cid}/assignments`} className="btn btn-danger">
                    Save
                </Link>
            </div>
        </Form>
      </div>
    );
}