"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { SearchIcon } from "lucide-react";
import Icon from "../icon/icon";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #E0E0E0",
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.65),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "350px",
  [theme.breakpoints.up("sm")]: {
    width: "350px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "350px",
    [theme.breakpoints.up("md")]: {
      width: "280px",
    },
  },
}));

const SearchBar = React.memo(function SearchBar({ search, setSearch }) {
  return (
    <Search>
      <SearchIconWrapper>
        <Icon>
          <SearchIcon />
        </Icon>
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Поиск…"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Search>
  );
});

export default SearchBar;
