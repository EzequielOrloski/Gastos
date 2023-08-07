import styled from 'styled-components/native';

interface TextProps {
  color: string;
}

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const ListItem = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin: 8px 16px;
  border-radius: 2px;
  width: 90%;
  height: 60px;
`;

export const Text = styled.Text<TextProps>`
  flex: 1;
  margin: 8px 0 8px 16px;
  font-size: 20px;
  color: ${({color}) => color};
`;

export const ContainerIcon = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 100%;
`;