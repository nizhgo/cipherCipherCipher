import React from "react";
import styled from "styled-components";

interface MenuToggleProps {
	onClick: (p: any) => void;
}

const MenuToggle = () => {
	return (
		<MenuToggleWrapper>
			<Dot/>
			<Dot/>
			<Dot/>
		</MenuToggleWrapper>
	)
}

export default MenuToggle

const MenuToggleWrapper = styled.div`
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`
const Dot = styled.span`
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  gap: 7px;
  background-color: currentColor;
  border-radius: 50%;
`