export const paths = {};

export const CONSTANTS = {
  GRAPHQL_URL:
    import.meta.env?.VITE_GRAPHQL_URL ||
    'http://develop.backend.atlas-oportunidades.nuvem.ufrgs.br/graphql',
  ATLAS_COOKIE_USER: 'atlas_user',
  UI_AVATAR_API: 'https://ui-avatars.com/api/',
  MAPBOX_KEY: import.meta.env?.VITE_MAPBOX_KEY,
  MAPBOX_STYLE: import.meta.env?.VITE_MAPBOX_STYLE,
};
