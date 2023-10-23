import React, { useState } from "react";
import "jspdf-autotable";
import { SlNote } from "react-icons/sl";
import { FaFilePdf ,FaFileExcel } from "react-icons/fa";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

function Attendance() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Updated searchStudentHandler to fix setting state
  const searchStudentHandler = (e) => {
    e.preventDefault();
    toast.loading("Getting students list");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { class: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length === 0) {
            toast.error("No Students Found!");
            setShowTable(false);
          } else {
            toast.success(response.data.message);
            setStudents(response.data.user);
            setShowTable(true);
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const handleAttendanceChange = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].isPresent = !updatedStudents[index].isPresent;
    setStudents(updatedStudents);
  };

  const exportFileName = () => {
    const currentDateTime = dayjs().format("DD-MM-YYYY HH:mm");
    return `${search}_Attendance_${currentDateTime}`;
  };

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["SR NO","PRN", "Name", "Present/Absent"],
      ...students.map((student,index) => [
        index+1,student.enrollmentNo,
        `${student.lastName} ${student.firstName} ${student.middleName}`,
        student.isPresent ? "Present" : "Absent",
      ]),
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "Attendance Sheet");
    XLSX.writeFile(wb, `${exportFileName()}.xlsx`);
  };

  const handleDownloadPDF = () => {
    // Importing 'jspdf' library
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF.default();
      doc.setFont("helvetica"); // Set font type
      doc.setFontSize(12); // Set font size
      const pdfTitle = `Attendance Of Class ${search} - ${dayjs().format("DD-MM-YYYY HH:mm")}`;
      doc.text(pdfTitle, 60, 10);
      const columns = ["SR NO","PRN", "NAME", "PRESENT/ABSENT"];
      const rows = students.map((student,index) => [
        index+1,student.enrollmentNo,
        `${student.lastName} ${student.firstName} ${student.middleName}`,
        student.isPresent ? "Present" : "Absent",
      ]);
      doc.autoTable({
        head: [columns],
        body: rows,
      });
      doc.save(`${exportFileName()}.pdf`);
    });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Attendance`} />
      </div>
      <div className="w-full flex justify-center items-center mt-12">
        <div className="w-full flex flex-col justify-center items-center">
          <p className="mb-4 text-xl font-medium">Select Class For Attendance</p>
          <div className="w-full flex justify-center items-center">
            <select
              name="class name"
              id="class"
              className="px-2 ml-40 bg-blue-50 py-3 rounded-sm text-base w-[40%] accent-blue-700 mt-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <option defaultValue>-- Select Class --</option>
              <option value="BE-I">BE-I</option>
              <option value="BE-II">BE-II</option>
              <option value="BE-III">BE-III</option>
              <option value="BE-IV">BE-IV</option>
              <option value="MCA-I">MCA-I</option>
              <option value="MCA-II">MCA-II</option>
            </select>
            <button
              className="relative ml-3 mt-3 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
              onClick={searchStudentHandler}
            >
              Take Attendance
              <span className="ml-2">
                <SlNote className="text-red-500 text-xl" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full">
        {showTable && students.length > 0 && (
          <div className="border border-blue-200 shadow-lg rounded-lg mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-300">
                  <th className="py-2 px-4 border border-blue-700">SR NO</th>
                  <th className="py-2 px-4 border border-blue-700">PRN</th>
                  <th className="py-2 px-4 border border-blue-700">Name</th>
                  <th className="py-2 px-4 border border-blue-700">Present/Absent</th>
                </tr>
              </thead>
              <tbody>

                {students.sort((a, b) => {
                  const lastNameCompare = a.lastName.localeCompare(b.lastName);
                  if (lastNameCompare !== 0) {
                    return lastNameCompare;
                  }
                  return a.firstName.localeCompare(b.firstName);
                }).map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                    <td className="py-2 px-4 border border-blue-700 text-center">{index+1}</td>
                    <td className="py-2 px-4 border border-blue-700 text-center">{item.enrollmentNo}</td>
                    <td className="py-2 px-4 border border-blue-700 text-center">{`${item.lastName} ${item.firstName} ${item.middleName}`}</td>
                    <td className="py-2 px-4 border border-blue-700 text-center">
                      <input id="bordered-checkbox-1"
                        type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-60"
                        checked={item.isPresent}
                        onChange={() => handleAttendanceChange(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
        <div className="flex justify-center space-x-4 mt-12">
          {showTable && students.length > 0 && (
            <>
              <button
                className="px-4 py-2 mr-8 text-xl flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                onClick={handleDownloadExcel}
              >
                Download Excel
                <span className="ml-2">
                <FaFileExcel/>
              </span>
              </button>

              <button
                className="px-4 py-2 ml-8 text-xl flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                onClick={handleDownloadPDF}
              >
                Download PDF
                <span className="ml-2">
                <FaFilePdf/>
              </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

}

export default Attendance;