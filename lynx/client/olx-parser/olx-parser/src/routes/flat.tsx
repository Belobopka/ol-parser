import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/flat')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/flat"!</div>
}
