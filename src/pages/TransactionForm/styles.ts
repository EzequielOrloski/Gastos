import styled from "styled-components/native";

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;
  background-color: ${({backgroundColor}) => backgroundColor};
`;