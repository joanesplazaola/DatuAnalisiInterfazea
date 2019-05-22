import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {jasoAzterketak, hasiAzterketa, aldatuAzterketa, ezabatuAzterketa} from '../../actions/azterketa'
import Azterketa from "./Azterketa";
import {withRouter} from 'react-router-dom';


function Azterketak(props) {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        props.jasoAzterketak();
        const loc = window.location;
        let wsStart = 'ws://';
        if (loc.protocol === 'https:') wsStart = 'wss://';
        const socket_ = new WebSocket(`${wsStart}${loc.host}/ws/azterketak/${props.token}/`);

        socket_.onmessage = e => {
            props.aldatuAzterketa(e.data);
        };
        setSocket(socket_);

        return () => {
            socket_.close()
        }


    }, []);

    const badge_class = {'HASI_GABE': 'info', 'ZAIN': 'warning', 'EXEKUTATZEN': 'primary', 'AMAITUTA': 'success'};


    return (
        <><br/>
            <h2>Azterketa konfigurazioak</h2>
            <br/>
            {props.azterketak.length === 0 ? <h4>Ez dago azterketarik</h4> : <></>}

            {props.azterketak.map(azterketa => {


                const proiektua = props.proiektuak.filter(p => p.id === azterketa.proiektua)[0];


                return <Azterketa key={azterketa.id}
                                  azterketa={azterketa}
                                  ezabatuAzterketa={props.ezabatuAzterketa}
                                  hasiAzterketa={props.hasiAzterketa}
                                  socket={socket}
                                  badge={badge_class}
                                  proiektua={proiektua}
                                  history={props.history}
                />;


            })}


        </>
    );


}

const mapStateToProps = state => ({

    azterketak: state.azterketa.azterketak,
    token: state.auth.token,
    proiektuak: state.proiektuak.proiektuak
});

export default withRouter(connect(mapStateToProps, {jasoAzterketak, hasiAzterketa, aldatuAzterketa, ezabatuAzterketa})(Azterketak));
