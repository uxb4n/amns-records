import Home from './index'

// Makes akanico.com/noml a real URL for the presave link.
// Renders the homepage and pops the Not On My Level modal open immediately.
export default function NomlLanding() {
  return <Home releaseSlug="noml" />
}