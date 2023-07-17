import styled from '@emotion/styled'

export const Wrapper = styled.div`
  .header {
    .options {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    &:hover {
      .options {
        opacity: 1;
      }
    }
  }
`
