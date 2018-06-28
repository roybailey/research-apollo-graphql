
export interface IAudit {
  id?: string,
  namespace: string,
  event: string,
  type: string,
  timestamp: string,
  payload?: string,
}

