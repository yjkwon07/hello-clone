import React, { useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { requestLogin, useUser } from '@API/user';
import { Button, Label, ValidationInput, Form } from '@components/atoms';
import ConfirmModal from '@components/modals/ConfirmModal';
import { LinkContainer, Header } from '@pages/SignUp/styles';
import { GET_CHANNEL_URL, SIGNUP_URL } from '@utils/url';

const LOGIN_SCHEMA = yup.object({
  email: yup.string().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  password: yup.string().required('비밀번호는 필수 입력입니다.'),
});

type FormData = yup.InferType<typeof LOGIN_SCHEMA>;

const LogIn = () => {
  const { data: userData, error, mutate } = useUser();
  const { register, handleSubmit: checkSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  const [logInError, setLogInError] = useState(false);

  const handleSubmit = useMemo(() => {
    return checkSubmit(async (formData) => {
      setLogInError(false);
      try {
        const response = await requestLogin({ email: formData.email, password: formData.password });
        await mutate(response.data, false);
      } catch (err) {
        setLogInError(err.response?.status === 401);
      }
    });
  }, [checkSubmit, mutate]);

  if (!error && userData) {
    return <Redirect to={GET_CHANNEL_URL('sleact', '일반')} />;
  }

  return (
    <div id="container">
      <Header>urTalk</Header>
      <Form onSubmit={handleSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <ValidationInput
            inputProps={{ type: 'text', id: 'email', name: 'email', ref: register }}
            errMessage={errors.password?.message}
          />
        </Label>

        <Label id="password-label">
          <span>비밀번호</span>
          <ValidationInput
            inputProps={{ type: 'password', id: 'password', name: 'password', ref: register }}
            errMessage={errors.password?.message}
          />
        </Label>

        <Button type="submit">로그인</Button>
      </Form>

      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to={SIGNUP_URL}>회원가입 하러가기</Link>
      </LinkContainer>

      <ConfirmModal
        show={logInError}
        title="Error"
        description="이메일과 비밀번호 조합이 일치하지 않습니다."
        onCloseModal={() => setLogInError(false)}
      />
    </div>
  );
};

export default LogIn;
