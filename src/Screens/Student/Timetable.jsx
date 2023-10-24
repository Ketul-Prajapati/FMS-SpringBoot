import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";
const Timetable = () => {
  const [timetable, setTimetable] = useState("");
  const { userData } = useSelector((state) => state);

  useEffect(() => {
    const getTimetable = () => {
      const headers = {
        "Content-Type": "application/json",
      };
      if (userData.class === 'BE-I') {
        axios
          .post(
            `${baseApiURL()}/timetable/getTimetable`,
            { semester: [1, 2] },
            {
              headers: headers,
            }
          )
          .then((response) => {
            if (response.data) {
              // console.log(response.data)
              setTimetable(response.data);
            }
          })
          .catch((error) => {
            toast.dismiss();
            toast.error(error.response.data.message);
          });
      }
      else if (userData.class === 'BE-II') {
        axios
          .post(
            `${baseApiURL()}/timetable/getTimetable`,
            { semester: [3, 4] },
            {
              headers: headers,
            }
          )
          .then((response) => {
            if (response.data) {
              // console.log(response.data)
              setTimetable(response.data);
            }
          })
          .catch((error) => {
            toast.dismiss();
            toast.error(error.response.data.message);
          });
      }
      else if (userData.class === 'BE-III') {
        axios
          .post(
            `${baseApiURL()}/timetable/getTimetable`,
            { semester: [5, 6] },
            {
              headers: headers,
            }
          )
          .then((response) => {
            if (response.data) {
              // console.log(response.data)
              setTimetable(response.data);
            }
          })
          .catch((error) => {
            toast.dismiss();
            toast.error(error.response.data.message);
          });
      }
      else if (userData.class === 'BE-IV') {
        axios
          .post(
            `${baseApiURL()}/timetable/getTimetable`,
            { semester: [7, 8] },
            {
              headers: headers,
            }
          )
          .then((response) => {
            if (response.data) {
              // console.log(response.data)
              setTimetable(response.data);
            }
          })
          .catch((error) => {
            toast.dismiss();
            toast.error(error.response.data.message);
          });
      }
      else if (userData.class === 'MCA-I') {
        axios
          .post(
            `${baseApiURL()}/timetable/getTimetable`,
            { semester: [1, 2] },
            {
              headers: headers,
            }
          )
          .then((response) => {
            if (response.data) {
              // console.log(response.data)
              setTimetable(response.data);
            }
          })
          .catch((error) => {
            toast.dismiss();
            toast.error(error.response.data.message);
          });
      }
      else if (userData.class === 'MCA-II') {
        axios
          .post(
            `${baseApiURL()}/timetable/getTimetable`,
            { semester: [3, 4] },
            {
              headers: headers,
            }
          )
          .then((response) => {
            if (response.data) {
              // console.log(response.data)
              setTimetable(response.data);
            }
          })
          .catch((error) => {
            toast.dismiss();
            toast.error(error.response.data.message);
          });
      }
    };
    userData && getTimetable();
  }, [userData, userData.semester]);

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Timetable of ${userData.class}`} />
        <p
          className="flex justify-center items-center text-lg font-medium cursor-pointer hover:text-red-500 hover:scale-110 ease-linear transition-all duration-200 hover:duration-200 hover:ease-linear hover:transition-all"
          onClick={() => { if (timetable[0]) { window.open(timetable[0].link) } if (timetable[1]) { window.open(timetable[1].link) } }}
        >
          Download
          <span className="ml-2">
            <FiDownload />
          </span>
        </p>
      </div>
      {timetable && (
        timetable.map((item) => [
          <img
            className="mt-8 rounded-lg shadow-md w-[50%] mx-auto"
            src={item.link}
            alt="timetable"
          />
        ])
      )}
      {timetable.length===0 && (
        <p className="mt-10">No Timetable Available At The Moment!</p>
      )}
    </div>
  );
};

export default Timetable;


// timetable.map((timetable) => [
// <img
//         className="mt-8 rounded-lg shadow-md w-[50%] mx-auto"
//         src={timetable}
//         alt="timetable"
//       />
// ])