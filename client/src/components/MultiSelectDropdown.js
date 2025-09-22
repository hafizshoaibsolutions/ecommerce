import React from "react";
import { X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"; // ✅ use shadcn Label

export default function MultiSelect({ label, selected = [], onChange }) {
  const options = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Toys & Games",
    "Sports & Outdoors",
    "Health & Beauty",
    "Automotive",
    "Grocery",
    "Pet Supplies",
  ];

  const removeOption = (value) => {
    onChange(selected.filter((v) => v !== value));
  };

  const renderSelectedSummary = () => {
    if (selected.length === 0) return `Select ${label}`;
    if (selected.length <= 2) return selected.join(", ");
    return `${selected.slice(0, 3).join(", ")} +${selected.length - 3} more`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between  text-left overflow-hidden">
          <span>{renderSelectedSummary()}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-2">
        {/* Selected chips */}
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map((value) => (
            <div
              key={value}
              className="flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-sm"
            >
              {value}
              <X
                className="h-4 w-4 cursor-pointer"
                onClick={() => removeOption(value)}
              />
            </div>
          ))}
        </div>

        {/* Checkbox list */}
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
          {options.map((option) => (
            <div key={option} className="flex items-center gap-2">
              <Checkbox
                checked={selected.includes(option)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange([...selected, option]);
                  } else {
                    onChange(selected.filter((v) => v !== option));
                  }
                }}
                id={option} // ✅ connect checkbox with Label
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}




