import { FieldShell } from "./FieldShell";
import styles from "./fields.module.scss";

export const TextField = ({ id, field, value, onChange }) => (
  <FieldShell id={id} label={field.label}>
    <input
      id={id}
      type="text"
      className={`${styles.control} nodrag`}
      value={value ?? ""}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  </FieldShell>
);
