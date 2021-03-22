import {MdHelp} from "react-icons/md";
import { Link } from "react-router-dom";
import "./style.css";


export default function ContentHomeAboutContact () {
    return (
            <div className="contentHomeHelp-container">
                <div className="siteTitle">EPHEMERAL</div>
                <ul >
                    <li><a href = "#about" className="link">Sobre</a></li> 
                    <li><a href = "#contact" className="link">Contato</a></li> 
                    <li><Link to='/myProfile' className='link'>Perfil</Link></li>
                    <Link to="/problems" className="link"><li className="link">Relatos</li></Link>
                    <li className="iconHelp"><Link to = "/help" className="link"><MdHelp size={30}/></Link></li>
                </ul>
            </div>
    );
}