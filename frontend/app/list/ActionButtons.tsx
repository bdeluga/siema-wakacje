"use client";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { env } from "~/env.mjs";
import { useRouter } from "next/navigation";
interface Props {
  id: string;
}

const ActionButtons = ({ id }: Props) => {
  const { refresh } = useRouter();
  const handleEdit = () => {
    console.log("todo");
  };
  const handleDelete = async () => {
    fetch(`${env.NEXT_PUBLIC_API_URL}/plan/remove/?id=${id}`, {
      method: "DELETE",
    }).then((res) => refresh());
  };

  return (
    <>
      <button className="text-lg btn btn-ghost">
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button className="text-lg btn btn-ghost" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </>
  );
};

export default ActionButtons;
