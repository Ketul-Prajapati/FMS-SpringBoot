import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import { baseApiURL } from "../../baseUrl";
import { FiSearch, FiUpload } from "react-icons/fi";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import * as formData from 'form-data';
import { mailgunApi } from "../../mailgun_api";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: `${mailgunApi()}` });

const Admin = () => {
  const [file, setFile] = useState();
  const [admin, setAdmin] = useState([]);
  const [selected, setSelected] = useState("add");
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profile: "",
  });
  const [id, setId] = useState();
  const [search, setSearch] = useState();
  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      toast.loading("Upload Photo To Storage");
      const storageRef = ref(
        storage,
        `Admin Profile/${data.employeeId}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          toast.error("Something Went Wrong!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("Profile Uploaded To Admin");
            setData({ ...data, profile: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [data, file]);

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

  const addAdminProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Admin");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/admin/details/addDetails`, data, {
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
            'username': data.employeeId,
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
              `${baseApiURL()}/Admin/auth/register`,
              { loginid: data.employeeId, password },
              {
                headers: headers,
              }
            )
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                setFile();
                setData({
                  employeeId: "",
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  gender: "",
                  profile: "",
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

  const updateAdminProfile = (e) => {
    e.preventDefault();
    toast.loading("Updating Admin");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/admin/details/updateDetails/${id}`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setFile();
          setSearch();
          setId();
          setData({
            employeeId: "",
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            profile: "",
            gender: "",
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

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["SR NO", "Employee Id", "Name"],
      ...admin.map((admin, index) => [index + 1,
      admin.employeeId,
      `${admin.lastName} ${admin.firstName} ${admin.middleName}`,
      ]),
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "Admin Sheet");
    XLSX.writeFile(wb, `Admin_List.xlsx`);
  };

  const handleDownloadPDF = () => {
    // Importing 'jspdf' library
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF.default();
      doc.setFont("arial"); // Set font type
      doc.setFontSize(15); // Set font size
      const pdfTitle = `LIST OF ADMINS`;
      doc.text(pdfTitle, 60, 10);
      const columns = ["SR NO", "EMPLOYEE ID", "NAME"];
      const rows = admin.map((admin, index) => [
        index + 1, admin.employeeId,
        `${admin.lastName} ${admin.firstName} ${admin.middleName}`,
      ]);
      doc.autoTable({
        head: [columns],
        body: rows,
      });
      doc.save(`Admin_List.pdf`);
    });
  }

  const searchAdminHandler = (e) => {
    e.preventDefault();
    toast.loading("Getting Admin");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/admin/details/getDetails`,
        { employeeId: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length !== 0) {
            toast.success(response.data.message);
            setId(response.data.user[0]._id);
            setData({
              employeeId: response.data.user[0].employeeId,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              gender: response.data.user[0].gender,
              profile: response.data.user[0].profile,
            });
          } else {
            toast.dismiss();
            toast.error("No Admin Found With ID");
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

  const viewAdminHandler = (e) => {
    toast.loading("Getting admin list");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/admin/details/getDetails`, { __v: 0 },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        console.log(response.data)
        if (response.data.success) {
          if (response.data.user.length === 0) {
            toast.error("No Admin Found!");
          } else {
            toast.success(response.data.message);
            setAdmin(response.data.user);
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

  const setMenuHandler = (type) => {
    setSelected(type);
    setFile("");
    setSearch("");
    setId("");
    setData({
      employeeId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      profile: "",
    });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Admin Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "add" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setMenuHandler("add")}
          >
            Add Admin
          </button>
          <button
            className={`${selected === "edit" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setMenuHandler("edit")}
          >
            Edit Admin
          </button>
          <button
            className={`${selected === "view" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => { setMenuHandler("view"); viewAdminHandler() }}
          >
            View Admin
          </button>
        </div>
      </div>
      {selected === "add" && (
        <form
          onSubmit={addAdminProfile}
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
            <label htmlFor="employeeId" className="leading-7 text-sm ">
              Enter Employee Id
            </label>
            <input
              type="number"
              id="employeeId"
              value={data.employeeId}
              onChange={(e) => setData({ ...data, employeeId: e.target.value })}
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
            <label htmlFor="gender" className="leading-7 text-sm ">
              Select Gender
            </label>
            <select
              id="gender"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              {" "}
              <option defaultValue>-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="w-[40%]">
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
          </div>
          <button
            type="submit"
            className="bg-blue-500 px-6 py-3 rounded-sm my-6 text-white"
          >
            Add New Admin
          </button>
        </form>
      )}
      {selected === "edit" && (
        <div className="my-6 mx-auto w-full">
          <form
            onSubmit={searchAdminHandler}
            className="flex justify-center items-center border-2 border-blue-500 rounded w-[40%] mx-auto"
          >
            <input
              type="text"
              className="px-6 py-3 w-full outline-none"
              placeholder="Employee Id."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-4 text-2xl hover:text-blue-500" type="submit">
              <FiSearch />
            </button>
          </form>
          {search && id && (
            <form
              onSubmit={updateAdminProfile}
              className="w-[70%] flex justify-center items-center flex-wrap gap-10 mx-auto mt-10"
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
                <label htmlFor="employeeId" className="leading-7 text-sm ">
                  Enter Employee Id
                </label>
                <input
                  type="number"
                  id="employeeId"
                  value={data.employeeId}
                  onChange={(e) =>
                    setData({ ...data, employeeId: e.target.value })
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
              <div className="w-[40%]">
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
              </div>
              <button
                type="submit"
                className="bg-blue-500 flex px-6 py-3 rounded-sm mb-6 text-white"
              >
                Update Admin
              </button>
            </form>
          )}
        </div>
      )}
      {selected === "view" && (
        <div className="mt-8 w-full">
          <div className="border border-blue-200 shadow-lg rounded-lg mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-300">
                  <th className="py-2 px-4 border border-blue-700">SR NO</th>
                  <th className="py-2 px-4 border border-blue-700">Employee Id</th>
                  <th className="py-2 px-4 border border-blue-700">Name</th>
                </tr>
              </thead>
              <tbody>

                {admin.sort((a, b) => {
                  const lastNameCompare = a.lastName.localeCompare(b.lastName);
                  if (lastNameCompare !== 0) {
                    return lastNameCompare;
                  }
                  return a.firstName.localeCompare(b.firstName);
                }).map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                    <td className="py-2 px-4 border border-blue-700 text-center">{index + 1}</td>
                    <td className="py-2 px-4 border border-blue-700 text-center">{item.employeeId}</td>
                    <td className="py-2 px-4 border border-blue-700 text-center">{`${item.lastName} ${item.firstName} ${item.middleName}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center space-x-4 mt-12">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;