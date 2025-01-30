import { useState } from "react";
import axios from "axios";

// Import user images
import FootballImage from "./../assets/football.jpg";
import FutsalImage from "./../assets/futsal.jpg";
import MinsocImage from "./../assets/minsoc.jpg";
import BadmintonImage from "./../assets/badminton.jpg";
import BasketballImage from "./../assets/basketball.jpg";
import Tennis from "./../assets/tenis (1).jpg";
import TennisTable from "./../assets/tenis-meja (1).jpg";
import Biliard from "./../assets/biliard (1).jpg";
import Golf from "./../assets/golf (1).jpg";
import Padel from "./../assets/padel (1).jpg";
import Squash from "./../assets/squash.jpeg";
import Hockey from "./../assets/hockey (1).jpg";
import Volley from "./../assets/volley (1).jpg";
import Running from "./../assets/running (1).jpg";
import Fitness from "./../assets/fitness (1).jpg";
import Poundfit from "./../assets/Poundfit.jpg";
import Yoga from "./../assets/yoga (1).jpg";
import Pilete from "./../assets/pilate (1).jpeg";
import Elektronik from "./../assets/elektronik (1).jpg";
import Aerobik from "./../assets/aerobik (1).jpeg";
import Swimming from "./../assets/swimming.jpg";

const useData = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [useUsers, setUseUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 6,
    total: 0,
    total_pages: null,
  });

  const getUseData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/sport-categories?is_paginate=true&per_page=${pagination.per_page}&page=${pagination.current_page}`
      );
      const result = response.data.result;

      setUseUsers(result.data);
      setPagination({
        current_page: result.current_page,
        per_page: result.per_page,
        total: result.total,
        total_pages: result.last_page,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    if (pagination.current_page < pagination.total_pages) {
      setPagination((prevState) => ({
        ...prevState,
        current_page: prevState.current_page + 1,
      }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.current_page > 1) {
      setPagination((prevState) => ({
        ...prevState,
        current_page: prevState.current_page - 1,
      }));
    }
  };

  const ratings = [
    {
      id: 1,
      user: { id: 101, name: "John Doe" },
      rating: 4.5,
      comment:
        "The court was in excellent condition, but the booking process could be improved.",
      timestamp: "2025-01-26T10:30:00Z",
    },
    {
      id: 2,
      user: { id: 102, name: "Jane Smith" },
      rating: 5.0,
      comment:
        "Had an amazing time! The staff was very accommodating, and the equipment was top-notch.",
      timestamp: "2025-01-25T15:45:00Z",
    },
    {
      id: 3,
      user: { id: 103, name: "Michael Johnson" },
      rating: 3.8,
      comment:
        "The experience was good overall, but the changing rooms need some improvement.",
      timestamp: "2025-01-24T12:15:00Z",
    },
    {
      id: 4,
      user: { id: 104, name: "Emily Davis" },
      rating: 4.0,
      comment:
        "Great atmosphere and well-maintained facilities. I would recommend this to my friends!",
      timestamp: "2025-01-23T09:20:00Z",
    },
    {
      id: 5,
      user: { id: 105, name: "Chris Brown" },
      rating: 2.5,
      comment:
        "The court was not properly cleaned, and the lighting was inadequate for evening games.",
      timestamp: "2025-01-22T08:50:00Z",
    },
    {
      id: 6,
      user: { id: 106, name: "Sarah Lee" },
      rating: 4.8,
      comment:
        "Fantastic experience! The court was well-maintained, and the booking system was smooth and easy to use.",
      timestamp: "2025-01-21T11:00:00Z",
    },
  ];

  const images = [
    { id: 1, name: "Football", image: FootballImage },
    { id: 2, name: "Futsal", image: FutsalImage },
    { id: 3, name: "Minsoc", image: MinsocImage },
    { id: 4, name: "Badminton", image: BadmintonImage },
    { id: 5, name: "Basketball", image: BasketballImage },
    { id: 6, name: "Tennis", image: Tennis },
    { id: 7, name: "Tennis Table", image: TennisTable },
    { id: 8, name: "Biliard", image: Biliard },
    { id: 9, name: "Golf", image: Golf },
    { id: 10, name: "Padel", image: Padel },
    { id: 11, name: "Squash", image: Squash },
    { id: 12, name: "Hockey", image: Hockey },
    { id: 13, name: "Volley", image: Volley },
    { id: 14, name: "Running", image: Running },
    { id: 15, name: "Fitness", image: Fitness },
    { id: 16, name: "Poundfit", image: Poundfit },
    { id: 17, name: "Yoga", image: Yoga },
    { id: 18, name: "Pilete", image: Pilete },
    { id: 20, name: "Elektronik", image: Elektronik },
    { id: 21, name: "Aerobik", image: Aerobik },
    { id: 19, name: "Aerobik", image: Aerobik },
    { id: 22, name: "Swimming", image: Swimming },
  ];

  return {
    getUseData,
    useUsers,
    pagination,
    ratings,
    handleNextPage,
    handlePreviousPage,
    images,
  };
};

export default useData;
