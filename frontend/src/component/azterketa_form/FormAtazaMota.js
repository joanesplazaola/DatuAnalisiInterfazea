import React, {useEffect} from 'react';
import Select from "react-select";

function FormAtazaMota(props) {


    const {atazaMotak, datuMotak, values, setters, prevStep, nextStep} = props;
    const {ataza, datu} = values;
    const {setAtaza, setDatu} = setters;
    const optionsDatu = datuMotak.map(dm => ({value: dm.id, label: dm.izena}));
    const optionsAtaza = atazaMotak.map(am => ({value: am.id, label: am.izena}));


    useEffect(() => {

        if (ataza.value === -1 && atazaMotak.length !== 0) {
            setAtaza({label: atazaMotak[0].izena, value: atazaMotak[0].id});
        }
        if (datu.value === -1 && datuMotak.length !== 0) {
            setDatu({label: datuMotak[0].izena, value: datuMotak[0].id})
        }


    }, [atazaMotak, datuMotak])

    return (<>

            <div className="form-group">
                <label>Ataza mota</label>
                <Select options={optionsAtaza}
                        value={ataza}
                        isSearchable={false}
                        onChange={selected => setAtaza(selected)}

                />
            </div>
            <div className="form-group">
                <label>Datu mota</label>

                <Select
                    options={optionsDatu}
                    isSearchable={false}
                    onChange={selected => setDatu(selected)}
                    value={datu}
                />
            </div>

            <div className="form-group">
                <button className="btn btn-danger mr-1" onClick={prevStep}>
                    Aurrekoa
                </button>
                <button className="btn btn-success" onClick={nextStep}>
                    Hurrengoa
                </button>
            </div>
        </>
    );

}

export default FormAtazaMota;
