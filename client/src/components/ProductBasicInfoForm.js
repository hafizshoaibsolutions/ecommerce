import React, {useState,useRef,useImperativeHandle,forwardRef } from "react";
import ImageUploader from "./imageFileUpload";


const BasicInfoForm = forwardRef(({ product , dispatchProduct , onImagesChange },ref) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const imageUploaderRef = useRef(null);

  console.log(product,"product in basic info form");
  console.log(onImagesChange,"onImagesChange in basic info form");
  console.log(dispatchProduct,"dispatchProduct in basic info form");
  console.log(ref,"ref in basic info form");

  useImperativeHandle(ref, () => ({
    clearImages: () => {
      setSelectedImages([]);
      imageUploaderRef.current?.clearFiles(); // Clear files in ImageUploader
      onImagesChange?.([]) // Clear images in parent state
    }
  }));

 const handleImagesChange = (files) => {
    console.log("[v0] All images updated:", files)
    setSelectedImages(files)

    if (onImagesChange) {
      const rawFiles = files.map((f) => f.file)
      onImagesChange(rawFiles)
    }
  }

  const handleNewImagesAdded = (newFiles) => {
    console.log("New images added:", newFiles)
  }


   return (
  <div className="rounded-2xl py-2 mt-4 bg-white border-1 border-[#E4E7EC]">
    <h1 className="text-lg px-4 font-bold py-3 border-b border-[#E4E7EC]">
      Basic Product Info
    </h1>
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold">Add Product Basic Info</h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium">Product Name</label>
            <input
              type="text"
              value={product?.title}
              onChange= {(e) => dispatchProduct({ type: "SET_TITLE", payload: e.target.value })}
              className="w-full rounded-lg border p-2.5"
              placeholder="Type product title"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
              rows={8}
              value={product?.description}
              onChange={(e) => dispatchProduct({ type: "SET_DESCRIPTION", payload: e.target.value })}
              className="w-full rounded-lg border p-2.5"
              placeholder="Your description here"
            />
          </div>
          <div className="sm:col-span-2">
          
     

      <ImageUploader
        ref={imageUploaderRef}
        onImagesChange={handleImagesChange}
        onNewImagesAdded={handleNewImagesAdded}
        maxFiles={10}
        maxSizeMB={5}
      />

      {/* Display selected images info */}
      {selectedImages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Selected Images ({selectedImages.length}):</h2>
          <ul className="space-y-1">
            {selectedImages.map((file) => (
              <li key={file.id} className="text-sm">
                {file.file.name} - {Math.round(file.file.size / 1024)}KB
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
          </div>
        </div>
      
    </section>
  </div>
)});

export default BasicInfoForm;
