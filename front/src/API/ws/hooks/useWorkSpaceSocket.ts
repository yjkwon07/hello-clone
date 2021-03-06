import { useCallback } from 'react';
import io from 'socket.io-client';
import { axiosSetting } from '@API/client';

const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useWorkSpaceSocket = (workspace: string): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    sockets[workspace].disconnect();
    delete sockets[workspace];
  }, [workspace]);

  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${axiosSetting.server()}/ws-${workspace}`, {
      transports: ['websocket'],
    });
  }

  return [sockets[workspace], disconnect];
};

export default useWorkSpaceSocket;
