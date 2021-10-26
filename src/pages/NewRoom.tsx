import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import ilustrationSVG from '../assets/images/illustration.svg';
import logoSVG from '../assets/images/logo.svg';
import { Button } from '../components/button';
import '../styles/auth.scss';
import { database, push, ref } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
export function NewRoom() {
    const { user } = useAuth()
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');
    //Faz a criação da sala
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        //verifica se não está vazio
        if (newRoom.trim() === '') {
            return;
        }


        const roomRef = ref(database, 'rooms');

        //Salva no banco de dados dados da sala
        const firebaseRoom = await push(roomRef, {
            tittle: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`);
    }
    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationSVG} alt="Ilustração" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoSVG} alt="logoSVG" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente?<Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}