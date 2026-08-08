import { BaseNode } from "./BaseNode";
import { NODE_DEFINITIONS } from "./definitions";

export { NODE_DEFINITIONS, getDefinition, buildInitialData } from "./definitions";

export const nodeTypes = Object.fromEntries(
  NODE_DEFINITIONS.map((definition) => [definition.type, BaseNode])
);
