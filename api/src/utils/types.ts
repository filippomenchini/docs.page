export type SidebarItem = [string, Array<[string, string]>] | [string, string];

export interface ConfigWithoutLocales {
  // Project name.
  name: string;
  // URL to project logo.
  logo: string;
  // URL to project logo for dark mode
  logoDark: string;
  // URL to the favicon
  favicon: string;
  // Image to display as the social preview on shared URLs
  socialPreview: string;
  // Twitter tag for use in the header.
  twitter: string;
  // Whether the website should be indexable by search bots.
  noindex: boolean;
  // A color theme used for this project. Defaults to "#00bcd4".
  theme: string;
  // Docsearch Application ID. If populated, a search box with autocomplete will be rendered.
  docsearch?: {
    appId?: string;
    apiKey: string;
    indexName: string;
  };
  // Sidebar
  sidebar: SidebarItem[];
  // The depth to heading tags are linked. Set to 0 to remove any linking.
  headerDepth: number;
  // Variables which can be injected into the pages content.
  variables: Record<string, string>;
  // Adds Google Tag Manager to your documentation pages.
  googleTagManager: string;
  // Whether zoomable images are enabled by default
  zoomImages: boolean;
  // Whether CodeHike is enabled
  experimentalCodehike: boolean;
  // Whether Math is enabled
  experimentalMath: boolean;
}

export interface ConfigWithLocales {
  // Project name.
  name: string;
  // URL to project logo.
  logo: string;
  // URL to project logo for dark mode
  logoDark: string;
  // URL to the favicon
  favicon: string;
  // Image to display as the social preview on shared URLs
  socialPreview: string;
  // Twitter tag for use in the header.
  twitter: string;
  // Whether the website should be indexable by search bots.
  noindex: boolean;
  // A color theme used for this project. Defaults to "#00bcd4".
  theme: string;
  // Docsearch Application ID. If populated, a search box with autocomplete will be rendered.
  docsearch?: {
    appId?: string;
    apiKey: string;
    indexName: string;
  };
  // Sidebar
  sidebar: Record<string, SidebarItem[]>;
  // locales
  locales: Record<string, string>;
  // The depth to heading tags are linked. Set to 0 to remove any linking.
  headerDepth: number;
  // Variables which can be injected into the pages content.
  variables: Record<string, string>;
  // Adds Google Tag Manager to your documentation pages.
  googleTagManager: string;
  // Whether zoomable images are enabled by default
  zoomImages: boolean;
  // Whether CodeHike is enabled
  experimentalCodehike: boolean;
  // Whether Math is enabled
  experimentalMath: boolean;
}
export type InputConfig = ConfigWithoutLocales | ConfigWithLocales;

// Utility to check whether locales are specified
export function hasLocales(config: InputConfig): config is ConfigWithLocales {
  return config.hasOwnProperty('locales');
}

export interface OutputConfig {
  // Project name.
  name: string;
  // URL to project logo.
  logo: string;
  // URL to project logo for dark mode
  logoDark: string;
  // URL to the favicon
  favicon: string;
  // Image to display as the social preview on shared URLs
  socialPreview: string;
  // Twitter tag for use in the header.
  twitter: string;
  // Whether the website should be indexable by search bots.
  noindex: boolean;
  // A color theme used for this project. Defaults to "#00bcd4".
  theme: string;
  // Docsearch Application ID. If populated, a search box with autocomplete will be rendered.
  docsearch?: {
    appId?: string;
    apiKey: string;
    indexName: string;
  };
  // Header navigation
  // navigation: NavigationItem[];
  // Sidebar
  sidebar: SidebarItem[];
  // Locales:
  locales?: Record<string, string>;
  // The depth to heading tags are linked. Set to 0 to remove any linking.
  headerDepth: number;
  // Variables which can be injected into the pages content.
  variables: Record<string, string>;
  // Adds Google Tag Manager to your documentation pages.
  googleTagManager: string;
  // Whether zoomable images are enabled by default
  zoomImages: boolean;
  // Whether CodeHike is enabled
  experimentalCodehike: boolean;
  // Whether Math is enabled
  experimentalMath: boolean;
}

export const defaultConfig: OutputConfig = {
  name: '',
  logo: '',
  logoDark: '',
  favicon: '',
  socialPreview: '',
  twitter: '',
  noindex: false,
  theme: '#00bcd4',
  // navigation: [],
  sidebar: [],
  headerDepth: 3,
  variables: {},
  googleTagManager: '',
  zoomImages: false,
  experimentalCodehike: false,
  experimentalMath: false,
};
