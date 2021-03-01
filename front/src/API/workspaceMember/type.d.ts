export interface IAddWorkSpaceMember {
  email: string;
}

export interface IAddWorkSpaceMemberURL {
  workspace: string;
}

export interface IListReadWorkSpaceMemberURL {
  workspace: string;
}

export interface IRemoveWorkSpaceMemberURL {
  workspace: string;
  mberId: string;
}
