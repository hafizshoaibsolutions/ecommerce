import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:5000/api/products/categories"
});




export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/categories/get-all-categories");
      console.log(res.data,"res data")
      console.log("Fetched categories:", res.data.categories);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
  }
)

export const fetchCategoriesTree = createAsyncThunk(
  "categories/fetchCategoriesTree",
  async (_,{rejectWithValue}) => {

   try {

        const res = await axios.get("http://localhost:5000/api/products/categories/get-category-tree");
        console.log("Fetched categories tree:", res.data);

        return res.data;

   }catch (error) {
  
    console.log("Error fetching categories tree:", error);
    return rejectWithValue("Failed to fetch categories");
        
  }}
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue, dispatch }) => {

    console.log("Adding category with data:", categoryData);


    console.log("Category data being sent to backend:", {
      name: categoryData.get("name"),
      parent: categoryData.get("parent"),
      images: categoryData.getAll("images").map(file => file.name) // Log file names for clarity
    });



    try {
      const res = await api.post("/add-category", categoryData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // After successful creation, refresh both lists
      await Promise.all([
        dispatch(fetchCategories()),
        dispatch(fetchCategoriesTree())
      ]);
      
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add category");
    }
  }
);


const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categoriesTree: [],
    allCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesTree.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesTree.fulfilled, (state, action) => {

           console.log(action.payload,"response data in builder");
            state.loading = false;
            state.categoriesTree = action.payload.tree;
      })
      .addCase(fetchCategoriesTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log(action.payload,"response data in builder");
        state.loading = false;
        // Don't manually update allCategories here since fetchCategories will refresh it
        // with properly populated data
        
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log(action.payload.categories,"response data in builder");
        state.loading = false;
        state.allCategories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
