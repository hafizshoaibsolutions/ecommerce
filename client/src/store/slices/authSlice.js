import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"




const api = axios.create({
    baseURL:"http://localhost:5000" , // Base URL from environment variables
    headers: {
        "Content-Type": "application/json", // Default header for JSON requests
    },
});


const getTokenFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}



export const registerUser = createAsyncThunk(
    "auth/register",
    async(formData,{ rejectWithValue })=>{
        console.log(formData,"formData")
         
        try {

           const response = await axios.post("http://localhost:5000/api/auth/signup",formData)
           console.log(response.data.message)

           return response.data
            
        } catch (error) {
            console.log("Error response data:", error?.response?.data)

            return rejectWithValue(
                error?.response?.data || { message: error?.message }
            )
            
        }
    }
    
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async(formData,{ rejectWithValue })=>{
        console.log(formData,"formData")
         
        try {

                     const response = await api.post("/api/auth/login",formData)
                     console.log("login response:", response.data)

                     // server returns token at response.data.token
                     const token = response?.data?.token || response?.data?.user?.token

                     if (token && typeof window !== "undefined") {
                         localStorage.setItem("token", token)
                     }

                     return response.data
            
        } catch (error) {

            console.log("Error:", error?.response?.data)

            return rejectWithValue(
                error?.response?.data || { message: error?.message }
            )
            
        }
    }
    
)

export const tokenValidation = createAsyncThunk(
    "auth/validateToken",
    async(_,{ rejectWithValue })=>{

       
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
       
        try {
          


                     if (!token) {
                         return rejectWithValue("No token found")
                     }

                     // Use configured api baseURL and send Bearer prefix
                     const response = await api.get("/api/auth/auth-verify", {
                         headers: {
                             Authorization: `Bearer ${token}`,
                         },
                     })

                     console.log("token validation response:", response.data)
                     return response.data
            
        } catch (error) {

            console.log("Error:", error?.response?.data)

            return rejectWithValue(
                error?.response?.data || { message: error?.message }
            )
            
        }
    }
    
)




const authSlice = createSlice({
    name:"auth",
    initialState:{
        user : null ,
        isAuthenticated : false,
        isLoading : true,
        error:null,
        token: getTokenFromLocalStorage(),
    },
    reducers:{
        logout:(state,action)=>{
           state.isAuthenticated = false
           state.user = null
           state.token = null
           if(typeof window !== "undefined"){
               localStorage.removeItem("token")
           }
           
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state,action)=>{
             state.isLoading = true
             state.error = null
        }
        )
        builder.addCase(registerUser.fulfilled,(state,action)=>{

            console.log(action.payload,"action payload in builder")
            const token = action.payload?.token || action.payload?.user?.token || null
            state.user = action.payload
            state.token = token
            state.isLoading = false
            state.isAuthenticated = action?.payload?.success || false
        }
        )
        builder.addCase(registerUser.rejected,(state,action)=>{
                console.log(action.payload,"action payload in rejected")
                console.log(action.error, "action error in rejected")

             state.error = action.payload?.message || action.payload || "Registration failed"
             state.isLoading = false
             state.isAuthenticated = false
        }
        )
        builder.addCase(loginUser.pending,(state,action)=>{
            state.isLoading = true
            state.error = null
            state.isAuthenticated =false
       }
       )
       builder.addCase(loginUser.fulfilled,(state,action)=>{
            console.log(action.payload,"action payload")
           state.user = action.payload.success?action.payload:null
           state.isLoading = false,
           state.isAuthenticated = action?.payload?.success
       }
       )
       builder.addCase(loginUser.rejected,(state,action)=>{
            console.log(action.payload,"action payload in rejected")
            console.log(action.error, "action error in rejected")
            state.error = action.payload?.message || action.payload || "Login failed"
            state.isLoading = false
            state.isAuthenticated = false
       }
       )
       builder.addCase(tokenValidation.pending,(state,action)=>{
          state.isLoading = true
          state.error = null
       }
   )
      builder.addCase(tokenValidation.fulfilled,(state,action)=>{
          console.log(action.payload,"action payload in builder ")
          state.user = action?.payload?.success?action.payload:null
          state.isLoading = false,
          state.isAuthenticated = action?.payload?.success
   }
   )
   builder.addCase(tokenValidation.rejected,(state,action)=>{
        console.log(action.payload, "action payload in rejected")
        console.log(action.error, "action error in rejected")
        state.error = action.payload?.message || action.payload || "Token validation failed"
        state.isLoading = false
        state.isAuthenticated = false
   }
   )
    }



})




export const {logout} = authSlice.actions
export default authSlice.reducer
