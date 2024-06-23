import { ChangeEvent, useState } from "react";
import { validateEmail, validatePassword } from "../utils/inputValidations";

interface UseFormValidationProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    errorMessage: string;
}

const useFormValidation = (inputType?: 'email' | 'password'): UseFormValidationProps => {
    const [value, setValue] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };

    const onBlur = (): void => {
        validateInput();
    };

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setValue('');
    };

    const validateInput = (): void => {
        let error = '';
        if (inputType === "email") {
            error = validateEmail(value);
        } else if (inputType === "password") {
            error = validatePassword(value);
        }
        setErrorMessage(error);
    };

    return {
        value,
        setValue,
        onInputChange,
        onBlur,
        onFormSubmit,
        errorMessage
    };
};

export default useFormValidation;
