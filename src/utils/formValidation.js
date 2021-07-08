import { useState } from "react";

export function useFormValidation () {
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleOnChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    const value = e.target.value;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage});
    setIsValid(target.closest('form').checkValidity());
  }

  return { values, setValues, errors, isValid, handleOnChange }
}