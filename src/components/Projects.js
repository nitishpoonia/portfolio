import React from "react";
import { ProjectContainer, StyledHr, Container } from "./styles/Containers.styled";
import Project from "./Project";
import eggTimer from "./../assets/eggTimer.png";
import quizler from "./../assets/quizler.png";
import { eggTimerSkills, quizlerSkills } from "./ProjectSkills";
function Projects() {
  return (
    <Container>
      <h1>Projects</h1>
      <StyledHr />
      <ProjectContainer>
        <Project
          name="Egg Timer"
          image={eggTimer}
          description="Beautiful egg timer app to boil your eggs to perfection depending on
            how you prefer your eggs."
          skills={eggTimerSkills}
        />
        <Project
          name="Quizler"
          image={quizler}
          description="A quiz app to test your general knowledge."
          skills={quizlerSkills}
        />
      </ProjectContainer>
    </Container>
  );
}

export default Projects;
