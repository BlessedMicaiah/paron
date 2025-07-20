import React from 'react';

// Validation utility functions

export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Must be no more than ${max} characters long`;
    }
    return null;
  },

  pattern: (regex, message) => (value) => {
    if (!value) return null;
    if (!regex.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },

  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  number: (value) => {
    if (!value) return null;
    if (isNaN(Number(value))) {
      return 'Please enter a valid number';
    }
    return null;
  },

  range: (min, max) => (value) => {
    if (!value) return null;
    const num = Number(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < min || num > max) {
      return `Must be between ${min} and ${max}`;
    }
    return null;
  },

  presentationTitle: (value) => {
    if (!value || !value.trim()) {
      return 'Presentation title is required';
    }
    if (value.trim().length < 2) {
      return 'Title must be at least 2 characters long';
    }
    if (value.trim().length > 100) {
      return 'Title must be no more than 100 characters long';
    }
    return null;
  },

  slideContent: (value) => {
    if (!value || !value.trim()) {
      return 'Slide content cannot be empty';
    }
    return null;
  }
};

// Validation runner
export const validateField = (value, validationRules) => {
  if (!validationRules || validationRules.length === 0) {
    return null;
  }

  for (const rule of validationRules) {
    const error = rule(value);
    if (error) {
      return error;
    }
  }

  return null;
};

// Validate multiple fields
export const validateForm = (values, validationSchema) => {
  const errors = {};
  let hasErrors = false;

  Object.keys(validationSchema).forEach(fieldName => {
    const fieldValue = values[fieldName];
    const fieldRules = validationSchema[fieldName];
    const error = validateField(fieldValue, fieldRules);
    
    if (error) {
      errors[fieldName] = error;
      hasErrors = true;
    }
  });

  return { errors, hasErrors };
};

// Custom hook for form validation
export const useFormValidation = (initialValues, validationSchema) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validateField = React.useCallback((fieldName, value) => {
    const fieldRules = validationSchema[fieldName];
    if (!fieldRules) return null;

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  }, [validationSchema]);

  const handleChange = React.useCallback((fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Validate field if it has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  }, [validateField, touched]);

  const handleBlur = React.useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const error = validateField(fieldName, values[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  }, [validateField, values]);

  const validateAll = React.useCallback(() => {
    const newErrors = {};
    let hasErrors = false;

    Object.keys(validationSchema).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationSchema).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));

    return !hasErrors;
  }, [validationSchema, validateField, values]);

  const reset = React.useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0
  };
};

// Network error handling
export const handleNetworkError = (error) => {
  if (!navigator.onLine) {
    return 'No internet connection. Please check your network and try again.';
  }

  if (error.code === 'NETWORK_ERROR') {
    return 'Network error occurred. Please try again.';
  }

  if (error.status === 404) {
    return 'The requested resource was not found.';
  }

  if (error.status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (error.status === 500) {
    return 'Server error occurred. Please try again later.';
  }

  if (error.status >= 400 && error.status < 500) {
    return error.message || 'Client error occurred. Please check your input and try again.';
  }

  if (error.status >= 500) {
    return 'Server error occurred. Please try again later.';
  }

  return error.message || 'An unexpected error occurred. Please try again.';
};

export default {
  validators,
  validateField,
  validateForm,
  useFormValidation,
  handleNetworkError
};