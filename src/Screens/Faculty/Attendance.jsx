import React, { useState } from "react";
import "jspdf-autotable";

function Attendance() {
  const [students, setStudents] = useState([
    { rollNo: 1, name: "Student 1", isPresent: false },
    { rollNo: 2, name: "Student 2", isPresent: false },
    // Add more students as needed
  ]);

  const handleAttendanceChange = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].isPresent = !updatedStudents[index].isPresent;
    setStudents(updatedStudents);
  };

  const handleSubmit = () => {
    // Assuming you want to send the attendance data to the server
    fetch("YOUR_SERVER_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(students),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Attendance submitted successfully:", data);
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };
  const handleDownloadExcel = () => {
    // Importing 'xlsx' library
    import("xlsx").then((XLSX) => {
      const ws = XLSX.utils.json_to_sheet(students);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Attendance Sheet");
      XLSX.writeFile(wb, "attendance.xlsx");
    });
  };

  const handleDownloadPDF = () => {
    // Importing 'jspdf' library
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF.default();
      doc.autoTable({
        head: [["Roll No.", "Name", "Present"]],
        body: students.map((student) => [student.rollNo, student.name, student.isPresent ? "Present" : "Absent"]),
      });
      doc.save("attendance.pdf");
    });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      {/* ...Existing JSX code... */}
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