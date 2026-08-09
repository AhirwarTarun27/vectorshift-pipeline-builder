import { Position } from "reactflow";
import { Type } from "lucide-react";

import { parseVariables } from "features/pipeline/lib/variables";

const OUTPUT_HANDLE = {
  id: "output",
  type: "source",
  position: Position.Right,
};

export const textDefinition = {
  type: "text",
  label: "Text",
  category: "text",
  icon: Type,
  description: "Free text, with {{ variables }} as inputs",
  handles: (data) => [
    ...parseVariables(data?.text).map((name) => ({
      id: `var-${name}`,
      type: "target",
      position: Position.Left,
      label: name,
    })),
    OUTPUT_HANDLE,
  ],
  fields: [
    {
      name: "text",
      label: "Text",
      type: "textarea",
      defaultValue: "{{input}}",
      placeholder: "Type text or {{ vars }}",
    },
  ],
};
