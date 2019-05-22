import React from 'react';


function Azterketa(props) {

    const {azterketa, socket, hasiAzterketa, ezabatuAzterketa, badge, proiektua, history} = props;
    const {id, egoera, portzentaia, emaitza, izena} = azterketa;
    const botoia = (() => {
        switch (egoera) {
            case 'HASI_GABE':
                return (
                    <button className="btn btn-primary" onClick={e => hasiAzterketa(id, socket)}> Abiarazi </button>);
            case 'AMAITUTA':
                return (
                    <button className="btn btn-info" onClick={e => history.push(`emaitza/${id}`)}> Ikusi emaitza </button>);
                break;
            default:
                return (
                    <button className="btn btn-info" disabled onClick={event => console.log(event)}> Ikusi
                        emaitza </button>);
        }
    })();
    return (
        <div className="border-bottom" key={id}>
            <div className="row mt-3 mb-3">
                <div className="col-md-5">
                    <b>Id:</b> {id} <br/>
                    <b>Izena:</b> {izena} {' '} <br/>
                    <b>Proiektua:</b> {proiektua.izena} {' '} <br/>
                    <b>Egoera:</b> {' '} <span className={`badge badge-${badge[egoera]}`}>{egoera}</span> {' '} <br/>
                    <b>Emaitza:</b> {emaitza *100} {'% '} <br/>

                </div>
                <div className="col-md-4 mt-2">
                    <div className='progress'>
                        <div
                            className={`progress-bar progress-bar-striped ${portzentaia === 100 ? 'bg-success' : ''}`}
                            role='progressbar'
                            aria-valuenow={portzentaia}
                            aria-valuemin='0'
                            aria-valuemax='100'
                            color='success'
                            style={{width: `${portzentaia}%`}}>{portzentaia}%
                        </div>
                    </div>
                </div>
                <div className="col-md-1">
                    <button className="btn btn-danger" onClick={e => ezabatuAzterketa(id)}>Ezabatu</button>
                </div>
                <div className="col-md-2">
                    {botoia}
                </div>
            </div>
        </div>

    )


}

export default Azterketa;
