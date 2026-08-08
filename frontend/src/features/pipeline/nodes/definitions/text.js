import { Position } from "reactflow";
import { Type } from "lucide-react";

export const textDefinition = {
  type: "text",
  label: "Text",
  category: "text",
  icon: Type,
  description: "Free text, with {{ variables }} as inputs",
  handles: [{ id: "output", type: "source", position: Position.Right }],
  fields: [
    {
      name: "text",
      label: "Text",
      type: "textarea",
      defaultValue: "{{input}}",
      placeholder: "Write text, use {{ variables }} for inputs",
    },
  ],
};
