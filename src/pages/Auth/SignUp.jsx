import React, { useState } from 'react';
import {
    Button,
    Container,
    Grid,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
    useSendEmailAuth,
    useSendVerificationEmail,
    useSignupUser,
} from '@hooks/useSignUp';
import SignupSuccess from '@components/alert/SignupSuccess.jsx';
import Loading from '@components/loading/Loading.jsx';

const steps = ['이메일 인증', '계정 정보 입력'];

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const [activeStep, setActiveStep] = useState(0);
    const [authNo, setAuthNo] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지를 저장

    const email = watch('email');

    const {
        mutate: sendVerificationEmail,
        isLoading: isSendingEmail,
        isError: isSendEmailError,
    } = useSendVerificationEmail(() => {
        setIsEmailSent(true);
        setLoading(false);
    });

    const {
        mutate: sendEmailAuth,
        isLoading: isEmailAuth,
        isError: isAuthError,
    } = useSendEmailAuth(() => {
        setIsVerified(true);
        setActiveStep(1);
        setLoading(false);
    });

    const {
        mutate: signupUser,
        isLoading: isSigningUp,
        isError: isSignError,
    } = useSignupUser(() => {
        setIsSignupSuccess(true);
        setLoading(false);
    });

    const onSubmit = (data) => {
        setLoading(true);
        if (activeStep === 0) {
            sendVerificationEmail(data, {
                onError: (error) => {
                    setLoading(false);
                    setErrorMessage(error.response.data.message);
                },
            });
        } else {
            signupUser(
                { email, ...data },
                {
                    onError: (error) => {
                        setLoading(false);
                        setErrorMessage(error.response.data.message);
                    },
                },
            );
            setUsername(data.username);
            setIsSignupSuccess(true);
        }
    };

    const verifyEmail = () => {
        setLoading(true);
        sendEmailAuth(
            { email, authNo },
            {
                onError: (error) => {
                    setLoading(false);
                    setErrorMessage(error.response.data.message);
                },
            },
        );
    };

    if (isSignupSuccess) {
        return <SignupSuccess username={username} />;
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            {loading && <Loading />}
            <Typography variant="h4" gutterBottom>
                회원가입
            </Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {errorMessage && (
                <Typography variant="body1" color="error">
                    오류: {errorMessage}
                </Typography>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {activeStep === 0 && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="이메일"
                                    {...register('email', {
                                        required: '이메일은 필수입니다.',
                                        pattern: {
                                            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                            message:
                                                '유효한 이메일 주소가 아닙니다.',
                                        },
                                    })}
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={
                                        errors.email ? errors.email.message : ''
                                    }
                                />
                                <input
                                    type="hidden"
                                    value="gunho.dev"
                                    {...register('csrf')}
                                />
                            </Grid>
                            {isEmailSent && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="인증번호"
                                            value={authNo}
                                            onChange={(e) =>
                                                setAuthNo(e.target.value)
                                            }
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        {!errorMessage && (
                                            <Typography
                                                variant="body1"
                                                sx={{ color: 'green' }}
                                            >
                                                작성하신 이메일에 인증번호를
                                                확인하여 입력해주세요.
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            onClick={verifyEmail}
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth
                                        >
                                            인증 확인
                                        </Button>
                                    </Grid>
                                </>
                            )}
                        </>
                    )}
                    {activeStep === 1 && isVerified && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="아이디"
                                    {...register('username', {
                                        required: '아이디는 필수입니다.',
                                    })}
                                    variant="outlined"
                                    error={!!errors.username}
                                    helperText={
                                        errors.username
                                            ? errors.username.message
                                            : ''
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="패스워드"
                                    type="password"
                                    {...register('password', {
                                        required: '패스워드는 필수입니다.',
                                        pattern: {
                                            value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
                                            message:
                                                '8~16자 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.',
                                        },
                                    })}
                                    variant="outlined"
                                    error={!!errors.password}
                                    helperText={
                                        errors.password
                                            ? errors.password.message
                                            : ''
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="패스워드 확인"
                                    type="password"
                                    {...register('confirmPassword', {
                                        required: '패스워드 확인은 필수입니다.',
                                        validate: (value) =>
                                            value === watch('password') ||
                                            '패스워드가 일치하지 않습니다.',
                                    })}
                                    variant="outlined"
                                    error={!!errors.confirmPassword}
                                    helperText={
                                        errors.confirmPassword
                                            ? errors.confirmPassword.message
                                            : ''
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="닉네임"
                                    {...register('nick', {
                                        required: '닉네임은 필수입니다.',
                                    })}
                                    variant="outlined"
                                    error={!!errors.nick}
                                    helperText={
                                        errors.nick ? errors.nick.message : ''
                                    }
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            {activeStep === 0 ? '인증 요청' : '회원가입'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default SignUp;
