import React from "react";

const onStopTyping = (callback: (p: any) => void, delay: number) => {
	  const [value, setValue] = React.useState("");

  React.useEffect(() => {
	const handler = setTimeout(() => callback(value), delay);

	return () => {
	  clearTimeout(handler);
	};
  }, [value]);

  return setValue;
}

export default onStopTyping;


