"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Here you would log to Sentry:
    // Sentry.captureException(error)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-destructive/10 p-4 rounded-full mb-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-muted-foreground max-w-md mb-8">
            An unexpected error occurred. We&apos;ve been notified and are
            looking into it.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Reload page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
