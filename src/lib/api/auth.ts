import axiosInstance from '@/lib/axios/axios';
import {LoginInput, SignupInput} from '@/lib/types/auth';

export const login = async (data: LoginInput) => {
    const res = await axiosInstance.post('/api/auth/login', data);
    return res.data.data;
};

export const signup = async (data: SignupInput) => {
    const res = await axiosInstance.post('/api/accounts/signup', data);
    return res.data.data;
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
    const res = await axiosInstance.post('/api/accounts/password/change', {
        currentPassword,
        newPassword,
    });
    return res.data;
};
