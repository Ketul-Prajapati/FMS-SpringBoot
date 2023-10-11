import React, { useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";
const Student = () => {
    const [search, setSearch] = useState();
    const [data, setData] = useState({
        enrollmentNo: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        semester: "",
        branch: "",
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
            semester: "",
            branch: "",
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
                            semester: response.data.user[0].semester,
                            branch: response.data.user[0].branch,
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

    return (
        <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
            <div className="flex justify-between items-center w-full">
                <Heading title="Attendance Details" />
            </div>
            <select
                onChange={(e) =>
                    setAddSelected({ ...addselected, semester: e.target.value })
                }
                value={addselected.semester}
                name="branch"
                id="branch"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
            >
                <option defaultValue>-- Select Class --</option>
                <option value="1">BE-I</option>
                <option value="2">BE-II</option>
                <option value="3">BE-III</option>
                <option value="4">BE-IV</option>
            </select>
        </div>
    );
};

export default Attendance;
