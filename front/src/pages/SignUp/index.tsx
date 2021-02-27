import React, { useState, useMemo } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useSWR from 'swr';
import ConfirmModal from '@components/modals/ConfirmModal';
import { Form, Error, Label, Input, ValidationWrapper, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import { signup as signupAPI } from '@API/user';
import fetcher from '@utils/fetcher';
import { CHANNEL_URL } from '@utils/url';
import { INIT, USER_FETCH } from '@utils/swrConstants';

const SIGNUP_SCHEMA = yup.object().shape({
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

export default function SignUp() {
  const { data } = useSWR(USER_FETCH, fetcher);

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

  if (data === INIT) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Redirect to={CHANNEL_URL} />;
  }

  return (
    <div id="container">
      <Header>urSleact</Header>
      <Form onSubmit={handleSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <ValidationWrapper>
            <Input id="email" name="email" ref={register} />
            {errors && <Error>{errors.email?.message}</Error>}
          </ValidationWrapper>
        </Label>

        <Label id="nickname-label">
          <span>닉네임</span>
          <ValidationWrapper>
            <Input type="text" id="nickname" name="nickname" ref={register} />
            {errors && <Error>{errors.nickname?.message}</Error>}
          </ValidationWrapper>
        </Label>

        <Label id="password-label">
          <span>비밀번호</span>
          <ValidationWrapper>
            <Input type="password" id="password" name="password" ref={register} />
            {errors && <Error>{errors.password?.message}</Error>}
          </ValidationWrapper>
        </Label>

        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <ValidationWrapper>
            <Input type="password" id="password-check" name="password-check" ref={register} />
            {errors && <Error>{errors['password-check']?.message}</Error>}
          </ValidationWrapper>
        </Label>

        <Button type="submit">회원가입</Button>
      </Form>

      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>

      <ConfirmModal
        open={signUpSuccess}
        title="Success"
        description="회원가입되었습니다! 로그인해주세요."
        onConfirm={() => setSignUpSuccess(false)}
      />
      <ConfirmModal open={!!signUpError} title="Error" description={signUpError} onConfirm={() => setSignUpError('')} />
    </div>
  );
}
