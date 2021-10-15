import {useHistory} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ilustrationSVG from '../assets/images/illustration.svg';
import logoSVG from '../assets/images/logo.svg';
import googleSVG from '../assets/images/google-icon.svg';
import {Button} from '../components/button';
import '../styles/auth.scss';

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()


    async function handleCreateRoom() {
        if (!user) {
          await signInWithGoogle()
        }
    
        history.push('/rooms/new');
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
                    <img src={logoSVG} alt="logoSVG"/>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleSVG} alt="googleSVG"/>
                        Crie sua conta com o Google
                    </button>
                    <div className="separator">
                        Ou entre em uma sala
                    </div>
                    <form>
                       <input 
                       type="text" 
                       placeholder="Digite o codigo da sala" /> 
                       <Button type="submit">
                            Entrar na sala
                       </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

