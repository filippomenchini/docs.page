import get from 'lodash.get';
import Color from 'color';
import type { Context } from './context';

const VARIABLE_REGEX = /{{\s([a-zA-Z0-9_.]*)\s}}/gm;

// Returns a string with a leading slash
export function ensureLeadingSlash(path: string) {
  return !path.startsWith('/') ? `/${path}` : path;
}

// Removes any trailing slash from string
export function removeTrailingSlash(value: string) {
  return value.replace(/\/$/, '');
}

export function isExternalLink(href: string) {
  return href.startsWith('http');
}

export function isHashLink(href: string): boolean {
  return href.startsWith('#');
}

// Replaces an object of variables with their moustache values in a string
export function replaceMoustacheVariables(variables: Record<string, string>, value: string) {
  let output = value;
  let m: RegExpExecArray | null;

  while ((m = VARIABLE_REGEX.exec(value)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === VARIABLE_REGEX.lastIndex) {
      VARIABLE_REGEX.lastIndex++;
    }
    output = output.replace(m[0], get(variables, m[1], m[0]));
  }

  return output;
}

// Returns the correct image path for a given image;
//  - if remote, returns the path as is
//  - if local, returns the path with the correct base url
export function getImagePath(source: Context['source'], baseBranch: string, src: string) {
  if (src.startsWith('http')) {
    return src;
  }

  return getBlobPath(source, baseBranch, src);
}

// Returns a raw blob path for a given path.
export function getBlobPath(source: Context['source'], baseBranch: string, src: string) {
  const { owner, repository, ref } = source;

  if (source.type === 'branch') {
    return `https://raw.githubusercontent.com/${owner}/${repository}/${encodeURIComponent(
      ref ?? baseBranch,
    )}/docs${ensureLeadingSlash(src)}`;
  }
  if (source.type === 'PR') {
    return `https://raw.githubusercontent.com/${owner}/${repository}/${encodeURIComponent(
      ref ?? baseBranch,
    )}/docs${ensureLeadingSlash(src)}`;
  }

  return `https://raw.githubusercontent.com/${owner}/${repository}/main/docs${ensureLeadingSlash(
    src,
  )}`;
}

export function getColorTheme(value: string | undefined) {
  const fallback = '#00bcd4';
  let color: Color;
  try {
    color = Color(value || fallback);
  } catch {
    color = Color('#00bcd4');
  }

  const base = color.hex().toString();
  const light = color.lighten(0.2).hex().toString();
  const dark = color.darken(0.2).hex().toString();

  return {
    base,
    light,
    dark,
  };
}
