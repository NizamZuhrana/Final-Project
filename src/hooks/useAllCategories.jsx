import { useState, useEffect } from "react";
import axios from "axios";

// Import user images
import FootballImage from "./../assets/football.jpg";
import FutsalImage from "./../assets/futsal.jpg";
import MinsocImage from "./../assets/minsoc2.jpg";
import BadmintonImage from "./../assets/badminton.jpg";
import BasketballImage from "./../assets/basketball.jpg";
import Tennis from "./../assets/tenis (3).jpg";
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

export const useAllCategories = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [categories, setCategories] = useState([]);
  
  const getUseData = async () => {
      let allCategories = [];
    try {
      let current_page = 1;
      let total_page = 1;
      while (current_page <= total_page) {
      const response = await axios.get(
        `${BASE_URL}/sport-categories?page=${current_page}`
      );
      if (response.data.result && response.data.result.data) {
        allCategories = [...allCategories, ...response.data.result.data];
        total_page = response.data.result.last_page;
      }else{
        throw new Error("Data not found");
      }
      current_page++;
      }
      setCategories(allCategories);
      console.log("ini gatau", categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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

  useEffect(() => {
    getUseData();
  }, []);

  return { categories, images };
};
