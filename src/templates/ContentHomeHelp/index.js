import React from 'react';
import {MdHelp} from "react-icons/md";
import "../ContentHomeHelp/style.css";
import {Link} from 'react-router-dom';

export default function ContentHomeHelp () {
    return (
            <div className="contentHomeHelp-container">
                <Link to='/' className='link'><div className="siteTitle">EPHEMERAL</div></Link>
                <ul >
                    <li className="iconHelp"><Link to = "/help" className="link"><MdHelp size={30}/></Link></li>
                </ul>
            </div>
    );
}