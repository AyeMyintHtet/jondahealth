import styled from "styled-components";

export const StyledTextCom = styled.div`
color: ${props => props?.color ?? 'white'};
font-family: ${props => props?.fontfamily};
text-align: ${props => props?.align};

`