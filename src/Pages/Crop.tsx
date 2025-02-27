import {useDispatch, useSelector} from "react-redux";
import {closeModal, openModal} from "../reducers/ModelSlice.ts";
import {Modal} from "../component/Model.tsx";
import {useEffect, useState} from "react";
import {CropModel} from "../model/CropModel.ts";
import { Trash2,Plus } from "react-feather";
import {
    deletedCrop,
    getAllCrops,
    saveCrop,
    updatedCrop
} from "../reducers/CropSlice.ts";
import {AppDispatch} from "../store/Store.ts";
import {getFieldNames} from "../reducers/FieldSlice.ts";
import {FieldModel} from "../model/FieldModel.ts";

export function Crop() {
    const url = "http://localhost:3002/";

    const dispatch = useDispatch<AppDispatch>();
    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const crops = useSelector((state) => state.crop);
    const fieldNames = useSelector((state) => state.field);

    const [commonName, setCommonName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [cropImage, setCropImage] = useState<File | null>(null);
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [fieldName, setFieldName] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getAllCrops());
        dispatch(getFieldNames());
    }, [dispatch]);

    const handleAdd = () => {
        if (!commonName || !scientificName) {
            alert("All fields are required!")
            return
        }
        const newCrop = new CropModel(commonName,scientificName,cropImage,category,season,fieldName);
        //dispatch(addCrop(newCrop));
        dispatch(saveCrop(newCrop));
        alert("Crop added successfully!");
        resetForm();
        dispatch(closeModal());
        dispatch(getAllCrops());
    }
    const handleUpdate = () => {
        if (!commonName || !scientificName) {
            alert("All fields are required!")
            return
        }
        const crop = new CropModel(commonName,scientificName,cropImage,category,season,fieldName);
        dispatch(updatedCrop({commonName:crop.commonName,crop}));
        alert("Crop updated successfully!")
        resetForm();
        dispatch(closeModal());
        dispatch(getAllCrops());
    }
    const handleDelete = (commonName: string) => {
        if (window.confirm("Are you sure you want to delete this crop?")) {
            //dispatch(deleteCrop(commonName));
            dispatch(deletedCrop(commonName));
            console.log("crop deleted!", commonName);
            dispatch(getAllCrops());
        }
    }
    const handleEdit = (crop: CropModel) => {
        dispatch(openModal());

        setCommonName(crop.commonName);
        setScientificName(crop.scientificName);
        setCropImage(crop.cropImage);
        setCategory(crop.category);
        setSeason(crop.season);
        setFieldName(crop.fieldName);
        setIsEditing(true);
    }
    const resetForm = () => {
        setCommonName("")
        setScientificName("")
        setCropImage(null)
        setCategory("")
        setSeason("")
        setFieldName("")
        setIsEditing(false)
    }


    const handleAddCrop = () => {
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
            <h1>Crop</h1>
            <div className="flex justify-end mt-4 mr-56">
                <button onClick={handleAddCrop}>New Crop</button>
            </div>

            {/* Crop Table */}
            <div
                className="relative overflow-x-auto w-5/6 shadow-md sm:rounded-lg mt-6 ml-28"
            >
                <table className="w-full text-sm text-left rtl:text-right text-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Common Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Scientific Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Crop Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Season
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Field Details
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-slate-100 cursor-pointer">
                    {crops
                        .filter((crop: CropModel) => crop && crop.commonName)
                        .filter(
                            (crop: CropModel, index, self) =>
                                index === self.findIndex((c: CropModel) => c.commonName === crop.commonName)
                        )
                        .map((crop: CropModel) => (
                        <tr
                            key={crop.commonName}
                            onClick={() => handleEdit(crop)}
                            className="hover:cursor-pointer hover:bg-yellow-500 hover:text-white"
                        >
                            <td className="px-4 py-2">{crop.commonName}</td>
                            <td className="px-4 py-2">{crop.scientificName}</td>
                            <td className="px-4 py-2">
                                <img
                                    src={`${url}${crop.cropImage1}`}
                                    alt={crop.commonName}
                                    className="w-20 h-20 rounded-full"
                                />
                            </td>
                            <td className="px-4 py-2">{crop.category}</td>
                            <td className="px-4 py-2">{crop.season}</td>
                            <td className="px-4 py-2">{crop.fieldId}</td>
                            <td className="border px-4 py-2 text-center">
                                <button
                                    onClick={() => handleDelete(crop.commonName)}
                                    className="bg-red-500 text-white p-2 rounded-lg"
                                >
                                    <Trash2/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/*<NewCrop/>*/}
            </div>


            {/*ADD Crop*/}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2>Crop Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label>Common Name</label>
                        <input
                            type="text" name="commonName" placeholder="Common Name" value={commonName}
                            onChange={(e) => setCommonName(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Scientific Name</label>
                        <input
                            type="text" name="Scientific Name" placeholder="Scientific Name" value={scientificName}
                            onChange={(e) => setScientificName(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Crop Image</label>
                        <input type="file" accept="image/*"
                               onChange={(e) => setCropImage(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                    <div className="mb-4">
                        <label>Category</label>
                        <input
                            type="text" name="Category" placeholder="Category" value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Season</label>
                        <input
                            type="text" name="Season" placeholder="Season" value={season}
                            onChange={(e) => setSeason(e.target.value)}
                            className="border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Field Details</label>
                        <select
                            name="fieldName"
                            value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                            id=""
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