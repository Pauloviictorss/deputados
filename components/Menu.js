import React from 'react'
import Link from 'next/link'
import { Container, Dropdown, DropdownButton, InputGroup, Nav, Navbar } from 'react-bootstrap'
import { FaBackward, FaForward, FaHome } from "react-icons/fa";

const Menu = () => {

  return (
      <div>
        <Navbar style={{ backgroundColor: "#090909", height: '6vh'}} variant="dark" fixed="top">
            <Container style={{alignItems: 'baseline'}}>
            <Link className='btn btn-warning mx-2' href='/home'><FaHome/></Link>
                <Nav className="btn mx-auto">
                    <InputGroup>                      
                        <DropdownButton
                        variant="outline-light"
                        title="Portal da Transparência"
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item href="/partidos">Partidos</Dropdown.Item>
                        <Dropdown.Item href="/deputados">Deputados</Dropdown.Item>
                        <Dropdown.Item href="/eventos">Eventos</Dropdown.Item>
                        <Dropdown.Item href="/proposicoes">Proposições</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>

                </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default Menu