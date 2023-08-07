import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

interface ContainerProps {
  backgroundColor: string;
}

interface TextProps {
  color: string;
  size: number;
}

export const ListItem = styled.TouchableOpacity<ContainerProps>`
  width: 90%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  margin: 0px 5% 20px 5%;
  padding: 10px;
  height: 120px;
`;

export const Text = styled.Text<TextProps>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size}px;
`;

export const ListContainer = styled.View`
  width: 100%;
  height: 20px;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerFilter = styled.View`
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ContainerSelect = styled.View`
  width: 45%;
  height: 55px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PickerContainer = styled(Picker)`
  width: 100%;
  height: 50px;
`;