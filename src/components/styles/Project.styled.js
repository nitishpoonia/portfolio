import styled from "styled-components";
export const StyledProject = styled.div`
  margin: 3rem 0;
  width: 500px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
`;
export const ProjectTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const ProjectDesc = styled.div`
  ul {
    padding: 0 1.5rem;
  }
`;
export const ProjectImg = styled.img`
  width: 300px;
  height: 550px;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: ${(props) => props.color};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  font-size: 1rem;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;
