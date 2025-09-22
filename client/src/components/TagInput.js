"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input"; // shadcn input

export default function TagInput({
  placeholder = "Add a tag and press enter...",
  tags ,
 dispatchProduct,
}) {
  const [inputValue, setInputValue] = useState("");

  // Add new tag when pressing Enter or Comma
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        updateProduct("tags", newTags); // ✅ update parent
      }
      setInputValue("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    dispatchProduct({ type: "SET_TAGS", payload: newTags }); // ✅ update parent
  };

  console.log("TagInput render", tags);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-[#DDDDDD] bg-background p-1 focus-within:ring-1 focus-within:ring-[#DDDDDD]">
        {tags && tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}

        {/* Input field */}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus:outline-none"
        />
      </div>
    </div>
  );
}


  

 
  



//   // Add new tag when pressing Enter or Comma
//   const handleKeyDown = (e) => {
//     if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
//       e.preventDefault();
//       if (!tags.includes(inputValue.trim())) {
//         setTags([...tags, inputValue.trim()]);
//       }
//       setInputValue("");
//     }
//   };

//   // Remove tag
//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove));
//   };

//   return (
//     <div className="w-full">
//       <div
//         className="flex flex-wrap items-center gap-2 rounded-md border border-[#DDDDDD] bg-background p-1 focus-within:ring-1 focus-within:ring-[#DDDDDD]"
//       >
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
//           >
//             {tag}
//             <button
//               type="button"
//               onClick={() => removeTag(tag)}
//               className="text-muted-foreground hover:text-destructive"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </span>
//         ))}

//         {/* Input field */}
//         <Input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder={placeholder}
//           className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus:outline-none"
//         />
//       </div>
//     </div>
//   );
// }
