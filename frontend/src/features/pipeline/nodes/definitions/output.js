import { Position } from "reactflow";
import { LogOut } from "lucide-react";

export const outputDefinition = {
  type: "customOutput",
  label: "Output",
  category: "output",
  icon: LogOut,
  description: "Terminal node - where a pipeline result leaves the graph",
  handles: [{ id: "value", type: "target", position: Position.Left }],
  fields: [
    {
      name: "outputName",
      label: "Name",
      type: "text",
      defaultValue: (nodeId) => nodeId.replace("customOutput-", "output_"),
    },
    {
      name: "outputType",
      label: "Type",
      type: "select",
      options: ["Text", "Image"],
      defaultValue: "Text",
    },
  ],
};
