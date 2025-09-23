import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
   
});


export const addProducts = createAsyncThunk(
    "product/addProducts",
    async (productFormData,{ rejectWithValue }) => {
         console.log(productFormData,"product data in thunk");

         
        try {
            const response = await axios.post("http://localhost:5000/api/products/add-product", productFormData,{
                 headers: {
                      'Content-Type': 'multipart/form-data'
                 }
            });
            console.log(response.data,"response data in thunk");
            return response.data;

        } catch (error) {
            console.error("Error adding product:", error);
            return rejectWithValue("Failed to add product");

        }
    }
)


const initialState = {
    products: [],
    isLoading: false
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
            addProduct: (state, action) => {
            
            },
       
        updateProduct: (state, action) => {
           
        }

    },
    extraReducers: (builder) => {
        // Add any async reducers here
        builder.addCase(addProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addProducts.fulfilled, (state, action) => {
            console.log(action.payload,"response data in builder");
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(addProducts.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const { addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
