import { Post } from '@utils/axiosUtil.js';

// 메일 인증 요청
export const postEmailVerification = async (email, csrf) => {
    return await Post('/auth/email', { email, csrf });
};

// 이메일 인증
export const postEmailAuth = async (email, authNo) => {
    return await Post('/auth/email/verify', { email, authNo });
};

// 회원 가입
export const postSignup = async (form) => {
    return await Post('/auth/sign-up', { ...form });
};
