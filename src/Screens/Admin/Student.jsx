import React, { useState } from "react";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { FaFilePdf, FaFileExcel,FaListUl } from "react-icons/fa";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import * as formData from 'form-data';
import { mailgunApi } from "../../mailgun_api";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: `${mailgunApi()}` });

const Student = () => {
  // const [file, setFile] = useState();
  const [selected, setSelected] = useState("add");
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  // const [branch, setBranch] = useState();
  const [search, setSearch] = useState();
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
    // profile: "",
  });
  const [id, setId] = useState();
  // const getBranchData = () => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   axios
  //     .get(${baseApiURL()}/branch/getBranch, { headers })
  //     .then((response) => {
  //       if (response.data.success) {
  //         setBranch(response.data.branches);
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   const uploadFileToStorage = async (file) => {
  //     toast.loading("Upload Photo To Storage");
  //     const storageRef = ref(
  //       storage,
  //       Student Profile/${data.branch}/${data.class} Class/${data.enrollmentNo}
  //     );
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {},
  //       (error) => {
  //         console.error(error);
  //         toast.dismiss();
  //         toast.error("Something Went Wrong!");
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           toast.dismiss();
  //           // setFile();
  //           toast.success("Profile Uploaded To Storage");
  //           setData({ ...data, profile: downloadURL });
  //         });
  //       }
  //     );
  //   };
  //   file && uploadFileToStorage(file);
  // }, [data, file]);

  // useEffect(() => {
  //   getBranchData();
  // }, []);
  function sendMailgunEmail(to, subject, templateName, templateData) {
    mg.messages.create('csproconnect.me', {
      from: 'CSProConnect Admin <admin@csproconnect.me>',
      to: [to],
      subject: subject,
      template: templateName, // Use the name of the Mailgun template
      'h:X-Mailgun-Variables': JSON.stringify(templateData),
    })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log(err)); // logs any error
  }



  function generateRandomPassword() {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 8; i++) {
      let char = Math.floor(Math.random()
        * str.length + 1);

      pass += str.charAt(char)
    }

    return pass;
  }

  function sendLoginCredentials(email, templateName, templateData) {
    // Compose the email message
    const subject = "Welcome to CSProConnect - Your Account Credentials"
    // Send the email
    sendMailgunEmail(email, subject, templateName, templateData);
  }


  const addStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/student/details/addDetails`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          const password = generateRandomPassword();
          const templateName = 'successful registration'; // Replace with the name of your Mailgun template
          const templateData ={
            // Define variables used in your template
            'recipientName': data.firstName+' '+data.lastName,
            'username': data.enrollmentNo,
            'password': password
          };
          sendLoginCredentials(data.email, templateName, templateData); // Implement this function
          // const mailgun = require("mailgun-js");
          // const DOMAIN = "csproconnect.me";
          // const mg = mailgun({ apiKey: "ENTER_API_KEY_HERE", domain: DOMAIN });
          // const data = {
          //   from: "Mailgun Sandbox <postmaster@csproconnect.me>",
          //   to: "himil3002@gmail.com",
          //   subject: "Hello",
          //   template: "successful registration",
          //   'h:X-Mailgun-Variables': { test: "test" }
          // };
          // mg.messages().send(data, function (error, body) {
          //   console.log(body);
          // });
          axios
            .post(
              `${baseApiURL()}/student/auth/register`,
              { loginid: data.enrollmentNo, password },
              {
                headers: headers,
              }
            )
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                // setFile();
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
                  // profile: "",
                });
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };
  const updateStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Updating Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/student/details/updateDetails/${id}`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
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
            // profile: "",
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const searchStudentHandler = (e) => {
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
              // profile: response.data.user[0].profile,
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
      ["SR NO","PRN", "Name"],
      ...students.map((student,index) => [index+1,
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
      const columns = ["SR NO","PRN", "NAME"];
      const rows = students.map((student,index) => [
        index+1,student.enrollmentNo,
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
      // profile: "",
    });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "add" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setMenuHandler("add")}
          >
            Add Student
          </button>
          <button
            className={`${selected === "edit" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setMenuHandler("edit")}
          >
            Edit Student
          </button>
          <button
            className={`${selected === "view" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setMenuHandler("view")}
          >
            View Student
          </button>
        </div>
      </div>
      {selected === "add" && (
        <form
          onSubmit={addStudentProfile}
          className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
        >
          <div className="w-[40%]">
            <label htmlFor="firstname" className="leading-7 text-sm ">
              Enter First Name
            </label>
            <input
              type="text"
              id="firstname"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="middlename" className="leading-7 text-sm ">
              Enter Middle Name
            </label>
            <input
              type="text"
              id="middlename"
              value={data.middleName}
              onChange={(e) => setData({ ...data, middleName: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="lastname" className="leading-7 text-sm ">
              Enter Last Name
            </label>
            <input
              type="text"
              id="lastname"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="enrollmentNo" className="leading-7 text-sm ">
              Enter Enrollment No
            </label>
            <input
              type="number"
              id="enrollmentNo"
              value={data.enrollmentNo}
              onChange={(e) =>
                setData({ ...data, enrollmentNo: e.target.value })
              }
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="email" className="leading-7 text-sm ">
              Enter Email Address
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="phoneNumber" className="leading-7 text-sm ">
              Enter Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={(e) =>
                setData({ ...data, phoneNumber: e.target.value })
              }
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="class" className="leading-7 text-sm ">
              Select Class
            </label>
            <select
              id="class"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.class}
              onChange={(e) => setData({ ...data, class: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              <option value="BE-I">BE-I</option>
              <option value="BE-II">BE-II</option>
              <option value="BE-III">BE-III</option>
              <option value="BE-IV">BE-IV</option>
              <option value="MCA-I">MCA-I</option>
              <option value="MCA-II">MCA-II</option>
            </select>
          </div>
          {/* <div className="w-[40%]">
            <label htmlFor="branch" className="leading-7 text-sm ">
              Select Branch
            </label>
            <select
              id="branch"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.branch}
              onChange={(e) => setData({ ...data, branch: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              {branch?.map((branch) => {
                return (
                  <option value={branch.name} key={branch.name}>
                    {branch.name}
                  </option>
                );
              })}
            </select>
          </div> */}
          <div className="w-[40%]">
            <label htmlFor="gender" className="leading-7 text-sm ">
              Select Gender
            </label>
            <select
              id="gender"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {/* <div className="w-[40%]">
            <label htmlFor="file" className="leading-7 text-sm ">
              Select Profile
            </label>
            <label
              htmlFor="file"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
            >
              Upload
              <span className="ml-2">
                <FiUpload />
              </span>
            </label>
            <input
              hidden
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div> */}
          <button
            type="submit"
            className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
          >
            Add New Student
          </button>
        </form>
      )}
      {selected === "edit" && (
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
          {search && id && (
            <form
              onSubmit={updateStudentProfile}
              className="w-[70%] flex justify-center items-center flex-wrap gap-8 mx-auto mt-10"
            >
              <div className="w-[40%]">
                <label htmlFor="firstname" className="leading-7 text-sm ">
                  Enter First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  value={data.firstName}
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="middlename" className="leading-7 text-sm ">
                  Enter Middle Name
                </label>
                <input
                  type="text"
                  id="middlename"
                  value={data.middleName}
                  onChange={(e) =>
                    setData({ ...data, middleName: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="lastname" className="leading-7 text-sm ">
                  Enter Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  value={data.lastName}
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="enrollmentNo" className="leading-7 text-sm ">
                  Enrollment No
                </label>
                <input
                  disabled
                  type="number"
                  id="enrollmentNo"
                  value={data.enrollmentNo}
                  onChange={(e) =>
                    setData({ ...data, enrollmentNo: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="email" className="leading-7 text-sm ">
                  Enter Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="phoneNumber" className="leading-7 text-sm ">
                  Enter Phone Number
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  value={data.phoneNumber}
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="class" className="leading-7 text-sm ">
                  Class
                </label>
                <select
                  id="class"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={data.class}
                  onChange={(e) =>
                    setData({ ...data, class: e.target.value })
                  }
                >
                  <option defaultValue>-- Select --</option>
                  <option value="BE-I">BE-I</option>
                  <option value="BE-II">BE-II</option>
                  <option value="BE-III">BE-III</option>
                  <option value="BE-IV">BE-IV</option>
                  <option value="MCA-I">MCA-I</option>
                  <option value="MCA-II">MCA-II</option>
                </select>
              </div>
              <div className="w-[40%]">
                <label htmlFor="gender" className="leading-7 text-sm ">
                  Select Gender
                </label>
                <select
                  id="gender"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
              >
                Update Student
              </button>
            </form>
          )}
        </div>
      )}
      {selected === "view" && (
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
              <div className="border border-blue-200 shadow-lg rounded-lg mb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-300">
                      <th className="py-2 px-4 border border-blue-700">SR NO</th>
                      <th className="py-2 px-4 border border-blue-700">PRN</th>
                      <th className="py-2 px-4 border border-blue-700">Name</th>
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