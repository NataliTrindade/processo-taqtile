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
        <div >
            <label htmlFor={id}>{label}</label>
            <input
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