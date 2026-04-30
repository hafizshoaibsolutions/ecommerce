import React from "react";
import { Edit, Trash2 } from "lucide-react";


const CategoryRows = ({ categories, level = 0 }) => {
  console.log(categories,"categories in category rows")
  return (
    <>
      {categories.map((cat) => (
        <React.Fragment key={cat._id}>
          <tr
            className={`border-t border-gray-100 hover:bg-gray-50 transition`}
          >
            {/* Indent based on level */}
            <td
              className={`py-3 flex items-center gap-2`}
              style={{ paddingLeft: `${level * 24}px` }}
            >
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-8 h-8 rounded-md object-cover"
                />
              )}
              <span className="font-medium">{cat.name}</span>
            </td>

            <td className="text-gray-600 text-center">{cat.slug}</td>
            <td className="text-gray-600 text-center">{cat.products?.length || 0}</td>

            {/* Action buttons */}
            <td className="flex gap-2 mt-2 justify-center items-center">
              <button className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                <Edit size={16} />
              </button>
              <button className="cursor-pointer text-red-600 hover:text-red-800">
                <Trash2 size={16} />
              </button>
            </td>
          </tr>

          {/* 🔁 Recursively render child categories */}
          {cat.children && cat.children.length > 0 && (
            <CategoryRows categories={cat.children} level={level + 1} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default CategoryRows;

