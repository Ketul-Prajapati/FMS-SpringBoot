import React, { useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";
import { FaFilePdf, FaFileExcel, FaListUl } from "react-icons/fa";
import "jspdf-autotable";
import * as XLSX from "xlsx";
const Student = () => {
  const [search, setSearch] = useState();
  const [selected, setSelected] = useState("prn");
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    class: "",
    // branch: "",
    gender: "",
    profile: "",
  });
  const [id, setId] = useState();

  const searchStudentHandler = (e) => {
    setId("");
    setData({
      enrollmentNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      class: "",
      // branch: "",
      gender: "",
      profile: "",
    });
    e.preventDefault();
    toast.loading("Getting Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { enrollmentNo: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length === 0) {
            toast.error("No Student Found!");
          } else {
            toast.success(response.data.message);
            setData({
              enrollmentNo: response.data.user[0].enrollmentNo,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              class: response.data.user[0].class,
              // branch: response.data.user[0].branch,
              gender: response.data.user[0].gender,
              profile: response.data.user[0].profile,
            });
            setId(response.data.user[0]._id);
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

  const viewStudentHandler = (e) => {
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

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["SR NO", "PRN", "Name"],
      ...students.map((student, index) => [index + 1,
      student.enrollmentNo,
      `${student.lastName} ${student.firstName} ${student.middleName}`,
      ]),
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "Students Sheet");
    XLSX.writeFile(wb, `${search}_Students.xlsx`);
  };

  const handleDownloadPDF = () => {
    // Importing 'jspdf' library
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF.default();
      doc.setFont("arial"); // Set font type
      doc.setFontSize(15); // Set font size
      const pdfTitle = `LIST OF ${search} STUDENTS`;
      doc.text(pdfTitle, 60, 10);
      const columns = ["SR NO", "PRN", "NAME"];
      const rows = students.map((student, index) => [
        index + 1, student.enrollmentNo,
        `${student.lastName} ${student.firstName} ${student.middleName}`,
      ]);
      doc.autoTable({
        head: [columns],
        body: rows,
      });
      doc.save(`${search}_Students.pdf`);
    });
  };

  const setMenuHandler = (type) => {
    setSelected(type);
    // setFile("");
    setSearch("");
    setId("");
    setData({
      enrollmentNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      class: "",
      // branch: "",
      gender: "",
      profile: "",
    });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "prn" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setMenuHandler("prn")}
          >
            View By PRN
          </button>
          <button
            className={`${selected === "class" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setMenuHandler("class")}
          >
            View By Class
          </button>
        </div>
      </div>
      {selected === "prn" && (
        <div className="my-6 mx-auto w-full">
          <form
            className="flex justify-center items-center border-2 border-blue-500 rounded w-[40%] mx-auto"
            onSubmit={searchStudentHandler}
          >
            <input
              type="text"
              className="px-6 py-3 w-full outline-none"
              placeholder="Enrollment No."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-4 text-2xl hover:text-blue-500" type="submit">
              <FiSearch />
            </button>
          </form>
          {id && (
            <div className="mx-auto w-full bg-blue-50 mt-10 flex justify-between items-center p-10 rounded-md shadow-md">
              <div>
                <p className="text-2xl font-semibold">
                  {data.firstName} {data.middleName} {data.lastName}
                </p>
                <div className="mt-3">
                  <p className="text-lg font-normal mb-2">
                    Enrollment No: {data.enrollmentNo}
                  </p>
                  <p className="text-lg font-normal mb-2">
                    Phone Number: +91 {data.phoneNumber}
                  </p>
                  <p className="text-lg font-normal mb-2">
                    Email Address: {data.email}
                  </p>
                  <p className="text-lg font-normal mb-2">
                    Class: {data.class}
                  </p>
                </div>
              </div>
              <img
                src={`https://admission.msubaroda.ac.in/MSUISApi/Upload/Photo/${data.enrollmentNo}_photo.jpg`}
                alt="student profile"
                className="h-[15%] w-[15%] object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      )}
      {selected === "class" && (
        <>
          <div className="w-full flex justify-center items-center mt-12">
            <div className="w-full flex flex-col justify-center items-center">
              <p className="mb-4 text-xl font-medium">Select Class To View</p>
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
                  onClick={viewStudentHandler}
                >
                  View Students
                  <span className="ml-2">
                    <FaListUl className="text-red-500 text-xl" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 w-full">
            {showTable && students.length > 0 && (
              <div className="mx-auto w-full bg-white mt-5 flex flex-col justify-between items-center p-10 rounded-md shadow-md">
                {students.sort((a, b) => {
                  const lastNameCompare = a.lastName.localeCompare(b.lastName);
                  if (lastNameCompare !== 0) {
                    return lastNameCompare;
                  }
                  return a.firstName.localeCompare(b.firstName);
                }).map((item, index) => (
                  <div key={index} className="mx-auto w-full bg-blue-50 mt-10 flex justify-between items-center p-10 rounded-md shadow-md">
                    <div>
                      <p className="text-xl font-normal">
                        SR NO : {index + 1}
                      </p>
                      <p className="text-2xl font-semibold">
                        {`${item.lastName} ${item.firstName} ${item.middleName}`}
                      </p>
                      <div className="mt-3">
                        <p className="text-lg font-normal mb-2">
                          Enrollment No: {item.enrollmentNo}
                        </p>
                        <p className="text-lg font-normal mb-2">
                          Phone Number: +91 {item.phoneNumber}
                        </p>
                        <p className="text-lg font-normal mb-2">
                          Email Address: {item.email}
                        </p>
                        <p className="text-lg font-normal mb-2">
                          Class: {item.class}
                        </p>
                      </div>
                    </div>
                    <img
                      src={`https://admission.msubaroda.ac.in/MSUISApi/Upload/Photo/${item.enrollmentNo}_photo.jpg`}
                      alt="student profile"
                      className="h-[15%] w-[15%] object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))

                }

              </div>
            )}
            <div className="flex justify-center space-x-4 mt-12">
              {showTable && students.length > 0 && (
                <>
                  <button
                    className="px-4 py-2 mr-8 text-xl flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                    onClick={handleDownloadExcel}
                  >
                    Download Excel
                    <span className="ml-2">
                      <FaFileExcel />
                    </span>
                  </button>

                  <button
                    className="px-4 py-2 ml-8 text-xl flex justify-center items-center text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                    onClick={handleDownloadPDF}
                  >
                    Download PDF
                    <span className="ml-2">
                      <FaFilePdf />
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Student;
