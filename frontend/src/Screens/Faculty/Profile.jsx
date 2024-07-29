import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseApiURL } from "../../baseUrl";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/${router.state.type.toLowerCase()}/details/getDetails`,
        { employeeId: router.state.loginid },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.facultyd);
          dispatch(
            setUserData({
              fullname: `${response.data.facultyd.firstName} ${response.data.facultyd.middleName} ${response.data.facultyd.lastName}`,
              employeeId: response.data.facultyd.employeeId,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch,router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/faculty/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.id);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.id);
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    if(password.new === ""){
      toast.error("New Password should not be empty !!");
      return;
    }
    else{
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(
          `${baseApiURL()}/faculty/auth/update/${id}`,
          { loginid: router.state.loginid, password: password.new },
          {
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.id);
            setPassword({ new: "", current: "" });
          } else {
            toast.error(response.data.id);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.id);
          console.error(error);
        });
    }
  };

  return (
    <div className="w-[85%] mx-auto my-8 flex justify-between items-start">
      {data && (
        <>
          <div>
            <p className="text-2xl font-semibold">
              Hello {data.firstName} {data.middleName} {data.lastName}{" "}
              👋
            </p>
            <div className="mt-3">
              <p className="text-lg font-normal mb-2">
                Employee Id: {data.employeeId}
              </p>
              <p className="text-lg font-normal mb-2">Post: {data.post}</p>
              <p className="text-lg font-normal mb-2">
                Email Id: {data.email}
              </p>
              <p className="text-lg font-normal mb-2">
                Phone Number: {data.phoneNumber}
              </p>
              {/* <p className="text-lg font-normal mb-2">
                Department: {data[0].department}
              </p> */}
            </div>
            <button
              className={`${
                showPass ? "bg-red-100 text-red-600" : "bg-blue-600 text-white"
              }  px-3 py-1 rounded mt-4`}
              onClick={() => setShowPass(!showPass)}
            >
              {!showPass ? "Change Password" : "Close Change Password"}
            </button>
            {showPass && (
              <form
                className="mt-4 border-t-2 border-blue-500 flex flex-col justify-center items-start"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Current Password"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="New Password"
                  className="px-3 py-1 border-2 border-blue-500 outline-none rounded mt-4"
                />
                <button
                  className="mt-4 hover:border-b-2 hover:border-blue-500"
                  onClick={checkPasswordHandler}
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
          <img
            src={data.profile}
            alt="faculty profile"
            className="h-[15%] w-[15%] object-cover rounded-lg shadow-md"
          />
        </>
      )}
    </div>
  );
};

export default Profile;
