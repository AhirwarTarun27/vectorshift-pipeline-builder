import { Position } from "reactflow";
import { Funnel } from "lucide-react";

export const filterDefinition = {
  type: "filter",
  label: "Filter",
  category: "transform",
  icon: Funnel,
  description: "Keeps only the values matching a condition",
  handles: [
    { id: "input", type: "target", position: Position.Left },
    { id: "output", type: "source", position: Position.Right },
  ],
  fields: [
    {
      name: "operator",
      label: "Condition",
      type: "select",
      options: [
        { value: "contains", label: "Contains" },
        { value: "equals", label: "Equals" },
        { value: "startsWith", label: "Starts with" },
        { value: "regex", label: "Matches regex" },
      ],
      defaultValue: "contains",
    },
    {
      name: "value",
      label: "Value",
      type: "text",
      defaultValue: "",
      placeholder: "Value to match",
    },
  ],
};
