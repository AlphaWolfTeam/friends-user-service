export const clientId = process.env.SPIKE_CLIENT_ID || 'enter_client_id';
export const clientSecret = process.env.SPIKE_CLIENT_SECRET || 'enter_client_secret';

export const server = {
  nodeEnv: 'production',
  port: process.env.PORT || '8000',
};

export const kartoffel = {
  url: process.env.KARTOFFEL_URL || 'http://localhost:8010/kartoffel',
  searchQuery: `/search?domainusers.datasource=${process.env.DOMAINUSERS_QUERY || 'nonExternals'}`,
};

export const apmConfig = {
  isActive: process.env.ELASTIC_APM_ACTIVE || 'false',
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN || '',
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  traceParentHeader: process.env.APM_TRACEPARENT_HEADER || 'X-traceparent',
};
