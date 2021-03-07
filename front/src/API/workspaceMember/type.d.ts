export interface IAddWorkSpaceMemberBodyQuery {
  email: string;
}
export interface IAddWorkSpaceMemberURL {
  workspace: string;
}

export interface IListReadWorkSpaceMemberURL {
  workspace: string;
}
export interface IReadWorkSpaceMemberURL {
  workspace: string;
  mberId: string;
}

export interface IRemoveWorkSpaceMemberURL {
  workspace: string;
  mberId: string;
}
