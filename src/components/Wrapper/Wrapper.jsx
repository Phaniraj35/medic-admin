import { Container, Navbar, Nav } from 'react-bootstrap';
import './Wrapper.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Wrapper = () => {

  const location = useLocation()

  return (
    <>
        <Navbar>
            <Container>
                <Navbar.Brand>
                    MedicAdmin
                </Navbar.Brand>

                <Nav className="me-auto" activeKey={location.pathname}>
                    <Nav.Link as={Link} to="/medications-list">Medication List</Nav.Link>
                    <Nav.Link as={Link} to="/add-medication">Add Medication</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        <Container>
            <Outlet />
        </Container>

    </>
  )
}

export default Wrapper