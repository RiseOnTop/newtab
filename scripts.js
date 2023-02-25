/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"L3MxD9gsXtJWFPAQ","label":"reddit","bookmarks":[{"id":"UDEDu980bNWADbg8","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"3U3hmwkoQaJV6Y8z","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"IqzOnTBYBTkmncOi","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"GURN6Xa7eMaNGGv1","label":"design tools","bookmarks":[{"id":"dDOuvBEokMjpLEmN","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"28NXOhz0P2C6qzOk","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"C3jHpdKSYFjpz4nE","label":"haikei","url":"https://app.haikei.app/"},{"id":"ccROSCYS4JL9MVsE","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"eU21lgZ35gCMTGVZ","label":"worth reading","bookmarks":[{"id":"TgFBJEw2XOAnoDx6","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"88OLFgEr8TUjXnp7","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"1RdK5FazvLlOAZvF","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"kPn00oD22Qgv8svw","label":"sources","bookmarks":[{"id":"o4sAnnp4Fp7lRXzK","label":"icons","url":"https://feathericons.com/"},{"id":"eR4Ocgm2VDsOYWm7","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"aY60wb7ynfMctrpu","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"3lHRnUcg3najOwo2","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
