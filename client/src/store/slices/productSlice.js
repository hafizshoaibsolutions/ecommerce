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
    async ({ search = '', page = 1 } = {}, { rejectWithValue }) => {

            console.log("Fetching products");

        try {
            const response = await axios.get(`http://localhost:5000/api/products/get-product?search=${search}&page=${page}`);
            console.log(response.data,"response data in getAllProducts thunk");
            return response.data;


    } catch (error) {
            console.error("Error fetching products:", error);
            return rejectWithValue("Failed to fetch products");
        }
    }
)


export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/get-product/${productId}`);
            console.log(response.data,"response data in getProductById thunk");
            return response.data;
        } catch (error) {
            console.error("Error fetching product:", error);
            return rejectWithValue("Failed to fetch product");
        }
    }
);

const initialState = {
    products: [],
    isLoading: false,
    error: null,
    productDetails: {},
    totalPages: 1,
    currentPage: 1,
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
            state.products = action.payload.products || [];
            state.totalPages = action.payload.totalPages || 1;
            state.currentPage = action.payload.currentPage || 1;
        }
        );
        builder.addCase(getAllProducts.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getProductById.pending, (state) => {
            state.isLoading = true;
            state.error = null;

            
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.productDetails = action.payload;
      
        });
        builder.addCase(getProductById.rejected, (state) => {
            state.isLoading = false;
            state.error = "Failed to fetch product";
        });

    }


});

export const { addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
