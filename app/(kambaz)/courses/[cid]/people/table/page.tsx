"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PeopleTable from "../Table";
import * as coursesClient from "../../../client";

export default function CoursePeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid) return;
    const data = await coursesClient.findUsersForCourse(cid as string);
    setUsers(data);
  };

  useEffect(() => {
    void fetchUsers();
  }, [cid]);

  return (
    <div className="p-3">
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
