import HomeScreen from '@/components/HomeScreen'
import Link from 'next/link'
import React from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import apiDeputados from '../services/apiDeputados'

const index = (props) => {

    return (
        <HomeScreen>
            <div style={{ margin: '120px 0'}}>
                <Card className='align-items-center p-2 mb-2'>
                    <h1>Eventos mais recentes</h1>
                </Card>

                <Row xs={1} md={2} xl={3} className="g-5">
                    {props.eventos.map(item => (
                        <Col key={item.id}>
                            <Card style={{textAlign: 'center', marginBottom: '5px', }}>
                                <h3>{item.descricaoTipo.slice(0,24)}</h3>
                                <p>Situação: {item.situacao}</p>
                                <p>{item.descricao.slice(0,50)}...</p>
                            </Card>
                            <Link className="btn btn-warning w-100 mb-3" href={'/eventos/' + item.id}>Ver Detalhes</Link>
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

    const resultado = await apiDeputados.get('eventos')
    const eventos = resultado.data.dados

    return {
        props: { eventos }
    }
}