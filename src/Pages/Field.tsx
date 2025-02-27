import {Modal} from "../component/Model.tsx";
import {useEffect, useState} from "react";
import {closeModal, openModal} from "../reducers/ModelSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {Trash2,Plus} from "react-feather";
import {FieldModel} from "../model/FieldModel.ts";
import {deletedField, getAllFields, saveField, updatedField} from "../reducers/FieldSlice.ts";
import {AppDispatch} from "../store/Store.ts";

export function Field() {
    const url = "http://localhost:3002/";

    const dispatch = useDispatch<AppDispatch>();
    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const fields = useSelector((state) => state.field);

    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [extentSize, setExtentSize] = useState("");
    const [fieldImage1, setFieldImage1] = useState<File | null>(null);
    const [fieldImage2, setFieldImage2] = useState<File | null>(null);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getAllFields());
    }, [dispatch]);

    const handleAdd = () => {
        if (!fieldName || !location) {
            alert("All fields are required!")
            return
        }
        const newField = new FieldModel(fieldName,location,extentSize,fieldImage1,fieldImage2);
        //dispatch(addField(newField));
        dispatch(saveField(newField));
        alert("Field added successfully!")

        dispatch(getAllFields());
        resetForm();
    }
    const handleUpdate=()=>{
        if (!fieldName || !location) {
            alert("All fields are required!")
            return
        }

        const field = new FieldModel(fieldName,location,extentSize,fieldImage1,fieldImage2);
        //dispatch(updateField(field));
        dispatch(updatedField({ fieldName: field.fieldName, field }));
        alert("field updated successfully!")
        resetForm();
        dispatch(closeModal());
        dispatch(getAllFields());


    }
    const handleDelete=(fieldName: string)=>{
        if (window.confirm("Are you sure you want to delete this field?")) {
            //dispatch(deleteField(fieldName));
            dispatch(deletedField(fieldName));
            console.log("field deleted!", fieldName);
            dispatch(getAllFields());
            setIsEditing(false);
        }

    }
    const handleEdit=(field: FieldModel)=>{
        dispatch(openModal());

        setFieldName(field.fieldName);
        setLocation(field.location);
        setExtentSize(field.extentSize);
        setFieldImage1(field.fieldImage1);
        setFieldImage2(field.fieldImage2);
        setIsEditing(true);

    }
    const resetForm = () => {
        setFieldName("")
        setLocation("")
        setExtentSize("")
        setFieldImage1(null)
        setFieldImage2(null)
        setIsEditing(false)
    }


    const handleAddField = () => {
        setIsEditing(false);
        dispatch(openModal());
    };
    const handleCloseModal = () => {
        dispatch(closeModal());
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Field added!");
        dispatch(closeModal());
    };

    return (
        <>
            <h1>Field</h1>
            <div className="flex justify-end mt-4 mr-56">
                <button onClick={handleAddField} className="flex items-center">
                    <Plus size={20}/>New Field
                </button>
            </div>

            {/* Field Table */}
            <div
                className="relative overflow-x-auto w-5/6 shadow-md sm:rounded-lg mt-6 ml-28"
            >
                <table className="w-full text-sm text-left rtl:text-right text-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/*<th scope="col" className="px-6 py-3">*/}
                        {/*    Field Id*/}
                        {/*</th>*/}
                        <th scope="col" className="px-6 py-3">
                            Field Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Field Image 1
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Field Image 2
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Extent Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-slate-100 cursor-pointer">
                    {fields
                        .filter((field: FieldModel) => field && field.fieldName)
                        .filter(
                            (field: FieldModel, index, self) =>
                                index === self.findIndex((f: FieldModel) => f.fieldName === field.fieldName)
                        )
                        .map((field: FieldModel) => (
                        <tr
                            key={field.fieldName}
                            // onClick={() => handleEdit(field)}
                            className="hover:cursor-pointer hover:bg-yellow-500 hover:text-white"
                        >
                            {/*<td className="px-4 py-2">{field.id}</td>*/}
                            <td className="px-4 py-2" onClick={() => handleEdit(field)}>{field.fieldName}</td>
                            <td className="px-4 py-2">
                                <img
                                    src={`${url}${field.fieldImage1}`}
                                    alt={field.fieldName}
                                    className="w-24 h-24 rounded-full"
                                />
                            </td>
                            <td className="px-4 py-2" onClick={() => handleEdit(field)}>
                                <img
                                    src={`${url}${field.fieldImage2}`}
                                    alt={field.fieldName}
                                    className="w-24 h-24 rounded-full"
                                />
                            </td>
                            <td className="px-4 py-2" onClick={() => handleEdit(field)}>{field.location}</td>
                            <td className="px-4 py-2" onClick={() => handleEdit(field)}>{field.extentSize}</td>
                            <td className="border px-4 py-2 text-center">
                                <button
                                    onClick={() => handleDelete(field.fieldName)}
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


            {/*ADD Field*/}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>Field Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <input
                            type="text" name="fieldName" placeholder="Field Name" value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text" name="loaction" placeholder="Loaction" value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text" name="extentSize" placeholder="Extent Size" value={extentSize}
                            onChange={(e) => setExtentSize(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Field Image 1</label>
                        <input type="file" accept="image/*"
                               onChange={(e) => setFieldImage1(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                    <div className="mb-4">
                        <label>Field Image 2</label>
                        <input type="file" accept="image/*"
                               onChange={(e) => setFieldImage2(e.target.files ? e.target.files[0] : null)}
                        />
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