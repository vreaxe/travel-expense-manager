import React, { useState } from "react";
import { TRIP_EXPENSES_QUERY, TRIP_QUERY } from "../../graphql/queries";

import Button from "../elements/Button";
import { CREATE_OR_UPDATE_TRIP_CATEGORY_MUTATION } from "../../graphql/mutations";
import CategoryCard from "./elements/CategoryCard";
import { DELETE_TRIP_CATEGORY_MUTATION } from "../../graphql/mutations";
import ErrorMessage from "./errors/ErrorMessage";
import omit from "lodash/omit";
import { useMutation } from "@apollo/react-hooks";

const AddEditTripCategoriesForm = props => {
  const [categories, setCategories] = useState(props.categories || []);
  const [
    createEditTripCategories,
    {
      loading: loadingCreateEditTripCategories,
      error: errorCreateEditTripCategories
    }
  ] = useMutation(CREATE_OR_UPDATE_TRIP_CATEGORY_MUTATION, {
    variables: {
      tripId: props.tripId,
      categories: categories.map(o => omit(o, "__typename"))
    },
    refetchQueries: [
      {
        query: TRIP_QUERY,
        variables: { id: props.tripId }
      },
      {
        query: TRIP_EXPENSES_QUERY,
        variables: { tripId: props.tripId }
      }
    ]
  });
  const [deleteTripCategory] = useMutation(DELETE_TRIP_CATEGORY_MUTATION);

  const addCategory = () => {
    let randomColor = "#000000".replace(/0/g, function() {
      return (~~(Math.random() * 16)).toString(16);
    });
    let newCategory = {
      color: randomColor,
      name: `New category ${categories.length}`
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (position, category) => {
    if (category.id) {
      deleteTripCategory({
        variables: {
          categoryId: category.id,
          tripId: props.tripId
        },
        refetchQueries: [
          {
            query: TRIP_QUERY,
            variables: { id: props.tripId }
          },
          {
            query: TRIP_EXPENSES_QUERY,
            variables: { tripId: props.tripId }
          }
        ]
      });
    }
    // Fix for when we are trying to hide the modal
    // otherwise it will show a warning
    // because the modal is still being shown
    // but the component where the modal is
    // is eliminated (see Modali code has a 10ms timeout)
    let timeoutFix = setTimeout(() => {
      categories.splice(position, 1);
      setCategories([...categories]);
      clearTimeout(timeoutFix);
    }, 10);
  };

  const onNameChange = (position, name) => {
    categories[position].name = name;
    setCategories([...categories]);
  };

  const onColorChange = (position, color) => {
    categories[position].color = color.hex;
    setCategories([...categories]);
  };

  return (
    <>
      <div className="mb-5 flex justify-between">
        <Button
          data-cy="add-category"
          size="small"
          style="info"
          onClick={() => addCategory()}
        >
          ➕ Add Category
        </Button>
        <Button
          data-cy="save-categories"
          onClick={async () => {
            const res = await createEditTripCategories();
            setCategories([
              ...res.data.createOrUpdateTripCategory.trip.categories
            ]);
          }}
          loading={loadingCreateEditTripCategories}
        >
          Save
        </Button>
      </div>
      <ErrorMessage error={errorCreateEditTripCategories} />
      {categories.map((category, i) => (
        <CategoryCard
          key={i}
          position={i}
          category={category}
          onNameChange={onNameChange}
          onColorChange={onColorChange}
          deleteCategory={deleteCategory}
        />
      ))}
    </>
  );
};

export default AddEditTripCategoriesForm;
