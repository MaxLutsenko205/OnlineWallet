import { useState } from "react";
import { useSubmit } from "react-router";
import { CategoryModal } from "~/components/modals/CategoryModal";
import type { Category } from "~/types/Category";

export default function SettingsPage({
  categories,
}: {
  categories: Category[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const submit = useSubmit();

  const handleOpenModal = (category?: Category) => {
    setSelectedCategory(category || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const buildFormData = (category: Partial<Category>) => {
    const formData = new FormData();
    if (category.name !== undefined) formData.append("name", category.name);
    if (category.textHex !== undefined)
      formData.append("textHex", category.textHex);
    if (category.bgHex !== undefined) formData.append("bgHex", category.bgHex);
    if (selectedCategory?.id) formData.append("id", selectedCategory.id.toString());
    return formData;
  };

  const handleSubmit = async (data: Partial<Category>) => {
    const formData = buildFormData(data);
    if (selectedCategory) {
      formData.append("action", "put");
    } else {
      formData.append("action", "post");
    }
    submit(formData, {
      method: selectedCategory ? "put" : "post",
    });
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    const formData = buildFormData(selectedCategory);
    formData.append("action", "delete");
    submit(formData, {
      method: "delete",
    });
    closeModal();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Categories</h1>
      
      <button
        className="mb-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg"
        onClick={() => handleOpenModal()}
      >
        ➕ Add Category
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-4 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
            onClick={() => handleOpenModal(category)}
          >
            <div
              className={`text-${category.textHex} bg-${category.bgHex} p-3 rounded-lg text-center font-semibold`}
            >
              {category.name}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <CategoryModal
          onClose={closeModal}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          category={selectedCategory}
        />
      )}
    </div>
  );
}
