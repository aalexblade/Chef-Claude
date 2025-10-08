import React from "react";

interface ErrorMessagesProps {
  error: string | null;
  duplicateError: string | null;
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({ error, duplicateError }) => (
  <>
    {error && <div className="error-message">❌ {error}</div>}
    {duplicateError && <div className="error-message warning">⚠️ {duplicateError}</div>}
  </>
);

export default ErrorMessages;
