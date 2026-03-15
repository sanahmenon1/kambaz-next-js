"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button, Form, InputGroup, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaPlus, FaFilePen } from "react-icons/fa6";
import { FaSearch, FaTrash } from "react-icons/fa";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical, IoChevronDown } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const isFaculty = currentUser?.role === "FACULTY";

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  const handleDeleteClick = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup className="w-50">
          <InputGroupText>
            <FaSearch />
          </InputGroupText>
          <Form.Control
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>
        {isFaculty && (
          <div>
            <Button variant="secondary" size="lg" className="me-1" id="wd-add-assignment-group">
              <FaPlus className="me-2" />
              Group
            </Button>
            <Link href={`/courses/${cid}/assignments/new`} className="btn btn-danger btn-lg me-1" id="wd-add-assignment">
              <FaPlus className="me-2" />
              Assignment
            </Link>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="d-flex align-items-center p-3 wd-title border border-bottom-0">
          <BsGripVertical className="me-2 fs-4" />
          <IoChevronDown className="me-2 fs-5" />
          <span className="fw-bold me-2">ASSIGNMENTS</span>
          <span className="me-auto"></span>
          <span className="border rounded-pill px-3 py-1 me-2 text-muted fs-6">40% of Total</span>
          <BsPlus className="fs-4 me-2" />
          <IoEllipsisVertical className="fs-4" />
        </div>

        <ListGroup className="rounded-0" id="wd-assignment-list">
          {courseAssignments.map((assignment: any) => (
            <ListGroupItem key={assignment._id} className="wd-assignment-list-item p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-4 mt-2" />
                <FaFilePen className="me-2 fs-4 mt-2 text-success" />
                <div className="flex-fill">
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="wd-assignment-link fw-bold text-decoration-none text-dark fs-5"
                  >
                    {assignment.title}
                  </Link>
                  <br />
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <span className="text-muted fw-bold">Not available until</span>{" "}
                  <span className="text-muted">{assignment.availableFrom}</span> |
                  <br />
                  <span className="text-muted fw-bold">Due</span>{" "}
                  <span className="text-muted">{assignment.dueDate}</span> | {assignment.points} pts
                </div>
                <div className="d-flex align-items-center mt-2">
                  <GreenCheckmark />
                  {isFaculty && (
                    <FaTrash className="text-danger ms-2 me-2 cursor-pointer"
                      onClick={() => handleDeleteClick(assignment)}
                    />
                  )}
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>

      <div className="mb-4">
        <div className="d-flex align-items-center p-3 wd-title border border-bottom-0">
          <BsGripVertical className="me-2 fs-4" />
          <IoChevronDown className="me-2 fs-5" />
          <span className="fw-bold me-2">QUIZZES</span>
          <span className="me-auto"></span>
          <span className="border rounded-pill px-3 py-1 me-2 text-muted fs-6">10% of Total</span>
          <BsPlus className="fs-4 me-2" />
          <IoEllipsisVertical className="fs-4" />
        </div>
        <ListGroup className="rounded-0" id="wd-quiz-list">
        </ListGroup>
      </div>

      <div className="mb-4">
        <div className="d-flex align-items-center p-3 wd-title border border-bottom-0">
          <BsGripVertical className="me-2 fs-4" />
          <IoChevronDown className="me-2 fs-5" />
          <span className="fw-bold me-2">EXAMS</span>
          <span className="me-auto"></span>
          <span className="border rounded-pill px-3 py-1 me-2 text-muted fs-6">20% of Total</span>
          <BsPlus className="fs-4 me-2" />
          <IoEllipsisVertical className="fs-4" />
        </div>
        <ListGroup className="rounded-0" id="wd-exam-list">
        </ListGroup>
      </div>

      <div className="mb-4">
        <div className="d-flex align-items-center p-3 wd-title border border-bottom-0">
          <BsGripVertical className="me-2 fs-4" />
          <IoChevronDown className="me-2 fs-5" />
          <span className="fw-bold me-2">PROJECT</span>
          <span className="me-auto"></span>
          <span className="border rounded-pill px-3 py-1 me-2 text-muted fs-6">30% of Total</span>
          <BsPlus className="fs-4 me-2" />
          <IoEllipsisVertical className="fs-4" />
        </div>
        <ListGroup className="rounded-0" id="wd-project-list">
        </ListGroup>
      </div>

      {/* Delete Confirmation Dialog */}
      <Modal show={showDeleteDialog} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the assignment &quot;{assignmentToDelete?.title}&quot;?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
