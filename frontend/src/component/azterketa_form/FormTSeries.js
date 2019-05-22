import React from 'react';

function FormTSeries(props) {


    const {values, setters} = props;
    const {modelRatio, nJobsTSeries, chunkSize} = values;
    const {setModelRatio, setNJobsTSeries, setChunkSize} = setters;
    return (
        <>

            <div className="form-group">
                <label> Model ratio: </label>

                <input className='form-control' type="number" step='0.01' max='1.0' min='0.01'
                       onChange={e => setModelRatio(e.target.value)}
                       value={modelRatio}
                       name="modelRatio"/>
                <small className="form-text text-muted">
                    Modelatzeko erabili beharreko datuen portzentaia. Zenbat eta altuagoa, orduan eta motelagoa,
                    baina era berean modeloaren errepresentagarritasuna ere hobea.
                </small>
            </div>

            <div className="form-group">

                <label>
                    Chunk size:</label>
                <input className='form-control' type="number" step='0.1' value={chunkSize}
                       onChange={e => setChunkSize(e.target.value)}
                       name="chunkSize"/>

            </div>

            <div className="form-group">

                <label>
                    Number of jobs:</label>
                <input className='form-control' type="number" value={nJobsTSeries}
                       onChange={e => setNJobsTSeries(e.target.value)}/>
                <small className="form-text text-muted"> Prozesurako erabiliko den prozesatzaile kopurua.</small>

            </div>

            <button className="btn btn-danger  mr-2" onClick={props.prevStep}>Aurrekoa</button>

            <button className="btn btn-success" onClick={props.nextStep}>Hurrengoa</button>

        </>
    );
}

export default FormTSeries;
