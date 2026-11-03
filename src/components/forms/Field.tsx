import { CircleAlert } from "lucide-react";

const inputBase =
  "mt-2 block w-full rounded-lg border-2 bg-white px-3.5 py-2.5 text-ink transition-colors focus:border-gold-700 focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold-700 aria-[invalid=true]:border-error";

function describedBy(id: string, hint?: React.ReactNode, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function FieldLabel({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="block font-ui font-semibold text-ink">
      {label} <span className="font-normal text-body">{required ? "(required)" : "(optional)"}</span>
    </label>
  );
}

export function FieldHint({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={`${id}-hint`} className="mt-1 text-[0.9375rem] text-body">
      {children}
    </p>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-2 font-semibold text-error">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <span>
        <span className="sr-only">Error: </span>
        {error}
      </span>
    </p>
  );
}

interface CommonProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: React.ReactNode;
  error?: string;
}

type InputProps = CommonProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "required">;

export function TextField({ id, label, required, hint, error, className = "", ...rest }: InputProps) {
  return (
    <div className={error ? "border-l-4 border-error pl-4" : ""}>
      <FieldLabel id={id} label={label} required={required} />
      <FieldHint id={id}>{hint}</FieldHint>
      <FieldError id={id} error={error} />
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputBase} min-h-12 ${error ? "border-error" : "border-ink-soft"} ${className}`}
        {...rest}
      />
    </div>
  );
}

type TextAreaProps = CommonProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "required">;

export function TextAreaField({ id, label, required, hint, error, rows = 5, ...rest }: TextAreaProps) {
  return (
    <div className={error ? "border-l-4 border-error pl-4" : ""}>
      <FieldLabel id={id} label={label} required={required} />
      <FieldHint id={id}>{hint}</FieldHint>
      <FieldError id={id} error={error} />
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputBase} ${error ? "border-error" : "border-ink-soft"}`}
        {...rest}
      />
    </div>
  );
}

type SelectProps = CommonProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id" | "required"> & {
    options: { value: string; label: string }[];
  };

export function SelectField({ id, label, required, hint, error, options, ...rest }: SelectProps) {
  return (
    <div className={error ? "border-l-4 border-error pl-4" : ""}>
      <FieldLabel id={id} label={label} required={required} />
      <FieldHint id={id}>{hint}</FieldHint>
      <FieldError id={id} error={error} />
      <select
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputBase} min-h-12 ${error ? "border-error" : "border-ink-soft"}`}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface RadioGroupProps {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  hint?: string;
}

export function RadioGroup({ name, legend, options, hint }: RadioGroupProps) {
  return (
    <fieldset aria-describedby={hint ? `${name}-hint` : undefined}>
      <legend className="font-ui font-semibold text-ink">
        {legend} <span className="font-normal text-body">(optional)</span>
      </legend>
      <FieldHint id={name}>{hint}</FieldHint>
      <div className="mt-2 flex flex-wrap gap-x-6">
        {options.map((o) => (
          <label key={o.value} className="inline-flex min-h-11 items-center gap-3">
            <input type="radio" name={name} value={o.value} className="size-5 accent-gold-700" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface CheckboxProps {
  id: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}

export function CheckboxField({ id, children, required, error }: CheckboxProps) {
  return (
    <div className={error ? "border-l-4 border-error pl-4" : ""}>
      <FieldError id={id} error={error} />
      <div className="mt-1 flex items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-6 shrink-0 accent-gold-700"
        />
        <label htmlFor={id} className="text-ink">
          {children} {required && <span className="text-body">(required)</span>}
        </label>
      </div>
    </div>
  );
}
