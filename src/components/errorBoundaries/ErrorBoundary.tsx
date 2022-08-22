import React, { Component, ReactNode, ErrorInfo } from 'react'

interface IProps {
  children: ReactNode
}

interface IState {
  hasError: boolean
}

class ErrorBoundary extends Component<IProps, IState> {
  state: IState = {
    hasError: false,
  }

  static getDerivedStateFromError(): IState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <div role="alert">Sorry.. there was an error</div>
    }

    return this.props.children
  }
}

export default ErrorBoundary
