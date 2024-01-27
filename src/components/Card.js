import React, { useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  perspective: 1000px;
`;

const Card = styled.div`
  width: 200px;
  height: 300px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${(props) => (props.isFlipped ? "rotateY(180deg)" : "none")};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #c0c0c0;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ReadMoreButton = styled.button`
  margin-top: 10px;
  padding: 8px;
  background-color: #007aff;
  color: #ffffff;
  cursor: pointer;
`;

const CardComponent = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleReadMoreClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContainer>
      <Card isFlipped={isFlipped}>
        <CardFront>
          <h2>Title</h2>
          <p>Short description</p>
          <ReadMoreButton onClick={handleReadMoreClick}>
            Read More
          </ReadMoreButton>
        </CardFront>
        <CardBack>
          <h2>More Details</h2>
          <p>Extended information goes here...</p>
          <ReadMoreButton onClick={handleReadMoreClick}>Go Back</ReadMoreButton>
        </CardBack>
      </Card>
    </CardContainer>
  );
};

export default CardComponent;
