// tiny fetch wrapper with JSON + error handling
export type ApiInit = {
    baseUrl: string;
    headers?: Record<string, string>;
  };
  
  export function createApi({ baseUrl, headers = {} }: ApiInit) {
    const json = <T>(res: Response) =>
      res.ok ? res.json() as Promise<T> : res.text().then(t => {
        throw new Error(`${res.status} ${res.statusText} – ${t}`);
      });
  
    const get  = <T>(path: string, init?: RequestInit) =>
      fetch(baseUrl + path, { ...init, headers }).then(json<T>);
    const post = <T>(path: string, body: BodyInit, init?: RequestInit) =>
      fetch(baseUrl + path, { method: "POST", body, headers, ...init }).then(json<T>);
  
    return { get, post };
  }
  