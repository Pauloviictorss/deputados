import HomeScreen from '@/components/HomeScreen'
import Link from 'next/link'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import apiDeputados from '../services/apiDeputados'

const Detalhes = ({proposicoes, relacionadas}) => {

    return (
        <HomeScreen>
            <div style={{ margin: "120px 0" }}>
                <h1 className='mx-3'>{proposicoes.siglaTipo} {proposicoes.numero}, ano {proposicoes.ano}</h1>
                <Card className='bg-dark text-light' style={{ borderRadius: "10px" }}>
                    <h3 className='mx-3'>Descrição da proposição</h3>
                </Card>
                <Card className='mt-2 pt-2'>
                    <p className='mx-3'><strong>Ementa: </strong>{proposicoes.ementa}</p>
                    <p className='mx-3'><strong>Apreciação: </strong>{proposicoes.statusProposicao.apreciacao}</p>
                    <p className='mx-3'><strong>Data de apresencação: </strong>{proposicoes.dataApresentacao.slice(8,10)}/{proposicoes.dataApresentacao.slice(5,7)}/{proposicoes.dataApresentacao.slice(0,4)}</p>
                    <p className='mx-3'><strong>Situação:</strong>{proposicoes.statusProposicao.descricaoSituacao}</p>
                    <p className='mx-3'><strong>Tipo: </strong>{proposicoes.descricaoTipo}</p>
                </Card>

                <Row>
                    <Col>
                        <Card className='p-2 my-4 bg-light'>
                            <Card className='bg-dark text-light'>
                            <h4 className='mx-2'>Proposições relacionadas</h4>
                            </Card>
                                <Row className='p-2'>
                                {relacionadas.slice(0,4).map(item => (
                                    <Col>
                                        <Card className='bg-light my-2 p-2'>
                                            <h5><Link className="btn btn-warning w-100" href={'/proposicoes/' + item.id}>{item.siglaTipo} {item.numero}</Link></h5>
                                            <p><strong>Ano: </strong>{item.ano}</p>
                                            <p><strong>Ementa: </strong>{item.ementa.slice(0,50)}...</p>
                                        </Card>
                                    </Col>
                                ))}
                                </Row>
                                <Link href={'/proposicoes?pagina=1&itens=10000&ordem=DESC&ordenarPor=ano'} className='btn btn-warning'>Ver mais</Link>
                        </Card>
                    </Col>
                </Row>     

                <Card style={{border: 'none', marginTop: '10px'}}>
                    <Link style={{margin: '0 auto'}} className='btn btn-warning ' href='/proposicoes'> VOLTAR PARA PROPOSIÇÕES</Link>
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
    
    const res = await apiDeputados.get('proposicoes/' + id)
    const proposicoes = res.data.dados

    const resRelacionadas = await apiDeputados.get('proposicoes/' + id + '/relacionadas')
    const relacionadas = resRelacionadas.data.dados
    
    return {
        props: { proposicoes, relacionadas }
    }
}