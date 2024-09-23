import { Link } from "react-router-dom";
import JN59UlI from "../assets/img/JN59UlI.png"; // Assuming your image path is correct
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { disconnectWallet } from "../util/interact";
import { useNavigate } from "react-router-dom";

const Header = ({ setWallet, setStatus }) => {
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    // Load wallet address only once when the component mounts
    useEffect(() => {
        const walletAddress = localStorage.getItem('wallet_address');
        setAddress(walletAddress);
    }, []);

    // Handle disconnect wallet
    const handleDisconnect = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to disconnect wallet",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Disconnect"
        }).then((result) => {
            if (result.isConfirmed) {
                const { address, status } = disconnectWallet();
                navigate("/");
                setWallet(address); 
                setStatus(status);

                // Clear local storage and reset address
                localStorage.removeItem('wallet_address');
                setAddress('');  // Update state after disconnection
                
                
                Swal.fire({
                    title: "Disconnected!",
                    text: "Wallet Disconnected.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <header className="header_wrap fixed-top">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand page-scroll" href="/">
                        <img className="logo_light fav-logo" height="50px" width="50px" src={JN59UlI} alt="logo" />
                        <img className="logo_dark fav-logo" src={JN59UlI} alt="logo" />
                    </a>
                    {/* <button className="navbar-toggler green" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        ≡
                    </button> */}
                    <div className="navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto">
                            <li className="dropdown">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {
                                address ? (
                                    <>
                                        <li className="dropdown">
                                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                        </li>
                                        <li className="dropdown">
                                            <p className="nav-link" style={{ color: '#fff', cursor: 'pointer' }} onClick={handleDisconnect}>Disconnect</p>
                                        </li>
                                    </>
                                ) : (
                                    <li className="dropdown">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
