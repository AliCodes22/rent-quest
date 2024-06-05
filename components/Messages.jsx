"use client";

import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
          isLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return <div></div>;
};

export default Messages;
