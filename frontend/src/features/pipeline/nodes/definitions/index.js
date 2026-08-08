import { inputDefinition } from "./input";
import { outputDefinition } from "./output";
import { llmDefinition } from "./llm";
import { textDefinition } from "./text";
import { filterDefinition } from "./filter";
import { mathDefinition } from "./math";
import { apiRequestDefinition } from "./apiRequest";
import { conditionDefinition } from "./condition";
import { noteDefinition } from "./note";

export const NODE_DEFINITIONS = [
  inputDefinition,
  llmDefinition,
  outputDefinition,
  textDefinition,
  filterDefinition,
  mathDefinition,
  conditionDefinition,
  apiRequestDefinition,
  noteDefinition,
];

const DEFINITIONS_BY_TYPE = new Map(
  NODE_DEFINITIONS.map((definition) => [definition.type, definition])
);

export const getDefinition = (type) => {
  const definition = DEFINITIONS_BY_TYPE.get(type);
  if (!definition) {
    throw new Error(
      `No node definition registered for type "${type}". ` +
        `Add it to NODE_DEFINITIONS in features/pipeline/nodes/definitions/index.js.`
    );
  }
  return definition;
};

export const buildInitialData = (definition, nodeId) => {
  const data = { id: nodeId, nodeType: definition.type };

  for (const field of definition.fields ?? []) {
    if (field.type === "static") continue;
    data[field.name] =
      typeof field.defaultValue === "function"
        ? field.defaultValue(nodeId)
        : field.defaultValue ?? "";
  }

  return data;
};
