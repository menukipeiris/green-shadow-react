import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserModel} from "../model/UserModel.ts";
import {api} from "../services/apiServices.ts";

const initialState = {
    jwt_token: null,
    refresh_token : null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: '',
};

// const api = axios.create({
//     baseURL : "http://localhost:3002"
// })

export const registerUser= createAsyncThunk(
    'user/register',
    async (user : UserModel)=>{
        try{
            const response = await api.post('/auth/register', {user},{withCredentials: true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)

export const loginUser= createAsyncThunk(
    'user/login',
    async (user : UserModel)=>{
        try{
            const response = await api.post('/auth/login', {user},{withCredentials: true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)
const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers:{
        logOutUser(state){
            state.isAuthenticated = false;
        }
    },
    extraReducers(builder){
        builder
            .addCase(registerUser.pending,(state, action)=>{
                console.log('pending');
            })
            .addCase(registerUser.fulfilled,(state, action)=>{
                console.log('User Registered Successfully');
            })
            .addCase(registerUser.rejected,(state, action)=>{
                state.error = action.payload as string;
            });
        builder
            .addCase(loginUser.rejected,(state, action)=>{
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.fulfilled,(state, action)=>{
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.isAuthenticated = true;
                localStorage.setItem("jwt_token",action.payload.accessToken);
                localStorage.setItem("refresh_token",action.payload.refreshToken);
            })
            .addCase(loginUser.pending,(state, action)=>{
                state.isAuthenticated = false;
            })

    }
});
export const {logOutUser} = userSlice.actions;
export default userSlice.reducer;