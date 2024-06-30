import { ReactElement } from 'react';

interface ButtonProps {
    children: ReactElement | string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, disabled, onClick }: ButtonProps) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            onClick={onClick}
            className="font-bold text-white text-base w-full rounded-lg	min-h-11 my-2 bg-fuchsia-600 hover:bg-fuchsia-700 transition ease-in-out duration-300"
        >
            {children}
        </button>
    );
}

export default Button;