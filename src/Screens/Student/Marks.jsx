import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";

const Marks = () => {
  const { userData } = useSelector((state) => state);
  const [internal, setInternal] = useState();

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/marks/getMarks`,
        { enrollmentNo: userData.enrollmentNo },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data) {
          if(response.data.Mark.length===0){
            setInternal(response.data.Mark);
          }
          else { setInternal(response.data.Mark[0].internal)}
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  }, [userData.enrollmentNo]);

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title={`Marks of ${userData.class}`} />
      <div className="mt-14 w-full flex justify-center items-center gap-20">
        {internal && internal.length!==0&& (
          <div className="w-1/2 shadow-md p-4">
            <p className="border-b-2 border-red-500 text-2xl font-semibold pb-2">
              Internal Marks (Out of 20)
            </p>
            <div className="mt-5">
              {Object.keys(internal).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full text-lg mt-2"
                  >
                    <p className="w-full">{item}</p>
                    <span>{internal[item]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {internal && internal.length===0 && <p>No Marks Available At The Moment!</p>}
      </div>
    </div>
  );
};

export default Marks;
