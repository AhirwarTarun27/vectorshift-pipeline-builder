import { TextField } from "./TextField";
import { SelectField } from "./SelectField";
import { TextAreaField } from "./TextAreaField";
import { StaticText } from "./StaticText";
import { UnknownField } from "./UnknownField";

export const FIELD_RENDERERS = {
  text: TextField,
  select: SelectField,
  textarea: TextAreaField,
  static: StaticText,
};

export const resolveFieldRenderer = (type) =>
  FIELD_RENDERERS[type] ?? UnknownField;
