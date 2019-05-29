import React from 'react';

function Laburpena(props) {

    let tseriesConf = <></>;

    const {prevStep, gordeSaiakera, values} = props;
    const {
        nJobsTPOT, population, generations, cv,
        proiektua, modelRatio, nJobsTSeries, chunkSize,
        ataza, datu, izena
    } = values;
    if (datu.label === "Denbora segida") {

        tseriesConf = (<>
            <h3>Denbora segida konfigurazioa</h3>

            <div className="form-group">
                <h4>Model ratio: <strong>{modelRatio}</strong></h4>

                <h4>Number of jobs: <strong>{nJobsTSeries}</strong></h4>
                <h4>Chunk size: <strong>{chunkSize}</strong></h4>

            </div>
            <hr/>
        </>)
    }

    return (
        <>
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">

                    <h2 className="text-center"><b>{izena}</b> ({proiektua.label})</h2>

                    <div className="form-group">
                        <h4>Ataza-mota: <strong>{ataza.label}</strong></h4>
                        <h4>Datu-mota: <strong>{datu.label}</strong></h4>


                    </div>
                    <hr/>
                    {tseriesConf}

                    <h3>TPOT konfigurazioa</h3> <br/>
                    <div className="form-group">

                        <h4>Populazioa: <strong>{population}</strong></h4>

                        <h4>Generazio kopurua: <strong>{generations}</strong></h4>
                        <h4>Cross validation folds: <strong>{cv}</strong></h4>
                        <h4>Number of jobs: <strong>{nJobsTPOT}</strong></h4>

                    </div>


                </div>
            </div>
            <button className="btn btn-danger  mr-2" onClick={prevStep}>Aurrekoa</button>

            <button className="btn btn-success" onClick={gordeSaiakera}>Gorde</button>
        </>


    );

}

export default Laburpena;
