import { Picker } from "@react-native-picker/picker";
import styled, { css } from "styled-components/native";

interface Props {
  backgroundColor: string;
  error: boolean;
}

export const Container = styled.View<Props>`
  width: 90%;
  height: 55px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  ${props =>
    props.error &&
    css`
      border-bottom-color: red;
      border-bottom-width: 1px;
    `};
`;

export const PickerContainer = styled(Picker)`
  width: 100%;
  height: 50px;
`;