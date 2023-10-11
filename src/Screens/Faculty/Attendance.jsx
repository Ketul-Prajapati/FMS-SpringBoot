import React, { useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";

        <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
            <div className="flex justify-between items-center w-full">
                <Heading title="Attendance Details" />
            </div>
            <select
                onChange={(e) =>
                    setAddSelected({ ...addselected, class: e.target.value })
                }
                value={addselected.class}
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

export default Attendance;
