import Modali, { useModali } from "modali";
import React, { useState } from "react";

import Button from "../../elements/Button";
import { ChromePicker } from "react-color";
import Trash from "../../elements/Trash";

const CategoryCard = ({
  position,
  category,
  onNameChange,
  onColorChange,
  deleteCategory
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [confirmDelete, confirmDeleteModal] = useModali({
    animated: true,
    centered: true,
    title: "Are you sure?",
    message: `Deleting category named ${category.name} and its related expenses permanently.`,
    buttons: [
      <Button
        style="transparent"
        size="small"
        onClick={() => confirmDeleteModal()}
      >
        Cancel
      </Button>,
      <Button
        data-cy="category-delete"
        style="danger"
        size="small"
        onClick={() => {
          confirmDeleteModal();
          deleteCategory(position, category);
        }}
      >
        Delete
      </Button>
    ]
  });

  const handleNameChange = event => {
    onNameChange(position, event.target.value);
  };

  const handleColorChange = color => {
    onColorChange(position, color);
  };

  return (
    <div className="flex mb-5 category-card">
      <div className="flex w-11/12 bg-white shadow p-3">
        <div className="w-1/12">
          <span
            className="block h-6 w-6 rounded ml-3"
            style={{ backgroundColor: `${category.color}` }}
            onClick={() => setDisplayColorPicker(true)}
          ></span>
          {displayColorPicker && (
            <div className="absolute z-auto">
              <div
                className="fixed top-0 right-0 left-0 bottom-0"
                onClick={() => setDisplayColorPicker(false)}
              />
              <ChromePicker
                disableAlpha={true}
                color={category.color}
                onChange={handleColorChange}
              />
            </div>
          )}
        </div>
        <div className="w-11/12">
          <input
            type="text"
            className="w-full"
            value={category.name}
            onChange={handleNameChange}
          />
        </div>
      </div>
      <div className="text-center w-1/12">
        <div className="h-full">
          <div className="flex items-center justify-center h-full">
            <Trash onClick={confirmDeleteModal} />
          </div>
        </div>
      </div>
      <Modali.Modal {...confirmDelete} />
    </div>
  );
};

export default CategoryCard;
