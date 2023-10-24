import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { MdOutlineDelete } from "react-icons/md";
import { baseApiURL } from "../../baseUrl";
import { FaListUl } from "react-icons/fa";

const Subjects = () => {
  const [data, setData] = useState({
    name: "",
    code: "",
    semester: ""
  });
  const [search, setSearch] = useState();
  const [selected, setSelected] = useState("add");
  const [subject, setSubject] = useState();

  const getSubjectHandler = (e) => {
    // e.preventDefault();
    toast.loading("Getting Subjects");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/subject/getSubject`,{ semester: search },{headers})
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if(response.data.subject.length === 0) {
            toast.error("No Subject Found!");
            setSubject();
          }
          else{
            toast.success(response.data.message);
            setSubject(response.data.subject);
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const addSubjectHandler = () => {
    toast.loading("Adding Subject");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/subject/addSubject`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setData({ name: "", code: "" ,semester: ""});
          // getSubjectHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteSubjectHandler = (id) => {
    toast.loading("Deleting Suject");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .delete(`${baseApiURL()}/subject/deleteSubject/${id}`, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getSubjectHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Add Subject" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "add" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setSelected("add")}
          >
            Add Subject
          </button>
          <button
            className={`${selected === "view" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setSelected("view")}
          >
            View Subject
          </button>
        </div>
      </div>
      {selected === "add" && (
        <div className="flex flex-col justify-center items-center w-full mt-8">
          <div className="w-[40%] mb-4">
            <label htmlFor="semester" className="leading-7 text-sm ">
              Select Semester
            </label>
            <select
              id="semester"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.semester}
              onChange={(e) => setData({ ...data, semester: e.target.value })}
            >
              <option defaultValue>-- Select Semester --</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
          </div>
          <div className="w-[40%] mb-4">
            <label htmlFor="code" className="leading-7 text-sm">
              Enter Subject Code
            </label>
            <input
              type="number"
              id="code"
              value={data.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="name" className="leading-7 text-sm ">
              Enter Subject Name
            </label>
            <input
              type="name"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            className="mt-6 bg-blue-500 px-6 py-3 text-white"
            onClick={addSubjectHandler}
          >
            Add Subject
          </button>
        </div>
      )}
      {selected === "view" && (
        <>
        <div className="w-full flex justify-center items-center mt-12">
        <div className="w-full flex flex-col justify-center items-center">
          <p className="mb-4 text-xl font-medium">Select Semester To View</p>
          <div className="w-full flex justify-center items-center">
            <select
              name="semester name"
              id="semester"
              className="px-2 ml-40 bg-blue-50 py-3 rounded-sm text-base w-[40%] accent-blue-700 mt-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <option defaultValue>-- Select Semester --</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>
              <option value="7">7th Semester</option>
              <option value="8">8th Semester</option>
            </select>
            <button
              className="relative ml-3 mt-3 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
              onClick={getSubjectHandler}
            >
              View Subjects
              <span className="ml-2">
                <FaListUl className="text-red-500 text-xl" />
              </span>
            </button>
          </div>
        </div>
      </div>
        <div className="mt-8 w-full flex flex-col justify-center items-center">
          <ul className="w-full flex flex-col justify-center items-center">
            {subject &&
              subject.map((item) => {
                return (
                  <li
                    key={item.code}
                    className="bg-blue-100 py-3 px-6 mb-3 flex justify-between items-center w-[70%]"
                  >
                    <div>
                      {item.code} - {item.name}
                    </div>
                    <button
                      className="text-2xl hover:text-red-500"
                      onClick={() => deleteSubjectHandler(item._id)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
        </>
      )}
    </div>
  );
};

export default Subjects;
