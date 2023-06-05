import HomeScreen from '@/components/HomeScreen'
import Link from 'next/link'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import apiDeputados from '../services/apiDeputados'
import { Breadcrumbs, Typography } from '@mui/material'

const Detalhes = ({eventos, participantes}) => {
    console.log({eventos});
    
    return (
        <HomeScreen>
            <div style={{ margin: "120px 0" }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/home">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/eventos"
                    >
                        Eventos
                    </Link>
                    <Typography color="text.primary">{eventos.descricaoTipo} - {eventos.situacao}</Typography>
                </Breadcrumbs>
                <h1>{eventos.descricaoTipo} - {eventos.situacao}</h1>
                <Card className='bg-dark text-light' style={{ borderRadius: "10px" }}>
                    <h1 className='mx-3'>Descrição do evento</h1>
                    <p className='mx-3'>{eventos.descricao}</p>
                </Card> 
                <Card className='px-3 pt-2 my-1'>
                    {!eventos.localCamara.nome && <h3 style={{margin: '20px 0'}}>Não há informações sobre o local desse evento.</h3>}
                    {eventos.localCamara.nome &&
                    <p style={{ fontSize: "18pt" }}><strong>Local: </strong>{eventos.localCamara.nome}</p>
                    }
                </Card>
                <Card className='px-3 pt-2 mb-1'>
                    {(!eventos.dataHoraInicio || !eventos.dataHoraFim) && (<h4 style={{margin: '20px 0'}}>Não há informações sobre o horário desse evento.</h4>)}
                    {eventos.dataHoraInicio && eventos.dataHoraFim &&
                        <p style={{ fontSize: "18pt" }}><strong>Das: </strong>{eventos.dataHoraInicio.slice(8, 10)}/{eventos.dataHoraInicio.slice(5, 7)}/{eventos.dataHoraInicio.slice(0, 4)}, {eventos.dataHoraInicio.slice(11, 20)}h <strong>até: </strong>{eventos.dataHoraFim.slice(8, 10)}/{eventos.dataHoraFim.slice(5, 7)}/{eventos.dataHoraFim.slice(0, 4)}, {eventos.dataHoraFim.slice(11, 20)}h</p>
                    }
                </Card>
                <Card className='px-3 pt-2 mb-1'>
                    <h3>Órgãos organizadores</h3>
                    {eventos.orgaos.map(item => (
                        <Row key={item.id}>
                            <Col>
                                <ul>
                                    <li style={{ margin: '5px', }}><strong>{item.sigla}</strong> - {item.nome}</li>
                                </ul>
                            </Col>
                        </Row>
                    ))}
                </Card>
                <Card className='px-3 pt-2 mb-1'>
                    {!eventos.urlRegistro && <h3 style={{margin: '20px 0'}}>Não há informações sobre os participantes desse evento.</h3>}
                    {eventos.dataHoraInicio && eventos.dataHoraFim &&
                    <Card style={{border:'none'}}>
                        <h3>Deputados participantes</h3>
                        <Row xs={1} md={2} xl={3} className="g-5">
                            {participantes.map(item => (
                                <Col key={item.id}>
                                    <Card style={{margin: '5px', }}>
                                        <h3 style={{margin: '10px'}}>{item.nome}</h3>
                                        <Card.Img variant="top" src={item.urlFoto}/>
                                    </Card>
                                    <Link className="btn btn-warning w-100 mb-3" href={'/deputados/' + item.id}>Ver Detalhes</Link>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                        }
                </Card>

                <Card>
                    <Card style={{border: 'none'}} className='px-3 pt-2'>
                        {!eventos.urlRegistro && <h3 style={{margin: '20px 0'}}>Não há informações sobre as transmissões desse evento.</h3>}
                        {eventos.urlRegistro &&
                            <p style={{ fontSize: "18pt" }}><strong>Transmissão oficial: </strong> <a target='_blank' href={eventos.urlRegistro} rel="noreferrer">{eventos.urlRegistro}</a></p>
                        }
                    </Card>
                    {eventos.urlRegistro &&      
                    <div style={{ textAlign: 'center' }}>
                    <iframe width="560" height="315" src={eventos.urlRegistro.slice(0, 24) + 'embed/' + eventos.urlRegistro.slice(32)} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture;"></iframe>
                    </div>
                    }
                </Card>
                <Card style={{border: 'none', marginTop: '10px'}}>
                    <Link style={{margin: '0 auto'}} className='btn btn-warning ' href='/eventos'> VOLTAR PARA EVENTOS</Link>
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
    
    const res = await apiDeputados.get('eventos/' + id)
    const eventos = res.data.dados

    const resParticipantes = await apiDeputados.get('eventos/' + id + '/deputados')
    const participantes = resParticipantes.data.dados
    
    return {
        props: { eventos, participantes }
    }
}