import {MdHelp} from "react-icons/md";
import { Link } from "react-router-dom";
import "./style.css";


export default function ContentHeaderLogado () {
    return (
            <div className="contentHomeHelp-container">
                <Link to='/home' className='link'><div className="siteTitle">EPHEMERAL</div></Link>
                <ul >
                    <li><a href = "/home" className="link">HOME</a></li> 
                    <Link to="/myProfile" className="link"><li className="link">PERFIL</li></Link>
                    <li className="iconHelp"><Link to = "/help" className="link"><MdHelp size={30}/></Link></li>
                </ul>
            </div>
    );
}