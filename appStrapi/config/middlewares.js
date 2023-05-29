const { merge } = require('lodash');

const DEFAULT_DIRECTIVES = {
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "font-src": ["'self'", "https:", "data:"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'self'"],
  "img-src": ["'self'", "data:"],
  "object-src": ["'none'"],
  "script-src": ["'self'"],
  "script-src-attr": ["'none'"],
  "style-src": ["'self'", "https:", "'unsafe-inline'"],
  // La directive "upgrade-insecure-requests" est déjà incluse par défaut
};

const customDirectives = {
  "connect-src": ["'self'", "http://localhost:*", "https://*"],
  // Ajoutez vos autres directives personnalisées ici
};

const mergedDirectives = merge({}, DEFAULT_DIRECTIVES, customDirectives);

module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: mergedDirectives,
      },
    },
  },
{
  name: 'strapi::cors',
  config: {
    origin: ['*'],
    headers: [
      'Content-Type',
      'Authorization',
      'X-Frame-Options',
      'Origin',
      'X-Requested-With',
      'Accept',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  },
},


  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
