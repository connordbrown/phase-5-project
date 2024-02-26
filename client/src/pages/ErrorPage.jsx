import React from 'react';
import { useRouteError } from "react-router-dom";

// catch-all for invalid client-side routes
function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Whoops! Something went wrong!</h1>
    </div>
  )
}

export default ErrorPage;