import { useState, useCallback, useDebugValue } from 'react'

import { validateEmail } from '../utils/utils'

export function useFormAndValidation() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(true)

  useDebugValue({ values, errors, isValid })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'email') {
      if (!validateEmail(value)) {
        e.target.setCustomValidity('invalid email')
      } else {
        e.target.setCustomValidity('')
      }
    }

    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: e.target.validationMessage })
    setIsValid(e.target.closest('form').checkValidity())
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid]
  )

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setIsValid,
    setValues,
  }
}
