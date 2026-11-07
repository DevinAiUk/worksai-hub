declare module "./worker.mjs" {
  export const APPS_CATALOG: any[];
  export const ARTICLES_CATALOG: any[];
  export const INITIAL_DATALAKE_DOCS: any[];
  export function createWorksAiStore(): any;
  export function resolveAuth(req: Request, store?: any, env?: any): Promise<any>;
  export function searchDataLake(store: any, params: any, auth: any): any[];
  export function ingestDataLakeRecord(store: any, body: any, auth: any, env?: any): Promise<any>;
  export function handleWorksAiRequest(request: Request, env?: any, store?: any): Promise<Response>;
  const _default: { fetch(request: Request, env?: any): Promise<Response> };
  export default _default;
}
