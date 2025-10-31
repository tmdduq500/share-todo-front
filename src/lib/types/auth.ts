export interface LoginInput {
    email: string;
    password: string;
}

export interface SignupInput extends LoginInput {
    confirmPassword?: string;
}