import styled from '@emotion/styled'

export const Wrapper = styled.div`
  .project {
    .options {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    &:hover,
    &:focus,
    &:active {
      .options,
      .menu-options {
        opacity: 1;
      }
    }
  }
`
