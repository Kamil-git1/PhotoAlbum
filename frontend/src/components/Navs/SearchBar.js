import { Autocomplete, TextField } from "@mui/material"

import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { searchCollection } from "../../redux/slices/collection/collectionSlice"
function SearchBar({ data }) {
  const [filter, setFilter] = React.useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const handleChange = (e) => {
    setFilter(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchCollection(filter))
    navigate("/found-collection")
  }

  const { t } = useTranslation()

  if (Array.isArray(data)) {
    return (
      <form onSubmit={handleSubmit}>
        <Autocomplete
          size="small"
          sx={{ minWidth: "5rem" }}
          freeSolo
          onSubmit={handleSubmit}
          disableClearable
          options={data?.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              onSelect={handleChange}
              // onChange={handleChange}
              placeholder={t("Search")}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </form>
    )
  }
}

export default SearchBar
