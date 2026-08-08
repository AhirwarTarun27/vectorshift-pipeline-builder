import { FieldShell } from "./FieldShell";
import styles from "./fields.module.scss";

const normalise = (option) =>
  typeof option === "string" ? { value: option, label: option } : option;

export const SelectField = ({ id, field, value, onChange }) => (
  <FieldShell id={id} label={field.label}>
    <div className={styles.selectWrap}>
      <select
        id={id}
        className={`${styles.select} nodrag`}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      >
        {(field.options ?? []).map(normalise).map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={styles.option}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </FieldShell>
);
