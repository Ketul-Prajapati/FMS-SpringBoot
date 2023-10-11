import axios from "axios";
import React, { useEffect, useState ,useCallback} from "react";
import { FiUpload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase/config";
import { baseApiURL } from "../../baseUrl";
const Attendance = () => {
  const [addselected, setAddSelected] = useState({
    branch: "",
    semester: "",
    link: "",
  });
  const [file, setFile] = useState();
  const [branch, setBranch] = useState();

  useEffect(() => {
    getBranchData();
  }, []);
  const addTimetableHandler = useCallback(() => {
    toast.loading("Adding Timetable");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/timetable/addTimetable`, addselected, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setAddSelected({
            branch: "",
            semester: "",
            link: "",
          });
          setFile("");
        } else {
          console.log(response);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  }, [addselected]);

  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      toast.loading("Upload Timetable To Server");
      const storageRef = ref(
        storage,
        `Timetable/${addselected.branch}/Semester ${addselected.semester}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          // toast.error("Something Went Wrong!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("Timetable Uploaded To Server");
            setAddSelected({ ...addselected, link: downloadURL });
            addTimetableHandler();
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [file,addTimetableHandler,addselected]);

  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Upload Timetable`} />
      </div>
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="mb-4 text-xl font-medium">Add Attendance</p>
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
            <option value="1">BE-1</option>
            <option value="2">BE-2</option>
            <option value="3">BE-3</option>
            <option value="4">BE-4</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
