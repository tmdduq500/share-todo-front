import { useMutation } from '@tanstack/react-query';
import { login, signup, changePassword } from '@/lib/api/auth';
import { LoginInput, SignupInput } from '@/lib/types/auth';

export const useLogin = () =>
    useMutation({
        mutationFn: (data: LoginInput) => login(data),
    });

export const useSignup = () =>
    useMutation({
        mutationFn: (data: SignupInput) => signup(data),
    });

export const usePasswordChange = () =>
    useMutation({
        mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
            changePassword(currentPassword, newPassword),
    });
