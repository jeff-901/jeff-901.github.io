/** @format */

import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

export default function HashTag(props) {
  const { allTags, setNewTag, value, setValue, updateTag } = props;
  // const [value, setValue] = useState(null);

  const handleSelect = (e, newValue) => {
    if (typeof newValue === "string") {
      setValue({
        title: newValue,
      });
      updateTag({
        title: newValue,
      });

      let match = false;
      for (let i = 0; i < allTags.length; i++) {
        if (allTags[i].title === newValue) {
          match = true;
          break;
        }
      }
      if (!match) {
        setNewTag({ title: newValue });
        // setAllTags([...allTags, { title: newValue }]);
      }
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setValue({
        title: newValue.inputValue,
      });
      updateTag({
        title: newValue.inputValue,
      });

      let match = false;
      for (let i = 0; i < allTags.length; i++) {
        if (allTags[i].title === newValue.inputValue) {
          match = true;
          break;
        }
      }
      if (!match) {
        setNewTag({ title: newValue.inputValue });
        // setAllTags([...allTags, { title: newValue.inputValue }]);
      }
    } else {
      setValue(newValue);
      updateTag(newValue);
    }
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleSelect}
      filterOptions={(allTags, params) => {
        const filtered = filter(allTags, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={allTags}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(option) => option.title}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="" variant="outlined" />
      )}
    />
  );
}
