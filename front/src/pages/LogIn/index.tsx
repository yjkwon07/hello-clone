import React, { useMemo, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useSWR from 'swr';
import ConfirmModal from '@components/modals/ConfirmModal';
import { Form, Error, Label, Input, LinkContainer, Button, Header, ValidationWrapper } from '@pages/SignUp/styles';
import { login as loginAPI } from '@API/user';
import fetcher from '@utils/fetcher';
import { CHANNEL_URL } from '@utils/url';
import { INIT, USER_FETCH } from '@utils/swrConstants';

const LOGIN_SCHEMA = yup.object().shape({
  email: yup.string().email('올바르지 않은 이메일 양식입니다.').required('이메일은 필수 입력입니다.'),
  password: yup.string().required('비밀번호는 필수 입력입니다.'),
});

type FormData = yup.InferType<typeof LOGIN_SCHEMA>;

export default function LogIn() {
  const { data, mutate } = useSWR(USER_FETCH, fetcher);

  const [logInError, setLogInError] = useState(false);

  const { register, handleSubmit: checkSubmit, errors } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  const handleSubmit = useMemo(
    () =>
      checkSubmit(async (formData) => {
        setLogInError(false);
        try {
          const response = await loginAPI({ email: formData.email, password: formData.password });
          mutate(response.data, false);
        } catch (err) {
          setLogInError(err.response?.status === 401);
        }
      }),
    [checkSubmit, mutate],
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

        <Label id="password-label">
          <span>비밀번호</span>
          <ValidationWrapper>
            <Input type="password" id="password" name="password" ref={register} />
            {errors && <Error>{errors.password?.message}</Error>}
          </ValidationWrapper>
        </Label>

        <Button type="submit">로그인</Button>
      </Form>

      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>

      <ConfirmModal
        open={logInError}
        title="Error"
        description="이메일과 비밀번호 조합이 일치하지 않습니다."
        onConfirm={() => setLogInError(false)}
      />
    </div>
  );
}
