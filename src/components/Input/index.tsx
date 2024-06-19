import styles from "./Input.module.css";

interface InputProps {
    label: string;
    type: "email" | "password";
    value: string;
    id: string;
    name: string;
    placeholder: string;
    required?: boolean;
}

const Input = ({ label, type, value, id, name, placeholder, required = false }: InputProps) => {

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
            />
        </div>
    )
}

export default Input;