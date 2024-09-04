// src/hooks/useSignUp.js
import { useMutation } from '@tanstack/react-query';
import { postEmailAuth, postEmailVerification, postSignup } from '@api/sign.js';

// 이메일 인증 요청 훅
export const useSendVerificationEmail = (onSuccessCallback) => {
    return useMutation({
        mutationFn: ({ email, csrf }) => postEmailVerification(email, csrf),
        onSuccess: () => {
            if (onSuccessCallback) {
                onSuccessCallback(); // 성공 시 추가적인 콜백 함수 호출
            }
        },
        onError: (error) => {
            console.error('이메일 전송 오류:', error.data.message);
        },
    });
};

// 이메일 인증 훅
export const useSendEmailAuth = (onSuccessCallback) => {
    return useMutation({
        mutationFn: ({ email, authNo }) => postEmailAuth(email, authNo),
        onSuccess: () => {
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: (error) => {
            console.error('이메일 인증 오류:', error);
        },
    });
};

// 회원가입 요청 훅
export const useSignupUser = (onSuccessCallback) => {
    return useMutation({
        mutationFn: (data) => postSignup(data),
        onError: (error) => {
            console.error('회원가입 오류:', error);
        },
    });
};
