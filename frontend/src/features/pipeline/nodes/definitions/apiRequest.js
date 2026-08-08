import { Position } from "reactflow";
import { Globe } from "lucide-react";

export const apiRequestDefinition = {
  type: "apiRequest",
  label: "API Request",
  category: "data",
  icon: Globe,
  description: "Calls an HTTP endpoint and branches on success or failure",
  handles: [
    { id: "trigger", type: "target", position: Position.Left },
    {
      id: "response",
      type: "source",
      position: Position.Right,
      label: "response",
    },
    { id: "error", type: "source", position: Position.Right, label: "error" },
  ],
  fields: [
    {
      name: "method",
      label: "Method",
      type: "select",
      options: ["GET", "POST", "PUT", "DELETE"],
      defaultValue: "GET",
    },
    {
      name: "url",
      label: "URL",
      type: "text",
      defaultValue: "",
      placeholder: "https://api.example.com/v1",
    },
  ],
};
