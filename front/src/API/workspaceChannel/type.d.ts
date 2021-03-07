export interface IAddWorkspaceChannelBodyQuery {
  name: string;
}

export interface IAddCWorkspaceChannelURL {
  workspace: string;
}

export interface IListReadWorkspaceChannelURL {
  workspace: string;
}

export interface IReadWorkspaceChannelURL {
  workspace: string;
  channel: string;
}
