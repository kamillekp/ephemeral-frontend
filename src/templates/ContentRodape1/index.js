import React from 'react';
import './style.css';

import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

export default function ContentRodape1 () {
    return (
        <div className="rodapeContainer">
            <div className="contato">
                <p id="contact">Contate-nos</p>
                <a href="https://mail.google.com/" classname="link">kamille.kpimentel@gmail.com</a>
                <p><a href={`https://wa.me/5551995215473`} classname="link">Número para contato</a></p>
            </div>
            <div className="redes">
                <p>Social</p>
                <div className="socialMedias">
                    <a href="https://www.facebook.com/"><FiFacebook size={30}/></a>
                    <a href="https://www.instagram.com/"><FiInstagram size={30}/></a>
                    <a href="https://www.twitter.com/"><FiTwitter size={30}/></a>
                </div>
            </div>
        </div>
    );
}