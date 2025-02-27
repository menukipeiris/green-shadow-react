import {FieldModel} from "../model/FieldModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../services/apiServices.ts";
// import axios from "axios";

const initialState : FieldModel[]=[]

// const api = axios.create({
//     baseURL : "http://localhost:3002"
// })

export const saveField = createAsyncThunk(
    'field/saveField',
    async (field: FieldModel) => {
        try {
            const formData = new FormData();

            formData.append("fieldName", field.fieldName);
            formData.append("location", field.location);
            formData.append("extentSize", String(field.extentSize));

            if (field.fieldImage1 && field.fieldImage2) {
                formData.append("fieldImage1", field.fieldImage1);
                formData.append("fieldImage2", field.fieldImage2);
            }

            const response = await api.post("/Field/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);
export const getAllFields = createAsyncThunk(
    "field/getAllFields", async () => {
    try {
        const response = await api.get("/Field/view");
        return response.data;
    } catch (error) {
        console.log(error);
    }
});
export const updatedField = createAsyncThunk(
    "field/updatedField",
    async (payload: { fieldName: string; field: FieldModel }) => {
        try {
            const formData = new FormData();

            formData.append("fieldName", payload.field.fieldName);
            formData.append("location", payload.field.location);
            formData.append("extentSize", String(payload.field.extentSize));
            if (payload.field.fieldImage1 instanceof File) {
                formData.append("fieldImage1", payload.field.fieldImage1);
            }
            if (payload.field.fieldImage2 instanceof File) {
                formData.append("fieldImage2", payload.field.fieldImage2);
            }
            const response = await api.put(
                `/Field/update/${payload.fieldName}`,
                formData
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);
export const deletedField = createAsyncThunk(
    "field/deletedField",
    async (fieldName: string) => {
        try {
            const response = await api.delete(`/Field/delete/${fieldName}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getFieldNames = createAsyncThunk(
    "field/getFieldNames",
    async () => {
        try {
            const response = await api.get("/Field/fieldNames");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);


const FieldSlice = createSlice({
    name:"field",
    initialState:initialState,
    reducers:{
        addField:(state,action)=>{
            state.push(action.payload);
        },
        updateField: (state, action) => {
            return state.map(field =>
                field.fieldName === action.payload.fieldName
                    ? {
                        fieldName: action.payload.fieldName,
                        location: action.payload.location,
                        extentSize: action.payload.extentSize,
                        fieldImage1: action.payload.fieldImage1,
                        fieldImage2: action.payload.fieldImage2
                    }
                    : field
            );
        },
        deleteField: (state, action) => {
            return state.filter(field => field.fieldName !== action.payload);
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(saveField.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveField.rejected, (state, action) => {
                console.error("Failed to save field!:", action.payload);
            })
            .addCase(saveField.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(getAllFields.fulfilled, (state, action) => {
                action.payload.map((field: FieldModel) => {
                    state.push(field);
                });
            })
            .addCase(getAllFields.rejected, (state, action) => {
                console.error("Failed to load Field data", action.payload);
            })
            .addCase(getAllFields.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(updatedField.fulfilled, (state, action) => {
                const index = state.findIndex(
                    (field) => field.fieldName === action.payload.fieldName
                );
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updatedField.rejected, (state, action) => {
                console.error("Failed to update field", action.payload);
            })
            .addCase(updatedField.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(deletedField.fulfilled, (state, action) => {
                return state.filter(
                    (field: FieldModel) => field.fieldName !== action.payload.fieldName
                );
            })
            .addCase(deletedField.rejected, (state, action) => {
                console.error("Failed to delete field", action.payload);
            })
            .addCase(deletedField.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(getFieldNames.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getFieldNames.rejected, (state, action) => {
                console.error("Failed to load field names", action.payload);
            })
            .addCase(getFieldNames.pending, (state, action) => {
                console.error("Pending");
            });
    }
})

export const {addField,updateField,deleteField} = FieldSlice.actions;
export default FieldSlice.reducer;