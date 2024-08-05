import React from 'react'
import styles from './footer.module.css'
import { Belgrano } from 'next/font/google'
import { FaGithub, FaInstagram } from 'react-icons/fa'
import { SlSocialFacebook } from 'react-icons/sl'
import { PiLinkedinLogo } from 'react-icons/pi'
import { FaXTwitter } from 'react-icons/fa6'


const Footer = () => {

    const socialLinks = [
        {
            name: "Github",
            icon: <FaGithub />,
            link: "https://www.github.com/ishanjarwal"
        },
        {
            name: "Instagram",
            icon: <FaInstagram />,
            link: "https://www.instagram.com/ishanjarwal"
        },
        {
            name: "Facebook",
            icon: <SlSocialFacebook />,
            link: "https://www.facebook.com/profile.php?id=100082865800854"
        },
        {
            name: "LinkedIn",
            icon: <PiLinkedinLogo />,
            link: "https://www.linkedin.com/in/ishan-jarwal-7a2356265/"
        },
        {
            name: "Twitter",
            icon: <FaXTwitter />,
            link: "https://x.com/ishanjarwal"
        },
    ]


    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.footerCol}>
                        <h4>follow us</h4>
                        <div className={styles.socialLinks}>
                            {socialLinks.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <a key={idx} href={item.link}>
                                        {Icon}
                                    </a>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <div className={styles.footerCol}>
                        <h4>me</h4>
                        <ul>
                            <li><a href="#">about me</a></li>
                            <li><a href="#">my skills</a></li>
                            <li><a href="#">contact</a></li>
                            <li><a href="#">projects</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerCol}>
                        <h4>Topics</h4>
                        <ul>
                            <li><a href="#">Coding</a></li>
                            <li><a href="#">Technology</a></li>
                            <li><a href="#">AI</a></li>
                            <li><a href="#">Money</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
