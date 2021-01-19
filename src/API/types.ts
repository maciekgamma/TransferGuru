export interface PeerData {
  type?: 'offer' | 'pranswer' | 'answer' | 'rollback';
  sdp?: unknown;
  candidate?: unknown;
}

export interface ConnectRequestFromPeerParams {
  requestedCode: string;
  hostCode: string;
  peerData: PeerData;
}

export interface ConnectionOfferResponseFromPeerParams {
  requestedCode: string;
  hostCode: string;
  peerData: PeerData;
}
