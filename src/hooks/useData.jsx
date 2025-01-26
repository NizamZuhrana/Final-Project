import { useState } from "react";
import axios from "axios";
import { comment } from "postcss";

const useData = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [useUsers, setUseUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 5,
    total: null,
    total_pages: null,
  });

  const getUseData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/sport-categories?is_paginate=true&per_page=5&page=1`
      );
      setUseUsers(response.data.result.data);
      console.log(response);
      // setPagination({
      //   page: response.data.meta.current_page,
      //   per_page: response.data.meta.per_page,
      //   total: response.data.meta.total,
      //   total_pages: response.data.meta.last_page,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const ratings = [
    {
      id: 1,
      user: { id: 101, name: "John Doe" },
      rating: 4.5,
      comment: "The court was in excellent condition, but the booking process could be improved.",
      timestamp: "2025-01-26T10:30:00Z"
    },
    {
      id: 2,
      user: { id: 102, name: "Jane Smith" },
      rating: 5.0,
      comment: "Had an amazing time! The staff was very accommodating, and the equipment was top-notch.",
      timestamp: "2025-01-25T15:45:00Z"
    },
    {
      id: 3,
      user: { id: 103, name: "Michael Johnson"},
      rating: 3.8,
      comment: "The experience was good overall, but the changing rooms need some improvement.",
      timestamp: "2025-01-24T12:15:00Z"
    },
    {
      id: 4,
      user: {id: 104, name: "Emily Davis" },
      rating: 4.0,
      comment: "Great atmosphere and well-maintained facilities. I would recommend this to my friends!",
      timestamp: "2025-01-23T09:20:00Z"
    },
    {
      id: 5,
      user: {id: 105, name: "Chris Brown" },
      rating: 2.5,
      comment: "The court was not properly cleaned, and the lighting was inadequate for evening games.",
      timestamp: "2025-01-22T08:50:00Z"
    },
    {
      id: 6,
      user: {id: 106, name: "Sarah Lee" },
      rating: 4.8,
      comment: "Fantastic experience! The court was well-maintained, and the booking system was smooth and easy to use.",
      timestamp: "2025-01-21T11:00:00Z"
    }
];



  
  return { getUseData, useUsers, pagination, ratings };
};

export default useData;
