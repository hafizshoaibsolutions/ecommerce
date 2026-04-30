'use client';






import { use, useRef, useState ,useEffect} from "react"
import { useSelector,useDispatch } from "react-redux";
import ImageUploader from "./imageFileUpload"
import { addCategory,fetchCategories} from "@/store/slices/categorySlice";
import { Button } from "@/components/ui/button"

export default function ProductCategories() {





  const imageUploaderRef = useRef(null)
  const [uploadedImages, setUploadedImages] = useState([])
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


    const form = new FormData()
    form.append("name", formData.name)
    
    form.append("parent", formData.parent)

    if (uploadedImages.length === 0) {
      alert("Please upload at least one image.")
      return
    }

    // Prepare FormData to send to backend
    
    uploadedImages.forEach((fileObj) => {
      form.append("images", fileObj.file) // fileObj.file is the actual File
    })

    try {
      // Wait for the category to be added and lists to refresh
      await dispatch(addCategory(form)).unwrap();
      
      // Only reset form if the submission was successful
      setFormData({ name: "", description: "", parent: "" });
      setUploadedImages([]);
      imageUploaderRef.current?.clearFiles();
    } catch (error) {
      console.error("Failed to add category:", error);
      // Here you could show an error toast/alert to the user
    }


  }



  return (
    

      <div className="border-[#E5E7EB] border-1 rounded-xl shadow-sm ">
        {/* Add Category Form */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
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
  
