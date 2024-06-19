import { ReactElement } from 'react';
import styles from "./Button.module.css";

interface ButtonProps {
    children: ReactElement | string;
    disabled?: boolean;
}

const Button = ({ children, disabled }: ButtonProps) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={styles.button}
        >
            {children}
        </button>
    );
}

export default Button;
