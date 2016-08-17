export default class Node {
  constructor(hierarchy) {
    this.id = hierarchy.split('\\').length
    const [path, parent, name, ...rest] = hierarchy.match(/(.+\\)*([^\\]+)$/)
    this.path = path
    this.parent = parent || ''
    this.name = name
  }
}
