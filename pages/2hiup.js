import Home from './index'

// This file is what makes amnsrecords.com/2hiup exist as a real URL for the
// Meta ads to point at. It renders the exact same homepage — same nav, same
// blurred background — and just tells it to pop the 2hiup modal open right
// away, instead of being a separate/empty page.
export default function TwoHiupLanding() {
  return <Home releaseSlug="2hiup" />
}