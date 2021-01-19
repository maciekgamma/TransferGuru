import { io } from 'socket.io-client';
import { EventEmitter } from 'events';

const eventsFromServer = {
  newCode: 'newCode',
  askAvailability: 'askAvailability',
  availabilityResponse: 'availabilityResponse',
  availabilityResponseFromPeer: 'availabilityResponseFromPeer',
  askPeerForAvailability: 'askPeerForAvailability',
  connectRequestFromPeer: 'connectRequest',
  connectOffer: 'connectOffer',
  connectionRequestResponse: 'connectionRequestResponse',
  connectionOfferResponseFromPeer: 'connectionOfferResponseFromPeer',
};

const myEvents = {
  connected: 'connected',
};

interface InitialMessage {
  code: string;
}

interface PeerData {
  type?: 'offer' | 'pranswer' | 'answer' | 'rollback';
  sdp?: unknown;
  candidate?: unknown;
}

interface ConnectionRequestResponse {
  errors: Array<string>;
  succes: boolean;
  candidatesCode: string;
  peerData?: PeerData;
}

const webApiInterface = () => {
  let socket = undefined;
  let code = undefined;
  const ee = new EventEmitter();
  const initConnection = async () => {
    socket = io('http://localhost:4000');

    socket.on(eventsFromServer.newCode, (data: InitialMessage) => {
      code = data.code;
      ee.emit(myEvents.connected, { code });
    });

    socket.on(
      eventsFromServer.connectRequestFromPeer,
      (data: ConnectionRequestResponse) => {}
    );
  };
};
