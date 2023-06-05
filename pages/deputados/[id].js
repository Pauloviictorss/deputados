import HomeScreen from '@/components/HomeScreen'
import Link from 'next/link'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import apiDeputados from '../services/apiDeputados'

const Detalhes = ({deputados, despesas, eventos}) => {

    return (
        <HomeScreen>
            <div style={{ margin: "120px 0" }}>
                <Row>
                    <Col>
                        <Card.Img className='mb-4' style={{ borderRadius: "10px", width: '65%' }} variant="top" src={deputados.ultimoStatus.urlFoto} />
                    </Col>
                    <Col>
                        <Card className='bg-dark text-light' style={{ borderRadius: "10px" }}>
                            <h1 className='mx-3'>{deputados.ultimoStatus.nome}</h1>
                        </Card>
                        <Card className='px-3 pt-2 mb-1'>
                            <p style={{ fontSize: "18pt" }}><strong>Nome Civil: </strong>{deputados.nomeCivil}</p>
                            <p style={{ fontSize: "18pt" }}><strong>Data de Nascimento: </strong>{deputados.dataNascimento}</p>
                            <p style={{ fontSize: "18pt" }}><strong>Município de Nascimento: </strong>{deputados.   municipioNascimento} - {deputados.ufNascimento}</p>
                            <p style={{ fontSize: "18pt" }}><strong>CPF: </strong>{deputados.cpf}</p>
                            <p style={{ fontSize: "18pt" }}><strong>Escolaridade: </strong>{deputados.escolaridade}</p>
                            <p style={{ fontSize: "18pt" }}><strong>Partido: </strong><Link href={'/partidos/' + (deputados.    ultimoStatus.uriPartido.slice(51))}>{deputados.ultimoStatus.siglaPartido}</Link></p>
                            <p style={{ fontSize: "18pt" }}><strong>E-mail: </strong>{deputados.ultimoStatus.email}</p>
                            <p style={{ fontSize: "18pt" }}><strong>Condição Eleitoral: </strong>{deputados.ultimoStatus.   condicaoEleitoral}</p>
                            <p style={{ fontSize: "18pt" }}><strong>Situação: </strong>{deputados.ultimoStatus.situacao}</p>
                        </Card>
                    </Col>
                    <Card className='px-3 pt-2 mb-1'>
                        <h3>Movimentações nos últimos 6 meses</h3>
                        {despesas.map(item => (
                            <Col className='mb-3'>
                                <ul>
                                    <li style={{ margin: '5px', }}><strong>{item.dataDocumento}</strong> - {item.tipoDespesa}</li>
                                    <ul>
                                        <li>{item.nomeFornecedor}</li>
                                        <li><strong>R${item.valorLiquido}</strong></li>
                                    </ul>
                                </ul>
                            </Col>
                        ))}
                    </Card> 
                    <Card className='px-3 pt-2 mt-3'>
                        <h3>Participação em eventos</h3>
                        {eventos.map(item => (
                            <Col className='mb-3'>
                                <ul>
                                    <li style={{ margin: '5px', }}><strong>{item.descricaoTipo}</strong> - {item.situacao}</li>
                                    <ul>
                                        <li>{item.descricao}</li>
                                        <li><strong>Local:</strong> {item.localCamara.nome}</li>
                                        <Link style={{margin: '0 auto'}} className='btn btn-warning ' href={'/eventos/' + item.id }> Ver detalhes </Link>
                                    </ul>
                                </ul>
                            </Col>
                        ))}
                    </Card>      
                </Row>

                <Card style={{border: 'none', marginTop: '10px'}}>
                    <Link style={{margin: '0 auto'}} className='btn btn-warning ' href='/deputados'> VOLTAR PARA DEPUTADOS</Link>
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
    
    const res = await apiDeputados.get('deputados/' + id)
    const deputados = res.data.dados

    const resDespesas = await apiDeputados.get('deputados/' + id + '/despesas?ordem=ASC&ordenarPor=ano')
    const despesas = resDespesas.data.dados

    const resEventos = await apiDeputados.get('deputados/' + id + '/eventos?ordem=ASC&ordenarPor=dataHoraInicio')
    const eventos = resEventos.data.dados
    
    return {
        props: { deputados, despesas, eventos }
    }
}