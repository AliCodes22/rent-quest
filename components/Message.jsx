"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleReadClick = async (e) => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);

        if (read) {
          toast.success("Marked as read");
        } else {
          toast.success("Marked as new");
        }
      }
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setIsDeleted(true);
        toast.success("Message deleted");
      }
    } catch (error) {
      console.log(error);

      toast.error("Message not deleted");
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.userName}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <Link href="mailto:recipient@example.com" className="text-blue-500">
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <Link href="tel:123-456-7890" className="text-blue-500">
            {message.phone}
          </Link>
        </li>
        <li>
          <strong>Received:</strong>
          {message.createdAt.toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`"mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        }  py-1 px-3 rounded-md"`}
      >
        {isRead ? "Mark as New" : "Mark as read"}
      </button>
      <button
        className={`"mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        }  py-1 px-3 rounded-md"`}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
