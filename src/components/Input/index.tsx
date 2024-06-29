import { ChangeEvent } from "react";
import styles from "./Input.module.css";

interface InputProps {
    label: string;
    type: "email" | "password";
    value: string;
    id: string;
    name: string;
    placeholder: string;
    onChange: (value: string) => void;
    required?: boolean;
}

const Input = ({ label, type, value, id, name, placeholder, onChange, required = false }: InputProps) => {

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onChange(value);
    }

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
                onChange={onChangeInput}
            />
        </div>
    )
}

export default Input;