'use client';






import { use, useRef, useState ,useEffect} from "react"
import { useSelector,useDispatch } from "react-redux";
import ImageUploader from "./imageFileUpload"
import { addCategory,fetchCategories} from "@/store/slices/categorySlice";
import { Button } from "@/components/ui/button"

export default function ProductCategories() {





  const imageUploaderRef = useRef(null)
  const [uploadedImages, setUploadedImages] = useState([])
  const [error, setError] = useState(null)
  const dispatch = useDispatch();


   useEffect(() => {
    // Fetch all categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  const { allCategories } = useSelector((state) => state.categories);
  console.log(allCategories,"items in category form");

  const [formData, setFormData] = useState({
    name: "",
    parent: ""

  });

 

  // When files are added or removed
  const handleImagesChange = (files) => {
    console.log("Updated images:", files)
    setUploadedImages(files)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevForm) => ({  ...prevForm, [name]: value }))
  }

  // When new files are added
  const handleNewImagesAdded = (newFiles) => {
    console.log("New images added:", newFiles)
  }

  // Example: handle submit form (including images)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)


    const form = new FormData()
    form.append("name", formData.name)
    
    form.append("parent", formData.parent)

    console.log("Form data before submission:", {
      name: formData.name,
      parent: formData.parent,
      images: uploadedImages.map(fileObj => fileObj.file.name) // Just log file names for clarity
    })

    if (uploadedImages.length === 0) {
      setError("Please upload at least one image.")
      return
    }

    // Prepare FormData to send to backend
    
    uploadedImages.forEach((fileObj) => {
      form.append("images", fileObj.file) // fileObj.file is the actual File
    })

    try {

      console.log("Submitting category with data:", {
        name: formData.name,
        parent: formData.parent,
        images: uploadedImages.map(fileObj => fileObj.file.name) // Just log file names for clarity
      })

      for (let pair of form.entries()) {
  console.log(pair[0], pair[1], pair[1] instanceof File ? `(File: ${pair[1].name})` : '');
}
      // Wait for the category to be added and lists to refresh
      await dispatch(addCategory(form)).unwrap();

      console.log("Category added successfully, refreshing lists...");
      console.log(form,"form data being sent to backend");
      
      // Only reset form if the submission was successful
      setFormData({ name: "", description: "", parent: "" });
      setUploadedImages([]);
      imageUploaderRef.current?.clearFiles();
      setError(null)
    } catch (error) {
      console.error("Failed to add category:", error);
      // Display the error message to the user
      setError(error?.message || "Failed to add category. Please try again.");
    }


  }



  return (
    

      <div className="border-[#E5E7EB] border-1 rounded-xl shadow-sm ">
        {/* Add Category Form */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                placeholder="e.g. Electronics"
                className="w-full mt-1 p-2 border rounded-lg  "
                value={formData?.name}
                onChange={handleChange}
                name="name"
                id="name"
                required
              />
            </div>

         

            <div>
              <label className="text-sm text-gray-600">Parent Category</label>
              <select  
                className="w-full mt-1 p-2 border rounded-lg text-gray-900 bg-white"
                name="parent"
                id="parent"
                value={formData?.parent}
                onChange={handleChange}
              >
                <option value="">No parent category</option>
                {allCategories.map((category) => (
                  <option 
                    key={category._id} 
                    value={category._id}
                    className="text-gray-900"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

         

          <ImageUploader
        ref={imageUploaderRef}
        onImagesChange={handleImagesChange}
        onNewImagesAdded={handleNewImagesAdded}
        maxFiles={3}
        maxSizeMB={5}
      />

           

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              >
                Save Category
              </button>
            
            </div>
          </form>
        </div>

        
      </div>
 
  );
  }
  
