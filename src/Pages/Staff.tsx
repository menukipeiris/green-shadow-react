import {Modal} from "../component/Model.tsx";
import {FieldModel} from "../model/FieldModel.ts";
import {useEffect, useState} from "react";
import {closeModal, openModal} from "../reducers/ModelSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import {Trash2} from "react-feather";
import {StaffModel} from "../model/StaffModel.ts";
import {deletedStaff, getAllStaff, saveStaff, updatedStaff} from "../reducers/StaffSlice.ts";
import {getFieldNames} from "../reducers/FieldSlice.ts";

export function Staff() {
    const dispatch = useDispatch<AppDispatch>();
    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const fieldNames = useSelector((state) => state.field);
    const staff = useSelector((state) => state.staff);

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [designation,setDesignation]=useState("");
    const [gender,setGender]=useState("");
    const [joinedDate,setJoinedDate]=useState("");
    const [dob,setDob]=useState("");
    const [address,setAddress]=useState("");
    const [contactNo,setContactNo]=useState("");
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("");
    const [fieldName,setFieldName]=useState("");

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getAllStaff());
        dispatch(getFieldNames());
    }, [dispatch]);


    const handleAdd = () => {
        if (!firstName || !lastName ||!email ||!contactNo ||!role) {
            alert("All fields are required!")
            return
        }
        const newStaff = new StaffModel(firstName,lastName,designation,gender,joinedDate,dob,address,contactNo,email,role,fieldName);
        dispatch(saveStaff(newStaff));
        alert("Staff added successfully!");
        resetForm();
        dispatch(closeModal());
        dispatch(getAllStaff());
    }
    const handleUpdate = () => {
        if (!firstName || !lastName ||!email ||!contactNo ||!role) {
            alert("All fields are required!")
            return
        }
        const staff = new StaffModel(firstName,lastName,designation,gender,joinedDate,dob,address,contactNo,email,role,fieldName);
        dispatch(updatedStaff({firstName:staff.firstName,staff}));
        alert("Staff member updated successfully!")
        resetForm();
        dispatch(closeModal());
        dispatch(getAllStaff());

    }
    const handleDelete = (firstName: string) => {
        if (window.confirm("Are you sure you want to delete this staff member?")) {
            dispatch(deletedStaff(firstName))
            console.log("staff deleted!", firstName);
            dispatch(getAllStaff());
        }
    }

    const handleEdit = (staff: StaffModel) => {
        dispatch(openModal());

        setFirstName(staff.firstName);
        setLastName(staff.lastName);
        setDesignation(staff.designation);
        setGender(staff.gender);
        setJoinedDate(staff.joinedDate);
        setDob(staff.dob);
        setAddress(staff.address);
        setContactNo(staff.contactNo);
        setEmail(staff.email);
        setRole(staff.role);
        setFieldName(staff.fieldName);
        setIsEditing(true);
    }
    const resetForm = () => {
        setFirstName("")
        setLastName("")
        setDesignation("")
        setGender("")
        setJoinedDate("")
        setDob("")
        setAddress("")
        setContactNo("")
        setEmail("")
        setRole("")
        setFieldName("")
        setIsEditing(false)
    }

    const handleAddStaff = () => {
        dispatch(openModal());
    };
    const handleCloseModal = () => {
        dispatch(closeModal());
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Crop added!");
        dispatch(closeModal());
    };
    return (
        <>
            <h1>Staff</h1>
            <div className="flex justify-end mt-4 mr-56">
                <button onClick={handleAddStaff}>New Staff</button>
            </div>

            {/*Staff Table*/}
            <div
                className="relative overflow-x-auto w-5/6 shadow-md sm:rounded-lg mt-6 ml-28"
            >
                <table className="w-full text-sm text-left rtl:text-right text-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Designation
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Joined Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contact
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Assign Field
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-slate-100 cursor-pointer">
                    {staff
                        .filter((staff: StaffModel) => staff && staff.firstName)
                        .filter(
                            (staff: StaffModel, index, self) =>
                                index === self.findIndex((s: StaffModel) => s.firstName === staff.firstName)
                        )
                        .map((staff: StaffModel) => (
                            <tr
                                key={staff.firstName}
                                onClick={() => handleEdit(staff)}
                                className="hover:cursor-pointer hover:bg-yellow-500 hover:text-white"
                            >
                                <td className="px-4 py-2">{staff.firstName}</td>
                                <td className="px-4 py-2">{staff.lastName}</td>
                                <td className="px-4 py-2">{staff.designation}</td>
                                <td className="px-4 py-2">{staff.gender}</td>
                                <td className="px-4 py-2">{staff.joinedDate}</td>
                                <td className="px-4 py-2">{staff.address}</td>
                                <td className="px-4 py-2">{staff.contactNo}</td>
                                <td className="px-4 py-2">{staff.email}</td>
                                <td className="px-4 py-2">{staff.fieldId}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleDelete(staff.firstName)}
                                        className="bg-red-500 text-white p-2 rounded-lg"
                                    >
                                        <Trash2/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/*ADD Staff*/}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>Staff Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text" name="firstName" placeholder="First Name : Enter Unique code with" value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border p-1 rounded h-8"
                            required
                        />
                        <input
                            type="text" name="lastName" placeholder="Last Name" value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border p-1 rounded h-8"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text" name="designation" placeholder="Designation" value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="border p-1 rounded h-8"
                            required
                        />
                    </div>
                    <div className="flex gap-4 mb-4">
                        <label>Gender : </label>
                        <select
                            name="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            id=""
                            className="border p-1 rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>

                        </select>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text" name="joinedDate" placeholder="Joined Date" value={joinedDate}
                            onChange={(e) => setJoinedDate(e.target.value)}
                            className="border p-1 rounded h-8"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text" name="dob" placeholder="Date of Birth" value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="border p-1 rounded h-8"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text" name="address" placeholder="Address" value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="border p-1 rounded h-8"
                            required
                        />
                    </div>
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text" name="contactNo" placeholder="Contact No" value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            className="border p-1 rounded h-8"
                            required
                        />
                        <input
                            type="text" name="email" placeholder="Email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-1 rounded h-8"
                            required
                        />
                    </div>

                    <div className="flex gap-4 mb-4">
                        <label>Job Role :</label>
                        <select
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            id=""
                            className="border p-1 rounded"
                        >
                            <option value="">Select Role</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMINISTRATIVE">Admin</option>
                            <option value="SCIENTIST">Scientist</option>
                            <option value="DRIVER">Driver</option>
                            <option value="OTHER">Other</option>

                        </select>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <label>Field Details</label>
                        <select
                            name="fieldName"
                            value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                            id=""
                            className="border p-1 rounded"
                        >
                            <option value="">Select Field</option>
                            {fieldNames.map((field: FieldModel, index) => (
                                <option key={index} value={field}>
                                    {field}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div className="flex justify-end">
                        {isEditing ? (
                            <button
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                        ) : (
                            <button
                                onClick={handleAdd}
                            >
                                Add
                            </button>
                        )}
                        {isEditing && (
                            <button
                                onClick={resetForm}
                                className="bg-gray-500 text-white p-2 rounded"
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                </form>
            </Modal>
        </>
    )
}