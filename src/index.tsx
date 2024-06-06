import './index.css'

import { lazy } from 'solid-js'
import { render } from 'solid-js/web'
import { Router, Route, Navigate } from '@solidjs/router'

import App from './App'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

const Home = lazy(() => import('./pages/Home'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Work = lazy(() => import('./pages/Work'))
const About = lazy(() => import('./pages/About'))
const Cart = lazy(() => import('./pages/Cart'))
const ThankYou = lazy(() => import('./pages/ThankYou'))


render(
  () => (
    <Router root={App}>
      <Route path='/' component={Home} />
      <Route path='/gallery' component={Gallery} />
      <Route path='/gallery/:work' component={Work} />
      <Route path='/about' component={About} />
      <Route path='/cart/:cartItems' component={Cart} />
      <Route path='/thank-you' component={ThankYou} />
    </Router>
  ),
  root!,
)
