import { useState } from "react";
import type { Category } from "~/types/Category";

interface Props {
  category: Category | null;
  onClose: () => void;
  onSubmit: (data: Partial<Category> & { iconFile?: File }) => void;
  onDelete: () => void;
}

export function CategoryModal({
  category,
  onClose,
  onSubmit,
  onDelete,
}: Props) {
  const [form, setForm] = useState<Partial<Category>>(
    category || {
      name: "",
      bgHex: "",
      textHex: "",
    }
  );

  const [iconFile, setIconFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6 text-black">
        <h2 className="text-2xl font-semibold text-center">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <input
          type="text"
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        <input
          type="text"
          name="bgHex"
          value={form.bgHex || ""}
          onChange={handleChange}
          placeholder="Background Color Hex"
          className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        <input
          type="text"
          name="textHex"
          value={form.textHex || ""}
          onChange={handleChange}
          placeholder="Text Color Hex"
          className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        <div className="flex justify-between items-center pt-4">
          {category && (
            <button
              className="text-red-600 hover:text-red-800 transition duration-300"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
          <div className="space-x-3">
            <button
              className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
              onClick={handleSubmit}
            >
              {category ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
