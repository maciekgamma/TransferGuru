import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const classes = {
  btn: 'p-3 border-black border-2',
};

const APIComp = () => {
  const [code, setCode] = useState('null');
  const [availability, setAvailability] = useState(false);
  const [inputCode, setInputCode] = useState();
  const [socket, setSocket] = useState(undefined);
  const [peer, setPeer] = useState(undefined);
  const [offer, setOffer] = useState(undefined);

  useEffect(() => {
    runTest();
  }, []);

  const runTest = () => {
    const newSocket = io('http://localhost:4000');
    newSocket.on('newCode', (data) => {
      setCode(data);
    });
    newSocket.on('askAvailability', () => {
      newSocket.emit('availabilityResponse', true);
    });
    newSocket.on('connectOffer', (data) => {
      console.log(data);
      setOffer(data);
    });
    newSocket.on('availabilityResponse', (res) => {
      setAvailability(res);
    });
    setSocket(newSocket);
  };

  const checkAvaliability = () => {
    socket.emit('askAvailability', {
      requestedCode: inputCode,
      hostCode: code,
    });
  };

  const connetToPeer = () => {
    const newPeer = new Peer({ initiator: true });
    newPeer.on('signal', (data) => {
      if (data.type === 'offer') {
        socket.emit('connectRequest', {
          requestedCode: inputCode,
          peerData: data,
          hostCode: code,
        });
      }
    });
    setPeer(newPeer);
  };

  const inputOnChange = (e) => {
    setInputCode(e.target.value);
  };

  return (
    <div>
      <div className="p-3">{code}</div>
      <button onClick={runTest} className={classes.btn}>
        TEST
      </button>
      <div className="p-3">{availability ? 'yes' : 'no'}</div>
      <input onChange={inputOnChange} value={inputCode} />
      <button onClick={checkAvaliability} className={classes.btn}>
        CHECK
      </button>
      <button onClick={connetToPeer} className={classes.btn}>
        CONNECT
      </button>
      <div>{offer ? offer.peerData.type : ''}</div>
    </div>
  );
};

export default APIComp;
