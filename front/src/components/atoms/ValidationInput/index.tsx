import React, { FC, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import Input from '../Input';

const ValidationWrapper = styled.div`
  position: relative;
  margin: 0 0 40px;
`;

const Error = styled.div`
  position: absolute;
  top: 42px;
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`;

const Success = styled.div`
  color: #2eb67d;
  font-weight: bold;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: () => void;
}

interface Props {
  errMessage?: string;
  successMessage?: string;
  inputProps: InputProps;
}

const ValidationInput: FC<Props> = ({ errMessage, successMessage, inputProps }) => {
  return (
    <ValidationWrapper>
      <Input {...inputProps} />
      {errMessage && <Error>{errMessage}</Error>}
      {successMessage && <Success>{successMessage}</Success>}
    </ValidationWrapper>
  );
};

export default ValidationInput;
