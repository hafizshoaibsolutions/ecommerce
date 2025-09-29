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

export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (_, { rejectWithValue }) => {

            console.log("Fetching products");

        try {
            const response = await axios.get("http://localhost:5000/api/products/get-product");
            console.log(response.data,"response data in getAllProducts thunk");
            return response.data;


    } catch (error) {
            console.error("Error fetching products:", error);
            return rejectWithValue("Failed to fetch products");
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

        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            console.log(action.payload,"response data in getAllProducts builder");
            state.isLoading = false;
            console.log(action.payload.products,"products in payload");
            state.products = action.payload
        }
        );
        builder.addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false;
        });
    }


});

export const { addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
