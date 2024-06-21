import { ChangeEvent } from "react";
import styles from "./Input.module.css";

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
        <div className={styles.input_container}>
            <label className={styles.label} htmlFor={id}>{label}</label>
            <input
                className={styles.input}
                value={value}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                onBlur={onBlur}
            />
            {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        </div>
    )
}

export default Input;