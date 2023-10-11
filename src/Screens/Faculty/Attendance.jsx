import React from "react";

function Attendance() {
  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Attendance`} />
      </div>
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="mb-4 text-xl font-medium">Select Class for Attendance</p>

          <select
            name="class name"
            id="class"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
          >
            <option defaultValue>-- Select Class --</option>
            <option value="1">BE-I</option>
            <option value="2">BE-II</option>
            <option value="3">BE-III</option>
            <option value="4">BE-IV</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
