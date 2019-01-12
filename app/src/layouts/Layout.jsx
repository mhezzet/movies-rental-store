import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, history, location, match }) {
  return (
    <div>
      <Header history={history} match={match} location={location} />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
