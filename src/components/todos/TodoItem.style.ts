import { styled } from 'styled-components';

export const List = styled.ul`
  padding: 10px;
  list-style-type: none;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

export const Item = styled.li`
  width: 100%;
`;
export const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 20px;
  text-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ButtonBox = styled.div`
  button {
    margin-left: 10px;
  }
`;
