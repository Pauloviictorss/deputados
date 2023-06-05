import HomeScreen from '@/components/HomeScreen'
import Link from 'next/link'
import React from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import apiDeputados from '../services/apiDeputados'

const Detalhes = ({partidos, deputadosPartido}) => {

    return (
        <HomeScreen>
            <div style={{ margin: "120px 0" }}>
                <h1 className='mx-3'>{partidos.sigla} - {partidos.nome}</h1>

                <h2 className='mx-3'>Detalhes do partido:</h2>
                <Card className='mx-3' style={{border: 'none'}}>
                    <Card.Img style={{ width: '75px'}} src={partidos.urlLogo}/>
                </Card>
                <h5 className='mx-3'>Número total de membros: {partidos.status.totalMembros}</h5>
                <h5 className='mx-3'>Situação atual: {partidos.status.situacao}</h5>

                <Card.Img className='mx-3' style={{ width: '200px'}} src={partidos.status.lider.urlFoto}/>
                <h5 className='mx-3'>Líder partidário: {partidos.status.lider.nome}</h5>
                <p className='mx-3'>UF: {partidos.status.lider.uf}</p>
                
                <Card className='px-3 pt-2 m-1'>
                    <h3>Membros do {partidos.sigla} - {partidos.nome}</h3>
                </Card>

                <Row xs={1} md={2} xl={3} className="g-5">
                    {deputadosPartido.map(item => (
                        <Col key={item.id}>
                            <Card style={{margin: '5px', }}>
                                <h3 style={{margin: '10px'}}>{item.nome}</h3>
                                <Card.Img variant="top" src={item.urlFoto}/>
                            </Card>
                            <Link className="btn btn-warning w-100 mb-3" href={'/deputados/' + item.id}>Ver Detalhes</Link>
                        </Col>
                    ))}
                </Row>

                <Card style={{border: 'none', marginTop: '10px'}}>
                    <Link style={{margin: '0 auto'}} className='btn btn-warning ' href='/partidos'> VOLTAR PARA PARTIDOS</Link>
                </Card>
                <Card style={{border: 'none', marginTop: '10px'}}>
                <Link style={{margin: '0 auto'}} className='btn btn-warning ' href='/home'> VOLTAR PARA HOME</Link>
                </Card>   
            </div>
        </HomeScreen>
    )
}

export default Detalhes

export async function getServerSideProps(context){
    
    const id = context.params.id
    
    const res = await apiDeputados.get('partidos/' + id)
    const partidos = res.data.dados

    const resDeputadosPartido = await apiDeputados.get('partidos/' + id + '/membros')
    const deputadosPartido = resDeputadosPartido.data.dados
    
    return {
        props: { partidos, deputadosPartido }
    }
}