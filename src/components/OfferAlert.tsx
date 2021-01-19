import { ConnectRequestFromPeerParams } from '../API';

interface IProps {
  offer: ConnectRequestFromPeerParams;
  action: (boolean) => void;
}
// move all types to separate folder
const OfferAlert = ({ offer, action }: IProps) => {
  return (
    <div>
      <div>Peer {offer.hostCode} wants to connect wth you!</div>
      <button
        onClick={() => {
          action(true);
        }}
      >
        Accept
      </button>
      <button
        onClick={() => {
          action(false);
        }}
      >
        Decline
      </button>
    </div>
  );
};

export default OfferAlert;
