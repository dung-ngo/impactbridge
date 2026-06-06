type TextInputProps = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function TextInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
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
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-black"
      />
    </div>
  );
}
