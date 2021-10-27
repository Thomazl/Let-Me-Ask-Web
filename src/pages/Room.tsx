import { useParams } from 'react-router-dom';
import logoSVG from '../assets/images/logo.svg';
import { Button } from '../components/button';
import { RoomCode } from '../components/roomcode';
import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParams>();

  return (
    <div>
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoSVG} alt="letmeask" />
            <RoomCode code={params.id} />
          </div>
        </header>

        <main>
          <div className="room-title">
            <h1>Sala React</h1>
            <span>4 Perguntas</span>
          </div>

          <form>
            <textarea
              placeholder="Faça sua pergunta!"
            />
            <div className="form-footer">
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
              <Button type="submit">Enviar pergunta</Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}