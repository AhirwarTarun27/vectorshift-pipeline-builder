import { Position } from "reactflow";
import { Sparkles } from "lucide-react";

export const llmDefinition = {
  type: "llm",
  label: "LLM",
  category: "llm",
  icon: Sparkles,
  description: "Runs a prompt through a language model",
  handles: [
    { id: "system", type: "target", position: Position.Left, label: "system" },
    { id: "prompt", type: "target", position: Position.Left, label: "prompt" },
    { id: "response", type: "source", position: Position.Right },
  ],
  fields: [{ name: "note", type: "static", text: "This is a LLM." }],
};
