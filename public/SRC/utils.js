// Utility functions for handling paths in different environments
export function getBasePath() {
  if (window.location.hostname === 'michael2001papis.github.io') {
    return '/Zura-1.5';
  }
  if (window.location.hostname.includes('vercel.app')) {
    return '';
  }
  return '';
}

export function getAssetPath(path) {
  const basePath = getBasePath();
  return `${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function navigateTo(path) {
  const basePath = getBasePath();
  const fullPath = `${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
  window.location.href = fullPath;
}


