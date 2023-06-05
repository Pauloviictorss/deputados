import HomeScreen from '@/components/HomeScreen'
import Carousel from '@/components/Carousels';
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Overlay, Row } from 'react-bootstrap'
import { BsQuestionCircle } from "react-icons/bs";
import apiDeputados from '../services/apiDeputados'

const index = () => {

    const [partidos, setPartidos] = useState([])
    const [deputados, setDeputados] = useState([])
    const [eventos, setEventos] = useState([])
    const [proposicoes, setProposicoes] = useState([])
    const [blocos, setBlocos] = useState([])
    const [show1, setShow1] = useState(false);
    const target1 = useRef(null);
    const [show2, setShow2] = useState(false);
    const target2 = useRef(null);

    useEffect(() => {
        apiDeputados.get('partidos/').then(resultado => {
            setPartidos(resultado.data.dados.sort(() => Math.random() - 0.5))
        })
        apiDeputados.get('deputados/').then(resultado => {
            setDeputados(resultado.data.dados.sort(() => Math.random() - 0.5))
        })
        apiDeputados.get('eventos/').then(resultado => {
            setEventos(resultado.data.dados.sort(() => Math.random() - 0.5))
        })
        apiDeputados.get('proposicoes/').then(resultado => {
            setProposicoes(resultado.data.dados.sort(() => Math.random() - 0.5))
        })
        apiDeputados.get('blocos/').then(resultado => {
            setBlocos(resultado.data.dados)
        })
    }, [])

    return (
        <HomeScreen>
            <Container>
                <Carousel/>
                <Row>
                    <Col>
                        <Card className='p-2 mb-4 bg-light'>
                            <Card className='bg-dark text-light align-items-center'>
                                <h4>Eventos realizados</h4>
                            </Card>
                            <Row className='p-2'>
                            {eventos.slice(0,4).map(item => (
                                <Col>
                                    <Card className='bg-light my-2 p-2'>
                                        <h5><Link className="btn btn-warning w-100" href={'/eventos/' + item.id}>{item.descricaoTipo.slice(0,20)}</Link></h5>
                                        <p>Situação: {item.situacao}</p>
                                        <p>{item.descricao.slice(0,50)}...</p>
                                    </Card>
                                </Col>
                            ))}
                            </Row>
                            <Link href='/eventos?pagina=1&itens=10000' className='btn btn-warning'>Ver mais</Link>
                        </Card>
                    </Col>
                </Row>

                <Row className='mb-4'>
                    <Col>
                        <Card className='p-2 bg-light'>
                            <Card className='bg-dark text-light align-items-center'>
                                <h4>Partidos</h4>
                            </Card>
                            <InputGroup className="mt-4 mb-2">
                                <Form.Control
                                placeholder="Digite a sigla do partido desejado..."
                                aria-label="Digite a sigla do partido desejado..."
                                aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-dark" id="button-addon2">
                                Pesquisar
                                </Button>
                            </InputGroup>
                            
                            <Row xs={1} sm={3} md={3} lg={3} xl={3} className='p-2'>
                                {partidos.slice(0,6).map(item => (
                                    <Col >
                                        <Card className='bg-light align-items-center my-2'>
                                            <h5><Link className="btn btn-light w-100" href={'/partidos/' + item.id}>{item.sigla}</Link></h5>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <Link href='/partidos' className='btn btn-warning'>Ver todos os Partidos</Link>
                        </Card>
                    </Col>
                    
                    <Col>
                        <Card className='p-2 bg-light'>
                            <Card className='bg-dark text-light align-items-center'>
                                <h4>Deputados</h4>
                            </Card>
                            <InputGroup className="mt-4 mb-2">
                                <Form.Control
                                placeholder="Digite o nome do deputado desejado..."
                                aria-label="Digite o nome do deputado desejado..."
                                aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-dark" id="button-addon2">
                                Pesquisar
                                </Button>
                            </InputGroup>
                                <Row xs={1} sm={3} md={3} lg={3} xl={3} className='p-2'>
                                    {deputados.slice(0,6).map(item => (
                                        <Col >
                                            <Card className='bg-light align-items-center my-2'>
                                                <h5><Link className="btn btn-light w-100" href={'/deputados/' + item.id}>{item.nome.slice(0,12)}...</Link></h5>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            <Link href='/deputados' className='btn btn-warning'>Ver todos os Deputados</Link>
                        </Card>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Card className='p-2 bg-light'>
                            <Card style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px'}} className='bg-dark text-light align-items-center'>
                                <h4 style={{margin: 2}}>Blocos Partidários</h4>
                                <Button style={{ height: '20px', display: 'flex', alignItems: 'center'}} variant="warning" ref={target1} onClick={() => setShow1(!show1)}>
                                    <BsQuestionCircle/>
                                </Button>
                                <Overlay target={target1.current} show={show1} placement="right">
                                    {({
                                        placement: _placement,
                                        arrowProps: _arrowProps,
                                        show: _show,
                                        popper: _popper,
                                        hasDoneInitialMeasure: _hasDoneInitialMeasure,
                                        ...props
                                    }) => (
                                        <div
                                        {...props}
                                        style={{
                                            position: 'absolute',
                                            backgroundColor: '#ffc720',
                                            padding: '10px 10px',
                                            color: 'black',
                                            borderRadius: 3,
                                            border: '1px solid black',
                                            width: '25%',
                                            ...props.style,
                                        }}>
                                                <p>Um bloco partidário é um conjunto de partidos que decidem trabalhar juntos, como se fossem um único "partidão". Eles possuem um só líder e um mesmo conjunto de vice-líderes.</p> 
                                                <p>Os blocos só podem existir até o fim da legislatura em que foram criados: na legislatura seguinte, os mesmos partidos, se associados, formam um novo bloco.</p>
                                        </div>
                                    )}
                                </Overlay>
                            </Card>
                            <Row className='p-3'>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ width: '85%', margin: '0 auto' }}>
                                        {blocos.map(item => (
                                            <Col>
                                                <Card className='bg-light my-2 p-2'>
                                                    <p>{item.nome}</p>
                                                </Card>
                                            </Col>
                                        ))}
                                    </div>
                                </div>                           
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card className='p-2 mt-4 bg-light'>
                            <Card style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px'}} className='bg-dark text-light align-items-center'>
                                <h4>Proposições na Câmara</h4>
                                <Button style={{ height: '20px', display: 'flex', alignItems: 'center'}} variant="warning" ref={target2} onClick={() => setShow2(!show2)}>
                                    <BsQuestionCircle/>
                                </Button>
                                <Overlay target={target2.current} show={show2} placement="right">
                                    {({
                                        placement: _placement,
                                        arrowProps: _arrowProps,
                                        show: _show,
                                        popper: _popper,
                                        hasDoneInitialMeasure: _hasDoneInitialMeasure,
                                        ...props
                                    }) => (
                                        <div
                                        {...props}
                                        style={{
                                            position: 'absolute',
                                            backgroundColor: '#ffc720',
                                            padding: '10px 10px',
                                            color: 'black',
                                            borderRadius: 3,
                                            border: '1px solid black',
                                            width: '25%',
                                            ...props.style,
                                        }}> 
                                                <p>Trata-se de uma lista com informações básicas que englobam projetos de lei, resoluções, medidas provisórias, emendas, pareceres e todos os outros tipos de proposições na Câmara.</p>
                                        </div>
                                    )}
                                </Overlay>
                            </Card>
                            <Row className='p-2'>
                                {proposicoes.slice(0,4).map(item => (
                                    <Col>
                                        <Card className='bg-light my-2 p-2'>
                                            <h5><Link className="btn btn-warning w-100" href={'/proposicoes/' + item.id}>{item.siglaTipo} {item.numero}</Link></h5>
                                            <p>Ano: {item.ano}</p>
                                            <p>{item.ementa.slice(0,50)}...</p>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                            <Link href='/proposicoes' className='btn btn-warning'>Ver mais</Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </HomeScreen>
    )
}

export default index