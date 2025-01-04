import React from "react";

const SnippetPreview = ({ content }) => {
  const previewLines = 1; // Set the number of preview lines

  const previewContent = content.split("\n").slice(0, previewLines).join("\n");

  return (
    <div>
      {/* Display the first `previewLines` lines followed by "..." */}
      {previewContent}
      {content.split("\n").length > previewLines && "\n..."}
    </div>
  );
};

export default SnippetPreview;
