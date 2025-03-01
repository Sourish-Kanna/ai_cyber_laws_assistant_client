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
  onSelect: (id: number) => void;
}

interface RowData {
  chatSections: ChatSection[];
  handleDelete: (id: number) => void;
  handleSelect: (id: number) => void;
}

function renderRow(props: ListChildComponentProps<RowData>) {
  const { index, style, data } = props;
  const { chatSections, handleDelete, handleSelect } = data;
  const section = chatSections[index];

  if (!section) return null;

  return (
    <ListItem
      style={style}
      key={section.chat_section_id}
      component="div"
      disablePadding
    >
      <ListItemButton onClick={() => handleSelect(section.chat_section_id)}>
        <ListItemText
          primary={section.title}
          // secondary={section.date}
        />
        <div className="flex flex-col">
          <p className="text-[12px] text-[#7bb972]">{section.time}</p>
          <p className="text-[10px] text-gray-500"> {section.date}</p>
        </div>
        <Tooltip
          title="Delete"
          placement="right-start"
          enterDelay={300}
          TransitionComponent={Zoom}
        >
          <IconButton
            aria-label="Delete"
            onClick={() => handleDelete(section.chat_section_id)}
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
  onSelect,
}: VirtualizedListProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: height,
        maxWidth: width,
        bgcolor: "background.paper",
        borderRight: `2px solid #1c261a`,
      }}
    >
      <FixedSizeList<RowData>
        height={height}
        width={width}
        itemSize={itemSize}
        itemCount={chatSections.length}
        overscanCount={overscanCount}
        itemData={{
          chatSections,
          handleDelete: onDelete,
          handleSelect: onSelect,
        }}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
