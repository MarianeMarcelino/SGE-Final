import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function EnviarRecados({ isMenuExpanded }) {
    const [destinatario, setDestinatario] = useState('');
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [enviado, setEnviado] = useState(false);

    const handleDestinatarioChange = (event) => {
        setDestinatario(event.target.value);
    };

    const handleAssuntoChange = (event) => {
        setAssunto(event.target.value);
    };

    const handleMensagemChange = (event) => {
        setMensagem(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await enviarRecado({ destinatario, assunto, mensagem });
            setDestinatario('');
            setAssunto('');
            setMensagem('');
            setEnviado(true);
            console.log("Recado enviado com sucesso!");

            setTimeout(() => {
                setEnviado(false);
            }, 4000);
        } catch (error) {
            alert("Erro ao enviar recado:", error);
        }
    };

    const enviarRecado = async (dadosRecado) => {
        try {
            await axios.post('http://localhost:3001/email/enviar-email', dadosRecado);
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div id="formularioResponsavel" className={isMenuExpanded ? "expanded" : ""}>
            <div class="section-title text-center position-relative pb-3 mx-auto">
                <h3 class="fw-bold text-uppercase">
                    <i class="bi bi-people-fill"> </i>
                    ENVIAR RECADO
                </h3>
            </div>
            <Form onSubmit={handleSubmit} className="form--wrapper w-75">
                <Form.Group className="mb-3">
                    <Form.Label>Destinatário:</Form.Label>
                    <Form.Control type="email" value={destinatario} onChange={handleDestinatarioChange} placeholder="Inserir email do aluno" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Assunto:</Form.Label>
                    <Form.Control type="text" value={assunto} onChange={handleAssuntoChange} placeholder="Descrever assunto..." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mensagem:</Form.Label>
                    <Form.Control as="textarea" rows={3} value={mensagem} onChange={handleMensagemChange} placeholder="Inserir a mensagem..." />
                </Form.Group>
                <div className="text-center">
                    <Button type="submit" variant="primary">Enviar</Button>
                </div>
            </Form>
            <div className="w-75">
                {enviado && (
                    <Alert variant="success" className="mt-3">
                        Recado enviado com sucesso!
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default EnviarRecados;
