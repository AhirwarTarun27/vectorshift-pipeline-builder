import { StickyNote } from "lucide-react";

export const noteDefinition = {
  type: "note",
  label: "Note",
  category: "note",
  icon: StickyNote,
  description: "A canvas annotation - not part of the pipeline",
  fields: [
    {
      name: "body",
      label: "Note",
      type: "textarea",
      defaultValue: "",
      placeholder: "Leave a note here",
    },
  ],
};
