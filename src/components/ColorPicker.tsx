import React from "react";
import { Box, Button, Popover, Typography } from "@mui/material";
import { COLORS } from "../constants/colors";

function ColorPicker({
  open,
  anchorEl,
  onClose,
  handleChange,
  value,
}: {
  open: boolean;
  anchorEl: HTMLInputElement | HTMLTextAreaElement | null;
  onClose: () => void;
  handleChange: (event: React.FormEvent<HTMLDivElement>) => void;
  value: string;
}) {
  return (
    <>
      <Popover
        id="color-picker"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: "400px", padding: "1rem" }}>
          <Typography>Choose color</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {COLORS.map((color) => (
              <Box
                component="input"
                id="color"
                key={color.color}
                onFocus={handleChange}
                onChange={handleChange}
                value={color.color}
                sx={{
                  width: "1.5rem",
                  height: "1.5rem",
                  background: color.color,
                  color: "transparent",
                  cursor: "pointer",
                  border: value === color.color ? "1px solid #d1cfcf" : "none",
                }}
              ></Box>
            ))}
          </Box>
          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            Or pick your own{" "}
            <input type="color" id="color" onChange={handleChange} />
          </Typography>
          <Button disabled={!value} variant="contained" onClick={onClose}>
            Confirm
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default ColorPicker;
