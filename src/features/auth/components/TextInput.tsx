type TextInputProps = {
  id: string;
  name: string;
  label?: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  className: string;
  isDisabled?: boolean;
};

export function TextInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  className,
  isDisabled,
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange && onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={className}
        disabled={isDisabled}
      />

      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
