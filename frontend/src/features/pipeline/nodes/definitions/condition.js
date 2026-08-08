import { Position } from "reactflow";
import { GitBranch } from "lucide-react";

export const conditionDefinition = {
  type: "condition",
  label: "Condition",
  category: "logic",
  icon: GitBranch,
  description: "Routes a value down one of two branches",
  handles: [
    { id: "value", type: "target", position: Position.Left },
    { id: "true", type: "source", position: Position.Right, label: "true" },
    { id: "false", type: "source", position: Position.Right, label: "false" },
  ],
  fields: [
    {
      name: "operator",
      label: "Test",
      type: "select",
      options: [
        { value: "isTruthy", label: "Is truthy" },
        { value: "equals", label: "Equals" },
        { value: "greaterThan", label: "Greater than" },
        { value: "lessThan", label: "Less than" },
      ],
      defaultValue: "isTruthy",
    },
    {
      name: "compareTo",
      label: "Compare to",
      type: "text",
      defaultValue: "",
      placeholder: "Leave blank for truthiness",
    },
  ],
};
