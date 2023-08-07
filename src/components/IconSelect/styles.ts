import styled from "styled-components/native";

interface ContainerProps {
  backgroundColor: string;
}

export const ListItem = styled.TouchableOpacity<ContainerProps>`
  width: 23%;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin: 3px;
`;