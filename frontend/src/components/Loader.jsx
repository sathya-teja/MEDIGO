import React from "react";
import styled from "styled-components";

const Loader = () => (
  <Wrapper>
    <section>
      <div className="container">
        <div className="content">
          <div className="heart-rate">
            <svg
              viewBox="0 0 150 73"
              width="150"
              height="73"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline
                points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,
                        63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                stroke="#1c1577"
                strokeWidth="3"
                fill="none"
                strokeMiterlimit="10"
              />
            </svg>
            <div className="fade-in" />
            <div className="fade-out" />
          </div>
        </div>
      </div>
    </section>
  </Wrapper>
);

export default Loader;

/* ---------------- styled‑components CSS ---------------- */
const Wrapper = styled.div`
  .container {
    background: #ffff;
    font-family: sans-serif;
  }

  .heart-rate {
    width: 150px;
    height: 73px;
    position: relative;
    margin: 20px auto;
  }

  .fade-in,
  .fade-out {
    position: absolute;
    height: 100%;
    top: 0;
    background: #ffff;
    animation: 2.5s linear infinite;
  }

  .fade-in {
    width: 100%;
    right: 0;
    animation-name: heartRateIn;
  }

  .fade-out {
    width: 120%;
    right: -120%;
    animation-name: heartRateOut;
  }

  @keyframes heartRateIn {
    0%   { width: 100%; }
    50%  { width:   0%; }
    100% { width:   0%; }
  }

  @keyframes heartRateOut {
    0%,30% { left: -120%; }
    100%   { left: 0; }
  }
`;
