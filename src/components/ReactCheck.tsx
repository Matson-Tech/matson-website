import React from "react";

interface ReactCheckProps {
  children?: React.ReactNode;
}

const ReactCheck = React.forwardRef<HTMLDivElement, ReactCheckProps>(
  ({ children, ...props }, ref) => {
    React.useEffect(() => {
      console.log("React is working correctly!");
      console.log("React version:", React.version);
      console.log("forwardRef available:", typeof React.forwardRef);
      console.log("useState available:", typeof React.useState);
      console.log("useEffect available:", typeof React.useEffect);
    }, []);

    return (
      <div ref={ref} {...props}>
        <h3>React Status Check</h3>
        <p>React Version: {React.version || "Unknown"}</p>
        <p>forwardRef: {React.forwardRef ? "✅ Available" : "❌ Missing"}</p>
        <p>useState: {React.useState ? "✅ Available" : "❌ Missing"}</p>
        <p>useEffect: {React.useEffect ? "✅ Available" : "❌ Missing"}</p>
        {children}
      </div>
    );
  }
);

ReactCheck.displayName = "ReactCheck";

export default ReactCheck;
