import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import MiCarrito from './MiCarrito';
import { NavLink } from 'react-router-dom';
import { buscarComida } from '../../../helpers/queries';

const Carrito = () => {

    const [pedidos, setPedidos] = useState("")
    const [spinner, setSpinner] = useState(false)
    const [carga, setCarga] = useState(false)
    const ActivarCarga = () => { setCarga(true) }

    function filtrarYContarRepetidos(array) {
        // Creamos un objeto para llevar un registro de cuántas veces aparece cada objeto
        const contador = {};
        
        // Iteramos sobre el array para contar la cantidad de cada objeto
        array.forEach(objeto => {
            const clave = JSON.stringify(objeto); // Convertimos el objeto a una cadena JSON para usarlo como clave
            contador[clave] = (contador[clave] || 0) + 1; // Incrementamos el contador para esta clave
        });
        
        // Filtramos los objetos repetidos y creamos un nuevo array con el campo 'cantidad'
        const resultados = Object.keys(contador).map(clave => {
            const objeto = JSON.parse(clave); // Convertimos la clave de vuelta a un objeto
            return { ...objeto, cantidad: contador[clave] };
        });
        setSpinner(true)
        return resultados;
    }
    useEffect(() => {
        const pedidos = JSON.parse(localStorage.getItem("pedido") || "[]");
        pedidos.length>1?(ActivarCarga(),setPedidos(filtrarYContarRepetidos(pedidos))):<></>;
        //console.log(filtrarYContarRepetidos(pedidos));
    }, []);
    return (
        <Container>
            <h1>Carrito de compras</h1>
            {carga ?
                (<>
                    {spinner ?
                        (<>
                            <Table responsive striped bordered hover className="text-center">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pedidos.map((item, index) => (
                                            <MiCarrito key={index} item={item} />
                                        ))
                                    }
                                </tbody>
                            </Table>
                            <NavLink className='btn btn-primary' to={"/RealizarPedido"}>Realizar pedido</NavLink>
                        </>) :
                        (<Container className='d-flex justify-content-center my-5'>
                            Cargando<Spinner variant='primary' className='ms-3' />
                        </Container>)
                    }
                </>) :
                <h2>Vaya! Parece que aún no te has decidido... De cualquier forma, aqui estaremos para usted.</h2>
            }
        </Container >
    );
};

export default Carrito;