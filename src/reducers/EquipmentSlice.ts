import {EquipmentModel} from "../model/EquipmentModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../services/apiServices.ts";
//import axios from "axios";

const initialState : EquipmentModel[]=[]

// const api = axios.create({
//     baseURL : "http://localhost:3002"
// })

export const saveEquipment = createAsyncThunk(
    "equipment/saveEquipment",
    async (equipment: EquipmentModel) => {
        try {
            const responseStaffId = await api.get(`/Staff/searchStaffId/${equipment.staffId}`);
            const staffId= responseStaffId.data;
            const responseFieldId = await api.get(`/Field/searchFieldId/${equipment.fieldId}`);
            const fieldId= responseFieldId.data;
            console.log("staffId:", staffId, "fieldId:", fieldId);

            equipment.staffId=staffId;
            equipment.fieldId=fieldId;

            const response = await api.post("/Equipment/add", equipment);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);
export const getAllEquipment = createAsyncThunk(
    "equipment/getAllEquipment", async () => {
        try {
            const response = await api.get("/Equipment/view");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);
export const updatedEquipment = createAsyncThunk(
    "equipment/updatedEquipment",
    async (payload: { name: string; equipment: EquipmentModel }) => {
        try {
            const responseStaffId = await api.get(`/Staff/searchStaffId/${payload.equipment.staffId}`);
            const staffId= responseStaffId.data;
            const responseFieldId = await api.get(`/Field/searchFieldId/${payload.equipment.fieldId}`);
            const fieldId= responseFieldId.data;

            payload.equipment.staffId = staffId;
            payload.equipment.fieldId=fieldId;

            const response = await api.put(`/Equipment/update/${payload.name}`, payload.equipment);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);
export const deletedEquipment = createAsyncThunk(
    "equipment/deletedEquipment",
    async (name: string) => {
        try {
            const response = await api.delete(`/Equipment/delete/${name}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);


const EquipmentSlice = createSlice({
    name:"equipment",
    initialState:initialState,
    reducers:{},

    extraReducers: (builder) => {
        builder
            .addCase(saveEquipment.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveEquipment.rejected, (state, action) => {
                console.error("Failed to save equipment!", action.payload);
            })
            .addCase(saveEquipment.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(getAllEquipment.fulfilled, (state, action) => {
                action.payload.map((equipment: EquipmentModel) => {
                    state.push(equipment);
                });
            })
            .addCase(getAllEquipment.rejected, (state, action) => {
                console.error("Failed to load equip data", action.payload);
            })
            .addCase(getAllEquipment.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(updatedEquipment.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (equipment) => equipment.name === action.payload.name
                );
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updatedEquipment.rejected, (state, action) => {
                console.error("Failed to update equipment!", action.payload);
            })
            .addCase(updatedEquipment.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(deletedEquipment.fulfilled, (state, action) => {
                return state.filter(
                    (equipment: EquipmentModel) => equipment.name !== action.payload.name
                );
            })
            .addCase(deletedEquipment.rejected, (state, action) => {
                console.error("Failed to delete equipment!", action.payload);
            })
            .addCase(deletedEquipment.pending, (state, action) => {
                console.error("Pending");
            });
    }
})
export default EquipmentSlice.reducer;