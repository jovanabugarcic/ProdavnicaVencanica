import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
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
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar
        expand='lg'
        collapseOnSelect
        className='custom-navbar'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='brand-container'>
              <img
                src={logo}
                alt='Wedding Logo'
                className='navbar-logo'
              />

              <div className='brand-text'>
                <span className='brand-title'>
                  MY WEDDING DRESS
                </span>

                <span className='brand-subtitle'>
                  Bridal Boutique
                </span>
              </div>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto align-items-center'>
              <LinkContainer to='/cart'>
                <Nav.Link className='nav-link-custom'>
                  <FaShoppingCart />

                  <span className='ms-2'>Cart</span>

                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg='warning'
                      text='dark'
                      className='ms-2'
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
                  title={userInfo.name}
                  id='username'
                  className='nav-link-custom'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='nav-link-custom'>
                    <FaUser />

                    <span className='ms-2'>Login</span>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;