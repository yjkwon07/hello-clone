export interface IAddWorkSpaceChannelChatURL {
  workspace: string;
  channel: string;
}
export interface IAddWorkSpaceChannelChatBodyQuery {
  content: string;
}

export interface IListWorkSpaceChannelChatURL {
  workspace: string;
  channel: string;
}
export interface IListWorkSpaceChannelChatHeaderQuery {
  perPage: number;
  page: number;
}
