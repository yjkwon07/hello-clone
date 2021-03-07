export interface IAddWorkSpaceDms {
  content: string;
}
export interface IAddWorkSpaceDmsURL {
  workspace: string;
  mberId: string;
}

export interface IListReadWorkSpaceDmsURL {
  workspace: string;
  mberId: string;
}
export interface IListReadWorkSpaceDmsHeaderQuery {
  perPage?: number;
  page?: number;
}
