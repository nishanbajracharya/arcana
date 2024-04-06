import React, {useEffect, useState} from "react";
import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Loader } from "../Common/Loader/Loader";
import axios from "axios";

const url = "http://localhost:3000/api/orchestra";
import {data} from './data';
import Icon from "../Icon";

import {Tooltip} from "@nextui-org/react";

export const DiagramCard = () => {

  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to the JSON Placeholder API
    axios.get(url)
      .then((response) => {
        // response.data = data;
        console.log(response.data.data);
                
        // Handle the response data (e.g., update state)
        const output = [];

        Object.keys(response.data.data).forEach((key) => {
          response.data.data[key].id = key;
          output.push(response.data.data[key]);
        });

        setCards(output);
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
        <div className="flex flex-row flex-wrap">
          {cards.map((card: any) => (
            <div className="m-5 min-w-[300px]" onClick={() => goToEdit(card)} key={card.id}>
              <Link href={{ pathname: "/diagram", query: {data: JSON.stringify(card)} }}>
                <div className="border-1 rounded flex flex-col justify-between p-3 h-36 max-w-80">
                  <div>
                    <div className="">
                      <p className="font-bold">{card.name}</p>
                      <p>{card.id}</p>
                      {/* <HiDotsHorizontal
                        size={24}
                        style={{
                          color: "#000000",
                        }}
                      /> */}
                    </div>
                    <div className="mt-2 flex  justify-start">
                      {
                        card && card.nodes && card.nodes.map((node: any) => {
                          return <Tooltip placement="bottom" content={node.displayName} key={node}><span><Icon name={node.name} className="m-1"/></span></Tooltip>
                        })
                      }
                    </div>
                  </div>

                  <div></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
