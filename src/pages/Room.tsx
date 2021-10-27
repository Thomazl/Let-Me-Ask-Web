import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoSVG from '../assets/images/logo.svg';
import { Button } from '../components/button';
import { RoomCode } from '../components/roomcode';
import { useAuth } from '../hooks/useAuth';
import { database, ref, push } from '../services/firebase';
import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const questions = ref(database, `rooms/${params.id}/questions`);

  const roomId = params.id;

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }
    if (!user) {
      throw new Error('User not authenticated');
    }
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswer: false,
    };

    push(questions, question);

    setNewQuestion('');
  }



  return (
    <div>
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoSVG} alt="letmeask" />
            <RoomCode code={roomId} />
          </div>
        </header>

        <main>
          <div className="room-title">
            <h1>Sala React</h1>
            <span>4 Perguntas</span>
          </div>

          <form onSubmit={handleSendQuestion}>
            <textarea
              placeholder="Faça sua pergunta!"
              onChange={event => setNewQuestion(event.target.value)}
              value={newQuestion}
            />
            <div className="form-footer">
              {user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>Para enviar uma pergunta, <button>faça seu login</button></span>
              )}
              <Button type="submit" disabled={!user}>Enviar pergunta</Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}