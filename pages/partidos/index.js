import HomeScreen from '@/components/HomeScreen'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import apiDeputados from '../services/apiDeputados'
import {FaSearch} from 'react-icons/fa';

const index = (props) => {

    function pesquisar (event) {
        setQuery(event.data)
    }
    function pesquisarBotao (event) {
    apiDeputados.get('partidos?sigla=' + query + '&itens=25').then(resultado => {
        
    })
    }

    return (
        <HomeScreen>
            <div style={{ margin: '120px 0'}}>
                <InputGroup className="my-4">
                    <Form.Control
                    placeholder="Digite a sigla do partido desejado..."
                    aria-label="Digite a sigla do partido desejado..."
                    aria-describedby="basic-addon2"
                    onChange={pesquisar}
                    />
                    <Button onClick={pesquisarBotao} variant="warning" id="button-addon2">
                    Pesquisar <FaSearch/>
                    </Button>
                </InputGroup>

                <Card className='align-items-center p-2 mb-2'>
                    <h1>Partidos cadastrados</h1>
                </Card>

                <Row xs={1} md={2} xl={3} className="g-2">
                    {props.partidos.map(item => (
                        <Col key={item.id}>
                            <Card className='mb-1 bg-light'>
                                <Card.Body style={{textAlign: 'center'}}>
                                    <h3>{item.sigla}</h3>
                                    <p>{item.nome}</p>
                                    <Link className="btn btn-warning w-100" href={'/partidos/' + item.id}>Ver Detalhes</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Card style={{border: 'none', marginTop: '10px'}}>
                    <Link style={{margin: '0 auto'}} className='btn btn-warning ' href='/home'> VOLTAR PARA HOME</Link>
                </Card>
            </div>
        </HomeScreen>
    )
}

export default index

export async function getServerSideProps(context){

    const resultado = await apiDeputados.get('partidos')
    const partidos = resultado.data.dados

    return {
        props: { partidos }
    }
}