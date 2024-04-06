import React, {useEffect, useState} from "react";
import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Loader } from "../Common/Loader/Loader";
import axios from "axios";

const url = "http://localhost:3000/api/orchestra";
import {data} from './data';

export const DiagramCard = () => {

  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to the JSON Placeholder API
    axios.get(url)
      .then((response) => {
        response.data = data;
                
        // Handle the response data (e.g., update state)
        setCards(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors (e.g., show an error message)
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);


  const goToEdit = (card) => {
  
  }


  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          {cards.map((card: any) => (
            <Link href={{ pathname: "/diagram", query: {data: JSON.stringify(card)} }} key={card.id}>
              <div className="mt-5" onClick={() => goToEdit(card)}>
                <div className="flex flex-col justify-between border-slate-950 p-3 h-64 max-w-80">
                  <div>
                    <div className="flex flex-row justify-between items-center">
                      <span className="font-bold">Flow Continue</span>
                      <HiDotsHorizontal
                        size={24}
                        style={{
                          color: "#000000",
                        }}
                      />
                    </div>
                    <div className="mt-2 flex flex-col justify-start">
                      <span className="flex-wrap text-sm">
                        asdasd123123asdasd987
                      </span>
                      <span className="flex-wrap text-sm">
                        Last Updated On : 07/04/2024, 12:36:33
                      </span>
                    </div>
                  </div>

                  <div>asdasdasd</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
