import { Position } from "reactflow";
import { Calculator } from "lucide-react";

export const mathDefinition = {
  type: "math",
  label: "Math",
  category: "transform",
  icon: Calculator,
  description: "Combines two numeric inputs with an operator",
  handles: [
    { id: "a", type: "target", position: Position.Left, label: "a" },
    { id: "b", type: "target", position: Position.Left, label: "b" },
    { id: "result", type: "source", position: Position.Right },
  ],
  fields: [
    {
      name: "operation",
      label: "Operation",
      type: "select",
      options: [
        { value: "add", label: "Add (+)" },
        { value: "subtract", label: "Subtract (−)" },
        { value: "multiply", label: "Multiply (×)" },
        { value: "divide", label: "Divide (÷)" },
      ],
      defaultValue: "add",
    },
  ],
};
