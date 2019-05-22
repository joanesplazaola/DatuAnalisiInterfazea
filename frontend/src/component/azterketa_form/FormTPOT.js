import React from 'react';


function FormTpot(props) {


    const {values, setters, nextStep, prevStep} = props;

    const {generations, population, cv, nJobsTPOT} = values;
    const {setGenerations, setPopulation, setCV, setNJobsTPOT} = setters;

    return (
        <>

            <form method="" action="">
                <div className="form-group">
                    <label> Generazioak: </label>

                    <input className='form-control' type="number" min="1" value={generations}
                           onChange={event => setGenerations(event.target.value)}/>
                </div>
                <div className="form-group">

                    <label> Populazioa:</label>
                    <input className='form-control' type="number" min="1" value={population}
                           onChange={event => setPopulation(event.target.value)}/>
                </div>

                <div className="form-group">

                    <label>
                        Cross validation folds:</label>
                    <input className='form-control' type="number" min="1" value={cv}
                           onChange={event => setCV(event.target.value)}/>
                </div>
                <div className="form-group">

                    <label>
                        Number of jobs:</label>
                    <input className='form-control' type="number" value={nJobsTPOT}
                           onChange={event => setNJobsTPOT(event.target.value)}/>
                    <small className="form-text text-muted"> Prozesurako erabiliko den prozesatzaile kopurua.</small>

                </div>
                <button className="btn btn-danger mr-2" onClick={prevStep}>Aurrekoa</button>

                <button className="btn btn-success" onClick={nextStep}>Hurrengoa</button>
            </form>

        </>
    );
}

export default FormTpot;
