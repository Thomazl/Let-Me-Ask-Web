import copySVG from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}
export function RoomCode(props: RoomCodeProps) {
function copyToClipboard() {
    navigator.clipboard.writeText(props.code);
}

  return(
    <button className="room-code" onClick={copyToClipboard}>
        <div>
            <img src={copySVG} alt="copy room code"></img>
        </div>
        <span>sala #15611235423132</span>
    </button>
  )
}