"use client"

import type { NextPageContext } from "next"

interface ErrorProps {
  statusCode: number
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">
        {statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}
      </h1>
      <p className="text-muted-foreground mb-8">We apologize for the inconvenience. Please try again later.</p>
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
      >
        Go back home
      </button>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
