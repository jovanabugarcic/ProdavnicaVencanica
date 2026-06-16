import { useNavigate } from 'react-router-dom';
import {
    Badge,
    Navbar,
    Nav,
    Container,
    NavDropdown
} from 'react-bootstrap';
import {
    FaShoppingCart,
    FaUser,
} from 'react-icons/fa';

import logo from '../assets/logo.png';

import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <header>

            
            <div className="announcement-bar">
                ✨ Nova Bridal Collection 2026 • Besplatna dostava za porudžbine preko 1000€ ✨
            </div>

            <Navbar
                expand="lg"
                collapseOnSelect
                className="lux-navbar"
                sticky="top"
            >
                <Container>

                    
                    <LinkContainer to="/">
                        <Navbar.Brand className="brand-wrapper">
                            <img
                                src={logo}
                                alt="My Wedding Dress"
                                width="65"
                                height="65"
                                className="brand-logo"
                            />

                            <div className="brand-text">
                                <div className="brand-name">
                                    MY WEDDING DRESS
                                </div>

                                <div className="brand-subtitle">
                                    Bridal Boutique
                                </div>
                            </div>
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                        
                        <Nav className="mx-auto nav-center">

                            <LinkContainer to="/">
                                <Nav.Link>Početna</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/">
                                <Nav.Link>Kolekcija</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/">
                                <Nav.Link>Venčanice</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/">
                                <Nav.Link>Kontakt</Nav.Link>
                            </LinkContainer>

                        </Nav>

                        
                        <Nav className="align-items-center">

                            <LinkContainer to="/cart">
                                <Nav.Link className="icon-link">
                                    <FaShoppingCart size={20} />

                                    {cartItems.length > 0 && (
                                        <Badge
                                            pill
                                            className="cart-badge"
                                        >
                                            {cartItems.reduce(
                                                (a, c) => a + c.qty,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>

                            

                            {userInfo ? (
                                <NavDropdown
                                    title={
                                        <span className="user-dropdown">
                                            <FaUser className="me-2" />
                                            {userInfo.name}
                                        </span>
                                    }
                                    id="username"
                                    align="end"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Moj profil
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Divider />

                                    <NavDropdown.Item
                                        onClick={logoutHandler}
                                    >
                                        Odjava
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className="icon-link">
                                        <FaUser size={18} />
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown
                                    title="Admin"
                                    id="adminmenu"
                                    align="end"
                                >
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                        </Nav>

                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    );
};

export default Header;