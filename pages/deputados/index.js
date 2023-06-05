import HomeScreen from '@/components/HomeScreen'
import Link from 'next/link'
import React from 'react'
import { Button, Card, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import apiDeputados from '../services/apiDeputados'
import {FaSearch} from 'react-icons/fa';
import { Breadcrumbs, Typography } from '@mui/material'

const index = (props) => {

    function pesquisar (event) {
        setQuery(event.data)
    }
    function pesquisarBotao (event) {
    apiDeputados.get('deputados?nome=' + query).then(resultado => {
    })
    }

    return (
        <HomeScreen>
            <div style={{ margin: '120px 0'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/home">
                        Home
                    </Link>
                    <Typography color="text.primary">Deputados</Typography>
                </Breadcrumbs>
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
                    <h1>Deputados cadastrados</h1>
                </Card>

                <Row xs={1} md={2} xl={3} className="g-5">
                    {props.deputados.map(item => (
                        <Col key={item.id}>
                            <Card style={{textAlign: 'center', marginBottom: '5px', }}>
                                <h3>{item.nome}</h3>
                                <Card.Img variant="top" src={item.urlFoto}/>
                            </Card>
                            <Link className="btn btn-warning w-100 mb-3" href={'/deputados/' + item.id}>Ver Detalhes</Link>
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

    const resultado = await apiDeputados.get('deputados')
    const deputados = resultado.data.dados

    return {
        props: { deputados }
    }
}