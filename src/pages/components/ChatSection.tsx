import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import { EllipsisVertical, Trash } from "lucide-react";

interface VirtualizedListProps {
  height?: number;
  width?: number;
  itemSize?: number;
  itemCount?: number;
  overscanCount?: number;
}

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
        <Tooltip
          title="Delete"
          placement="right-start"
          
          enterDelay={300}
          // leaveDelay={1000}
          slots={{
            transition: Zoom,
          }}
        >
          <IconButton aria-label="Example">
            {/* <EllipsisVertical /> */}
            <Trash />
          </IconButton>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList({
  height = 400,
  width = 360,
  itemSize = 46,
  itemCount = 200,
  overscanCount = 5,
}: VirtualizedListProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: height,
        maxWidth: width,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={height}
        width={width}
        itemSize={itemSize}
        itemCount={itemCount}
        overscanCount={overscanCount}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
