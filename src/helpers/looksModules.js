function showMessage(params = {}) {
  return params;
}

function spriteVisibility(params = {}) {
  return { show: params.show };
}

const looksModules = { showMessage, spriteVisibility };

export default looksModules;
