import React, { useState, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { signup as signupAPI, useUser } from '@API/user';
import { Button, ValidationInput, Label, Form } from '@components/atoms';
import ConfirmModal from '@components/modals/ConfirmModal';
import { LinkContainer, Header } from '@pages/SignUp/styles';
import { GET_CHANNEL_URL, LOGIN_URL } from '@utils/url';

const SIGNUP_SCHEMA = yup.object({
  email: yup.string().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  nickname: yup.string().required('닉네임은 필수 입력입니다.'),
  password: yup
    .string()
    .required('비밀번호는 필수 입력입니다.')
    .matches(/[a-zA-Z]/gi, { message: '영문,숫자를 혼합하여 입력해야 합니다.' })
    .matches(/[0-9]/g, { message: '영문,숫자를 혼합하여 입력해야 합니다.' }),
  'password-check': yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력입니다.'),
});

type FormData = yup.InferType<typeof SIGNUP_SCHEMA>;

const SignUp = () => {
  const { data: userData, error } = useUser();

  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const { register, handleSubmit: checkSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(SIGNUP_SCHEMA),
  });

  const handleSubmit = useMemo(
    () =>
      checkSubmit(async (formData) => {
        setSignUpError('');
        setSignUpSuccess(false);
        try {
          await signupAPI({ email: formData.email, nickname: formData.nickname, password: formData.password });
          setSignUpSuccess(true);
        } catch (err) {
          setSignUpError(err.response?.data);
        }
      }),
    [checkSubmit],
  );

  if (!error && userData) {
    return <Redirect to={GET_CHANNEL_URL('sleact', '일반')} />;
  }

  return (
    <div id="container">
      <Header>urSleact</Header>
      <Form onSubmit={handleSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <ValidationInput
            inputProps={{ type: 'text', id: 'email', name: 'email', ref: register }}
            errMessage={errors.email?.message}
          />
        </Label>

        <Label id="nickname-label">
          <span>닉네임</span>
          <ValidationInput
            inputProps={{ type: 'text', id: 'nickname', name: 'nickname', ref: register }}
            errMessage={errors.nickname?.message}
          />
        </Label>

        <Label id="password-label">
          <span>비밀번호</span>
          <ValidationInput
            inputProps={{ type: 'password', id: 'password', name: 'password', ref: register }}
            errMessage={errors.password?.message}
          />
        </Label>

        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <ValidationInput
            inputProps={{ type: 'password', id: 'password-check', name: 'password-check', ref: register }}
            errMessage={errors['password-check']?.message}
          />
        </Label>

        <Button type="submit">회원가입</Button>
      </Form>

      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to={LOGIN_URL}>로그인 하러가기</Link>
      </LinkContainer>

      <ConfirmModal
        show={signUpSuccess}
        title="Success"
        description="회원가입되었습니다! 로그인해주세요."
        onCloseModal={() => setSignUpSuccess(false)}
      />
      <ConfirmModal
        show={!!signUpError}
        title="Error"
        description={signUpError}
        onCloseModal={() => setSignUpError('')}
      />
    </div>
  );
};

export default SignUp;
