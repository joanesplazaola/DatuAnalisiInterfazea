import React, {useEffect} from 'react';
import Select from "react-select";

function FormAzterketaProiektua(props) {


    const {values, proiektuak, setters, nextStep} = props;
    const {proiektua, trainToTest, izena} = values;
    const {setProiektua, setTrainToTest, setIzena} = setters;

    useEffect(() => {
        if (proiektua.value === -1 && proiektuak.length !== 0) {
            setProiektua({value: proiektuak[0].id, label: proiektuak[0].izena})
        }
    }, [proiektuak]);


    return (
        <>

            <div className="form-group">
                <label>Azterketa izena: </label>
                <input className='form-control' type="text" value={izena} onChange={e => setIzena(e.target.value)}/>


                <label>Proiektua</label>

                <Select options={proiektuak.map(dm => ({value: dm.id, label: dm.izena}))}
                        onChange={selected => setProiektua(selected)}
                        value={proiektua}

                />
                <label>Ikasketa/Testatze datu ratioa: </label>

                <input className='form-control' type="number" min="0.1" step="0.05" max="1" value={trainToTest}
                       onChange={event => setTrainToTest(event.target.value)}/>

            </div>

            <button className="btn btn-success" onClick={nextStep}> Hurrengoa</button>
        </>
    );

}

export default FormAzterketaProiektua;
