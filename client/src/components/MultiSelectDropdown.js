// import React from "react";
// import { X } from "lucide-react";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label"; // ✅ use shadcn Label

// export default function MultiSelect({ label, selected = [], onChange }) {
//   const options = [
//     "Electronics",
//     "Clothing",
//     "Home & Kitchen",
//     "Books",
//     "Toys & Games",
//     "Sports & Outdoors",
//     "Health & Beauty",
//     "Automotive",
//     "Grocery",
//     "Pet Supplies",
//   ];

//   const removeOption = (value) => {
//     onChange(selected.filter((v) => v !== value));
//   };

//   const renderSelectedSummary = () => {
//     if (selected.length === 0) return `Select ${label}`;
//     if (selected.length <= 2) return selected.join(", ");
//     return `${selected.slice(0, 3).join(", ")} +${selected.length - 3} more`;
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="w-full justify-between  text-left overflow-hidden">
//           <span>{renderSelectedSummary()}</span>
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent className="w-[300px] p-2">
//         {/* Selected chips */}
//         <div className="flex flex-wrap gap-2 mb-2">
//           {selected.map((value) => (
//             <div
//               key={value}
//               className="flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-sm"
//             >
//               {value}
//               <X
//                 className="h-4 w-4 cursor-pointer"
//                 onClick={() => removeOption(value)}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Checkbox list */}
//         <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
//           {options.map((option) => (
//             <div key={option} className="flex items-center gap-2">
//               <Checkbox
//                 checked={selected.includes(option)}
//                 onCheckedChange={(checked) => {
//                   if (checked) {
//                     onChange([...selected, option]);
//                   } else {
//                     onChange(selected.filter((v) => v !== option));
//                   }
//                 }}
//                 id={option} // ✅ connect checkbox with Label
//               />
//               <Label htmlFor={option}>{option}</Label>
//             </div>
//           ))}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }


// src/components/MultiSelectDropdown.js
import React from "react";
import { X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function MultiSelectDropdown({
  label,
  selected = [],
  onChange,
  categories = [],
}) {
  const removeOption = (value) => {
    onChange(selected.filter((v) => v !== value));
  };

  const renderSelectedSummary = () => {
    if (selected.length === 0) return `Select ${label}`;
    const names = selected.map(item => typeof item === 'object' ? item.name : item);
    if (names.length <= 2) return names.join(", ");
    return `${names.slice(0, 3).join(", ")} +${names.length - 3} more`;
  };

  // Recursive render of category hierarchy
  const renderCategories = (categories, level = 0) => {
    return categories.map((cat) => (
      <div key={cat._id} className="ml-2">
        <div className="flex items-center gap-2" style={{ marginLeft: level * 10 }}>
          <Checkbox
            checked={selected.some(item => (typeof item === 'object' ? item._id : item) === cat._id)}
            onCheckedChange={(checked) => {
              if (checked) onChange([...selected, { _id: cat._id, name: cat.name }]);
              else onChange(selected.filter((v) => (typeof v === 'object' ? v._id : v) !== cat._id));
            }}
            id={cat._id}
          />
          <Label htmlFor={cat._id}>{cat.name}</Label>
        </div>
        {cat.children?.length > 0 && renderCategories(cat.children, level + 1)}
      </div>
    ));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-left overflow-hidden"
        >
          <span>{renderSelectedSummary()}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-2">
        {/* Selected items */}
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map((value) => (
            <div
              key={typeof value === 'object' ? value._id : value}
              className="flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-sm"
            >
              {typeof value === 'object' ? value.name : value}
              <X
                className="h-4 w-4 cursor-pointer"
                onClick={() => removeOption(value)}
              />
            </div>
          ))}
        </div>

        {/* Hierarchical category list */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {renderCategories(categories)}
        </div>
      </PopoverContent>
    </Popover>
  );
}




