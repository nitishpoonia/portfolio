import React from "react";
import {
  StyledProject,
  ProjectTitle,
  ProjectDesc,
  ProjectImg,
  Button,
} from "./styles/Project.styled";
import styled from "styled-components";


// Images

function Project(props) {
  const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60%;
  `;
  return (
    <div>
      <StyledProject>
        <ProjectTitle>{props.name}</ProjectTitle>
        <ProjectImg src={props.image} />
        <ProjectDesc>
          <h3>About Project</h3>
          <p>{props.description}</p>
          <h3>Skills Learnt: </h3>
          <ul>
            {props.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </ProjectDesc>
        <ButtonContainer>
          <Button color={"#007aff"} hoverColor={"#0069d9"}>
            View Detail
          </Button>
          <Button color={"#238636"} hoverColor={"#2C9947"}>
            Github
          </Button>
        </ButtonContainer>
      </StyledProject>
    </div>
  );
}

export default Project;
