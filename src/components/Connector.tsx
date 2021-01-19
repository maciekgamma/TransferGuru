import { useState, ChangeEvent, useEffect } from 'react';
import { connect, io } from 'socket.io-client';
import Peer from 'simple-peer';
import { OfferAlert } from './index';
import {
  ConnectRequestFromPeerParams,
  PeerData,
  eventNames,
  ConnectionOfferResponseFromPeerParams,
} from '../API';

const Connector = () => {
  const [codeInput, setCodeInput] = useState('');
  const [myCode, setMyCode] = useState('Loading...');
  const [myPeer, setMyPeer] = useState(undefined);
  const [offer, setOffer] = useState<ConnectRequestFromPeerParams | undefined>(
    undefined
  );
  const [connected, setConnected] = useState('no');
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    if (socket !== undefined) {
      try {
        socket.disconnect();
      } catch (e) {}
    }
    newSocket.on(eventNames.newCode, (code) => {
      setMyCode(code);
    });
    newSocket.on(
      eventNames.connectOffer,
      (req: ConnectRequestFromPeerParams) => {
        setOffer(req);
      }
    );
    newSocket.on(eventNames.connectionRequestResponse, (data) => {
      setConnected('yes');
    });
    setSocket(newSocket);
  }, []);

  const offerResponseAction = (accept: boolean) => {
    if (!accept) {
      setOffer(undefined);
      return;
    }
    const newPeer = new Peer();
    newPeer.on('signal', (peerData: PeerData) => {
      console.log(peerData);
      const res: ConnectionOfferResponseFromPeerParams = {
        requestedCode: offer.hostCode,
        hostCode: myCode,
        peerData,
      };
      socket.emit(eventNames.connectionOfferResponseFromPeer, res);
    });
    console.log(offer.peerData);
    newPeer.signal(offer.peerData);
    setMyPeer(newPeer);
  };

  const onClickConnect = () => {
    try {
      const newPeer = new Peer({ initiator: true });
      newPeer.on('signal', (peerData: PeerData) => {
        const req = { requestedCode: codeInput, hostCode: myCode, peerData };
        socket.emit(eventNames.connectRequestFromPeer, req);
      });
      setMyPeer(newPeer);
    } catch (e) {
      console.log(e);
    }
  };

  const onCodeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCodeInput(e.target.value);
  };
  return (
    <div>
      <div>Transfer Files Fast And Safe</div>
      <div>
        Shere this code with the person you want to exchange files with:
      </div>
      <input value={myCode} readOnly />
      <div>Or enter the code:</div>
      <input onChange={onCodeInputChange} value={codeInput} />
      <button onClick={onClickConnect}>Connect!</button>
      {offer ? <OfferAlert offer={offer} action={offerResponseAction} /> : ''}
      <div>Connected: {connected}</div>
    </div>
  );
};

export default Connector;
