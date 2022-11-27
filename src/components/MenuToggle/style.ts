import styled from "styled-components";

const MenuToggleWrapper = styled.div`
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`
const Dot = styled.span`
  flex: 0 0 auto;
  width: 5px;
  height: 5px;
  gap: 7px;
  background-color: ${props => props.theme.colors.systemText};
  border-radius: 50%;
`

export {
	MenuToggleWrapper,
	Dot
}
