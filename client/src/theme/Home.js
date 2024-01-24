import styled from 'styled-components'

export const StyledHome = styled.div`

.record-box{
  background: rgb(63,94,251);
  background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(70,188,252,1) 42%, rgba(69,93,252,1) 86%);
  width: clamp(200px, 40%, 300px);
  padding: 10px;
  border-radius: 10px;
  position: relative;
  transition: all 0.9s linear;
  .opacity-layer{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      opacity: 0;
      border-radius: 7px;
      transition: all 0.3s linear;
    }
  .d-custom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.for-button{
    justify-content: center;
    gap: 16px;
    height: 100%;
  }
    }
    &:hover{
    .opacity-layer{
      opacity: 1;
      background: #808080d6;
    }
  }
}
  .button-style{
    border: 1px solid black;
    border-radius:10px;
    transition: all 0.3s linear;
    padding:8px;
    cursor: pointer;
    &:hover{
      background: black;
      border: 1px solid white;
    }
  }
  .create-button{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    border: 1px solid black;
    transition: all 0.3s ease;
    width: fit-content;
    padding: 7px;
    border-radius: 10px;
    &:hover{
    border: 1px solid white;
      background-color: whitesmoke;
    }
  }
  .custom-button{
    cursor: pointer;
    border: 1px solid black;
    padding: 10px 5px;
  }
`