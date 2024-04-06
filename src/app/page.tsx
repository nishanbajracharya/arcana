import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";



export default function Home() {
  return (
    <div>
    <div className="bg-white p-4">
      <div className="flex flex-row justify-between items-center">
        <span className="text-black">Architectures</span>
        <div className="flex flex-row justify-between items-center w-3/12">
          <div className="flex flex-row justify-between items-center border-slate-950	border-2 p-1">
            <BsSearch
              size={24}
              style={{
                color: '#000000',
              }}
            />
            <input
                type="text"
                className="w-full h-6 p-2 text-black"
            />
          </div>
          <button className="flex flex-row justify-between items-center bg-slate-300 p-2">
            <GrAddCircle
              size={18}
              style={{
                color: '#000000',
              }}
            />
            <span className="text-black ml-2 text-sm">Create New</span>
          </button>
        </div>
      </div>

      {/* <div>
        <div className="h- w-5 bg-slate-400">

        </div>
      </div> */}

      <div className="mt-5">
        <div className="flex flex-col justify-between border-slate-950 border-2 p-3 h-64 max-w-80">
            <div>
              <div className="flex flex-row justify-between items-center">
                <span className="font-bold">Flow Continue</span>
                <HiDotsHorizontal
                  size={24}
                  style={{
                    color: '#000000',
                  }}
                  />  
              </div>
              <div className="mt-2 flex flex-col justify-start">
                <span className="flex-wrap text-sm">asdasd123123asdasd987</span>
                <span className="flex-wrap text-sm">Last Updated On : 07/04/2024, 12:36:33</span>
              </div>
            </div>
          
            <div>
              asdasdasd
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}
