import { Position } from "reactflow";
import { LogIn } from "lucide-react";

export const inputDefinition = {
  type: "customInput",
  label: "Input",
  category: "input",
  icon: LogIn,
  description: "Entry point for data flowing into the pipeline",
  handles: [{ id: "value", type: "source", position: Position.Right }],
  fields: [
    {
      name: "inputName",
      label: "Name",
      type: "text",
      defaultValue: (nodeId) => nodeId.replace("customInput-", "input_"),
    },
    {
      name: "inputType",
      label: "Type",
      type: "select",
      options: ["Text", "File"],
      defaultValue: "Text",
    },
  ],
};
