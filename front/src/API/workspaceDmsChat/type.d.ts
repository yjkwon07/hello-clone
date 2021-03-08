export interface IAddWorkSpaceDmsChat {
  content: string;
}
export interface IAddWorkSpaceDmsChatURL {
  workspace: string;
  mberId: string;
}

export interface IListReadWorkSpaceDmsChatURL {
  workspace: string;
  mberId: string;
}
export interface IListReadWorkSpaceDmsChatHeaderQuery {
  perPage?: number;
  page?: number;
}
