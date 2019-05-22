import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {jasoAtazaMotak, jasoDatuMotak, gehituAzterketa} from "../../actions/azterketa";
import {jasoProiektuak} from "../../actions/proiektuak";
import FormTpot from "./FormTPOT";
import FormTSeries from "./FormTSeries";
import FormAzterketaProiektua from "./FormAzterketaProiektua";
import FormAtazaMota from "./FormAtazaMota";
import Laburpena from "./Laburpena";
import {withRouter} from "react-router-dom";


const steps = {
    1: {izena: 'Proiektua', tsOnly: false},
    2: {izena: 'Ataza mota', tsOnly: false},
    3: {izena: 'Time Series konfigurazioa', tsOnly: true},
    4: {izena: 'TPOT konfigurazioa', tsOnly: false},
    5: {izena: 'Laburpena', tsOnly: false}
};


function AzterketaForm(props) {
    const [step, setStep] = useState(1);
    const [proiektua, setProiektua] = useState({label: '', value: -1});
    const [trainToTest, setTrainToTest] = useState(0.7);
    const [ataza, setAtaza] = useState({label: '', value: -1});
    const [datu, setDatu] = useState({label: '', value: -1});
    const [generations, setGenerations] = useState(100);
    const [population, setPopulation] = useState(100);
    const [cv, setCV] = useState(5);
    const [nJobsTPOT, setNJobsTPOT] = useState(-1);
    const [modelRatio, setModelRatio] = useState(0.01);
    const [nJobsTSeries, setNJobsTSeries] = useState(-1);
    const [chunkSize, setChunkSize] = useState(0.1);
    const [izena, setIzena] = useState('');

    useEffect(() => {
        if (props.proiektuak.length === 0) props.jasoProiektuak();
        if (props.atazaMotak.length === 0) props.jasoAtazaMotak();
        if (props.datuMotak.length === 0) props.jasoDatuMotak();

    }, [])


    function nextStep() {
        let forward = 1;
        if (datu.label === "Ez denbora segida" && step === 2) forward++;
        setStep(step + forward);
    }

    function prevStep() {
        let backward = 1;
        if (datu.label === "Ez denbora segida" && step === 4) backward++;
        setStep(step - backward);

    }

    function gordeSaiakera() {

        const tpot_config = {generations, population, cv, n_jobs: nJobsTPOT}
        let tseries_config = null;
        if (datu.label === 'Denbora segida') {
            tseries_config = {model_ratio: modelRatio, n_jobs: nJobsTSeries, chunk_size: chunkSize}
        }

        const azterketa = {
            trainToTest, proiektua: proiektua.value, ataza_mota: ataza.value, datu_mota: datu.value,
            tpot_config, tseries_config, izena
        };

        props.gehituAzterketa(azterketa);
        props.history.push('/');
    }


    const getRenderByStep = (step) => {

        switch (step) {

            case 1:

                return (
                    <FormAzterketaProiektua
                        nextStep={nextStep}
                        setters={{setProiektua, setTrainToTest, setIzena}}
                        proiektuak={props.proiektuak}
                        values={{proiektua, trainToTest, izena}}/>
                )


            case 2:

                return (
                    <FormAtazaMota
                        atazaMotak={props.atazaMotak}
                        datuMotak={props.datuMotak}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        values={{ataza, datu}}
                        setters={{setAtaza, setDatu}}
                    />
                )


            case 3:

                return (
                    <FormTSeries
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setters={{setModelRatio, setNJobsTSeries, setChunkSize}}
                        values={{modelRatio, nJobsTSeries, chunkSize}}/>
                )

            case 4:
                return (
                    <FormTpot
                        nextStep={nextStep}
                        prevStep={prevStep}
                        setters={{setNJobsTPOT, setPopulation, setGenerations, setCV}}
                        values={{nJobsTPOT, population, generations, cv}}
                    />
                )
            case 5:
                const values = {
                    nJobsTPOT, population, generations, cv,
                    proiektua,
                    modelRatio, nJobsTSeries, chunkSize,
                    ataza, datu, izena
                };
                return (
                    <Laburpena
                        gordeSaiakera={gordeSaiakera}
                        prevStep={prevStep}
                        values={values}
                    />);
            default:
                return <></>

        }


    }


    return (
        <div className="container">
            <br/><br/>
            <h2>Azterketa - {steps[step].izena}</h2>
            <hr/>
            {getRenderByStep(step)}

        </div>
    )

}


const mapStateToProps = state => ({
        atazaMotak: state.azterketa.atazaMotak,
        datuMotak: state.azterketa.datuMotak,
        proiektuak: state.proiektuak.proiektuak,
    }
)


export default withRouter(connect(mapStateToProps, {
    jasoAtazaMotak,
    jasoDatuMotak,
    jasoProiektuak,
    gehituAzterketa
})(AzterketaForm));
