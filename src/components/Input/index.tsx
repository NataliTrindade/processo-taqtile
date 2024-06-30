import { ChangeEvent } from "react";

interface InputProps {
    label: string;
    type: "email" | "password";
    value: string;
    id: string;
    name: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    errorMessage: string;
    required?: boolean;
}

const Input = ({
    label,
    type,
    value,
    id,
    name,
    placeholder,
    onChange,
    onBlur,
    errorMessage,
    required = false
}: InputProps) => {
    return (
        <div>
            <label htmlFor={id} className="label">{label}</label>
            <input
                className="input"
                value={value}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                onBlur={onBlur}
            />
            {errorMessage && <span className="error">{errorMessage}</span>}
        </div>
    )
}

export default Input;