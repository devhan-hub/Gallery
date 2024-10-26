export const SignUpValidate = (firstName, lastName, email, password, conifPassword, setError) => {

    const isValidEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = () => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return passwordRegex.test(password);
    };

    if (!firstName || !lastName) {
        return ('first name and last name are required');
    }

    if (!email || !password) {
        return('email and password are required');
    }
    if(!isValidEmail()){
        return'please enter a valid email address';
   }
   if(!isValidPassword()){
    return('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character');
}
    if (password !== conifPassword) {
        
        return('Passwords do not match');
    }

    return;
}

export const SignInValidate = (email, password , setError) => {
    if (!email) {
        return('email  is required');
    }
    if (!password) {
        return('password is required');
    }

    return;
}



