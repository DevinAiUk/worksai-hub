/**
 * TypeScript Entrypoint for WorksAI Product Hub & Data Lake Platform (`worksai.org`)
 */
export {
  APPS_CATALOG,
  INITIAL_DATALAKE_DOCS,
  createWorksAiStore,
  resolveAuth,
  searchDataLake,
  ingestDataLakeRecord,
  handleWorksAiRequest,
  default
} from "./worker.mjs";
