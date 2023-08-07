import styled from "styled-components/native";

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
  padding: 20px;
`;

interface TextProps {
  color: string;
  size: number;
}

export const ListItem = styled.TouchableOpacity<ContainerProps>`
  align-items: center;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  margin-bottom: 20px;
  flex-direction: row;
  height: 60px;
  justify-content: space-between;
  padding: 10px;
`;

export const Text = styled.Text<TextProps>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size}px;
`;

export const ListContainer = styled.View`
  width: 40%;
  height: 100%;
`;