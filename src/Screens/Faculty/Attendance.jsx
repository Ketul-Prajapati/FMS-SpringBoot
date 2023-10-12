import React from "react";
import Heading from "../../components/Heading";

function Attendance() {
  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={Attendance} />
      </div>
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="mb-4 text-xl font-medium">Select Class for Attendance</p>

          <select
            name="class name"
            id="class"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
          >
            <option value="BE-I" defaultValue>BE-I</option>
            <option value="BE-II">BE-II</option>
            <option value="BE-III">BE-III</option>
            <option value="BE-IV">BE-IV</option>
            <option value="MCA-I">MCA-I</option>
            <option value="MCA-II">MCA-II</option>
          </select>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="mb-4 text-xl font-medium">Select Date</p>

          <input
            type="date"
            name="date"
            id="date"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
          />
        </div>

      </div>

      {/* Add your table here */}
      <table>
        {/* Add your table headers */}
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            <th>Present/Absent</th>
          </tr>
        </thead>

        {/* Add your table body */}
        <tbody>
          {/* Map through your students data and create a row for each student */}
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              {/* Add a checkbox or dropdown for marking attendance */}
              <td><input type='checkbox' checked={student.isPresent} onChange={() => handleAttendanceChange(index)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add your buttons here */}
      <button onClick={handleSubmit}>Submit Attendance</button>
      <button onClick={handleDownloadExcel}>Download Excel</button>
      <button onClick={handleDownloadPDF}>Download PDF</button>

    </div>
  );
}

export default Attendance;