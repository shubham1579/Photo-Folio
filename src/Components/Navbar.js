import navStyles from './Navbar.module.css';
import logo from '../images/logo.png';

function Navbar(){

    let home = '#';

    return (
        <div className = {navStyles.navcontainer}>
            <a href = {home}>
                <img src = {logo} alt="Photopholio" />
            </a>
            <a className = {navStyles.heading} href = {home}>
                <h2>PhotoFolio</h2>
            </a>   
        </div>
    );

}

export default Navbar;