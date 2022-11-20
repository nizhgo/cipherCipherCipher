import React from "react";

const useCopyToClipboard = () => {
	  const [copied, setCopied] = React.useState(false);
  const copyToClipboard = React.useCallback((text: string) => {
	navigator.clipboard.writeText(text);
	setCopied(true);
  }, []);
  return { copied, copyToClipboard };
}

export default useCopyToClipboard;
