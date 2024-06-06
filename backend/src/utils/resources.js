const mergeResources = (resources, change) => {
  return {
    army: resources.army + change.army,
    provision: resources.provision + change.provision,
    tools: resources.tools + change.tools,
    mysteryCurrency: resources.mysteryCurrency + change.mysteryCurrency,
  }
}

module.exports = {
  mergeResources
}
