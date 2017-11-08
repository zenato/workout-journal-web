import { matchPath } from 'react-router'

export async function getComponents(routes, pathname) {
  const matches = []
  const components = []

  for (const name in routes) {
    const route = routes[name]

    const match = matchPath(pathname, route)
    if (!match) continue

    matches.push(match)

    if (route.component.getComponent) {
      components.push(route.component.getComponent())
    } else {
      components.push(route.component)
    }
  }

  return await Promise.all(components).then(r =>
    r.map((c, i) => ({ component: c, match: matches[i] })),
  )
}

export async function preload(components, state, dispatch, query) {
  const preloads = components
    .filter(({ component }) => component.preload)
    .map(({ component, match: { params } }) =>
      component.preload({ dispatch, state, query, params }),
    )
  return await Promise.all(preloads)
}

export const hasChangedLocation = (prev, next) =>
  prev.pathname !== next.pathname || prev.search !== next.search
