import React, { Component, ComponentType } from 'react'
import { appApi } from 'app-data'
import { RouteComponentProps } from 'react-router-dom'
import ContentLoader from '../components/UI/loaders/ContentLoader/ContentLoader'

function withPageData<P>(InnerComponent: ComponentType<P & RouteComponentProps>) {
  // TODO remove this
  // eslint-disable-next-line react/display-name
  return class extends Component<RouteComponentProps, { data: null | P }> {
    constructor(props: RouteComponentProps) {
      super(props)
      this.state = {
        data: null,
      }
      this.loadData = this.loadData.bind(this)
    }

    componentDidMount() {
      this.loadData()
    }

    componentDidUpdate(prevProps: RouteComponentProps) {
      const { location } = this.props
      if (prevProps.location.pathname !== location.pathname) {
        this.setState({ data: null })
        this.loadData()
      }
    }

    loadData() {
      appApi.fetchPageData(window.location.pathname).then(({ data }) => {
        this.setState({ data })
      })
    }

    render() {
      const { data } = this.state
      return data ? (
        <InnerComponent {...this.props} {...data} />
      ) : (
        <ContentLoader />
      )
    }
  }
}

export default withPageData
