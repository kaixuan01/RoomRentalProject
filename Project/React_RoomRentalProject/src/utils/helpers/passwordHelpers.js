export const isStrongPassword = (password) => {
    // Password must be at least 8 characters long
    const minLength = /.{8,}/;
    // At least one uppercase letter
    const hasUpperCase = /[A-Z]/;
    // At least one lowercase letter
    const hasLowerCase = /[a-z]/;
    // At least one digit
    const hasDigit = /[0-9]/;
    // At least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  
    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasDigit.test(password) &&
      hasSpecialChar.test(password)
    );
};