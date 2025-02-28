// VirtualizedList.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import { Trash } from "lucide-react";
import { ChatSection } from "../ChatBot/chatBot";

interface VirtualizedListProps {
  height?: number;
  width?: number;
  itemSize?: number;
  overscanCount?: number;
  chatSections: ChatSection[];
  onDelete: (id: number) => void;
}

interface RowData {
  chatSections: ChatSection[];
  handleDelete: (id: number) => void;
}

function renderRow(props: ListChildComponentProps<RowData>) {
  const { index, style, data } = props;
  const { chatSections, handleDelete } = data;
  const section = chatSections[index];

  if (!section) return null;

  return (
    <ListItem style={style} key={section.id} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={section.title} secondary={section.time} />
        <Tooltip
          title="Delete"
          placement="right-start"
          enterDelay={300}
          TransitionComponent={Zoom}
        >
          <IconButton
            aria-label="Delete"
            onClick={() => handleDelete(section.id)}
            edge="end"
          >
            <Trash size={18} />
          </IconButton>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList({
  height = 400,
  width = 360,
  itemSize = 72,
  overscanCount = 5,
  chatSections,
  onDelete,
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
      <FixedSizeList<RowData>
        height={height}
        width={width}
        itemSize={itemSize}
        itemCount={chatSections.length}
        overscanCount={overscanCount}
        itemData={{ chatSections, handleDelete: onDelete }}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
