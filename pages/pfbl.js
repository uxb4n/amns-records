import Home from './index'

// This file is what makes amnsrecords.com/PF exist as a real URL for the
// Meta ads to point at. It renders the exact same homepage — same nav, same
// blurred background — and just tells it to pop the Perfect Balance modal open
// right away, instead of being a separate/empty page.
export default function PerfectBalanceLanding() {
  return <Home releaseSlug="pfbl" />
}