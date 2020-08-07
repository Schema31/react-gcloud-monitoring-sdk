# react-gcloud-monitoring-sdk

import Logger from "@schema31/react-gcloud-monitoring-sdk";
const devMode = true;

const logger = new Logger({
  graylogPort: 12201,
  graylogHostname: '127.0.0.1',
  connection: 'wan',
  maxChunkSizeWan: 1420,
  maxChunkSizeLan: 8154
}, devMode);
