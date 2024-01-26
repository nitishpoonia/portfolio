import React from "react";
import {
  StyledProject,
  ProjectTitle,
  ProjectDesc,
  ProjectImg,
} from "./styles/Project.styled";

// Images

function Project(props) {
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
      </StyledProject>
    </div>
  );
}

export default Project;
