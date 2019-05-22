import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {jasoProiektuak, ezabatuProiektua} from "../../actions/proiektuak";
import {withRouter} from 'react-router-dom';

function Proiektuak(props) {

    useEffect(() => {
        if (props.proiektuak.length === 0) props.jasoProiektuak();

    }, []);


    const jasoProiektuTaula = () => {

        const proiektuLerroak = props.proiektuak.map((proiektua) => {
            return (
                <tr key={proiektua.id}>
                    <td>{proiektua.id}</td>
                    <td>{proiektua.izena}</td>
                    <td>{proiektua.target}</td>
                    <td>
                        <button className="btn btn-danger btn-sm"
                                onClick={e => props.ezabatuProiektua(proiektua.id)}>Ezabatu
                        </button>
                    </td>
                    <td>
                        <button className="btn btn-primary btn-sm"
                                onClick={e => props.history.push(`${proiektua.id}`)}>Konfigurazioa
                        </button>
                    </td>

                </tr>

            )
        });


        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Izena</th>
                    <th>Target</th>
                    <th/>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {proiektuLerroak}
                </tbody>
            </table>
        );


    };


    return (
        <>
            <h2>Proiektuak</h2>
            {jasoProiektuTaula()}
        </>
    );

}

// Get the proiektuak object from the proiektuak reducer

const mapStateToProps = state => ({
    proiektuak: state.proiektuak.proiektuak
});

export default withRouter(connect(mapStateToProps, {jasoProiektuak, ezabatuProiektua})(Proiektuak));
