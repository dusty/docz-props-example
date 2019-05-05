import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoading = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 1s linear infinite;
  margin: 10px auto;
`

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  overflow: hidden;
`

export const UiLoading = () => (
  <Wrapper>
    <StyledLoading />
  </Wrapper>
)
