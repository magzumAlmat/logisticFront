import styled from "@emotion/styled";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

export default function ButtonGroup({ options, groupBy, setGroupBy }) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={groupBy}
      exclusive
      aria-label="Platform"
      onChange={(event, newGroupBy) => setGroupBy(newGroupBy)}
    >
      {options &&
        options.map((option, index) => (
          <ToggleButton
            key={index}
            value={option.value}
            sx={{ textTransform: "none" }}
          >
            {option.text}
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
}
