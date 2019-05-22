import React, {useState, useEffect,} from 'react';
import {connect} from "react-redux";
import {UnControlled as CodeMirror} from 'react-codemirror2'

require('codemirror/lib/codemirror.css');
require('codemirror/theme/darcula.css');
require('codemirror/mode/python/python.js');

function AzterketaEmaitza(props) {
    const [azterketa, setAzterketa] = useState(null);
    const [kodea, setKodea] = useState('');
    const [show, setShow] = useState(false);


    useEffect(() => {
        const id = Number(props.match.params.id);
        const azt = props.azterketak.filter(azterketa => azterketa.id === id)[0];
        setAzterketa(azt);
        sortuKodea(azt);
    }, []);

    const argumentuaFormat = (arg) => {
        return (
            <tr key={arg.gakoa}>
                <td>{arg.gakoa}</td>
                <td>{arg.balioa || 'None'}</td>
            </tr>
        );

    };
    const pausuaFormat = (pausua, index) => {
        return (<div key={index}>
            <h3 className="text-center">{index + 1}. pausua - <b>{pausua.izena}</b></h3>
            <br/>
            <table className="table table-borderless">
                <thead>
                <tr>
                    <th>Gakoa</th>
                    <th>Balioa</th>
                </tr>
                </thead>
                <tbody>
                {pausua.argumentuak.map(arg => argumentuaFormat(arg))}
                </tbody>

            </table>
        </div>)
    };

    const sortuKodea = (azterketa) => {

        const imports = azterketa.pausuak.map(pausua => {
                return `from ${pausua.modulua} import ${pausua.izena}`;
            }
        );
        const estimators = azterketa.pausuak.map(pausua => {
            return ` ("${pausua.izena}", ${pausua.izena}(${pausua.argumentuak.map(arg => {

                return ` ${arg.gakoa}=${arg.balioa || 'None'}`;
            })}))`

        });
        console.log(estimators)

        const code_text =
`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
${imports.join('\n')}

class_name = 'target'
data = pd.read_csv('PATH_TO_CSV')
target = data[class_name]
features = data.drop(class_name, axis=1)
X_train, X_test, y_train, y_test = train_test_split(features, target, train_size=${azterketa.train_test_ratio})
pipeline = Pipeline([${estimators.toString()}])
pipeline.fit(X_train, y_train)
print(pipeline.score(X_test, y_test))
        `;


        const code = (
            <CodeMirror
                value={code_text}
                options={{
                    mode: 'python', theme: 'darcula', lineNumbers: true,
                }}
                onChange={(editor, data, value) => {
                }}
            />
        );

        setKodea(code);

    };


    if (azterketa === null) {
        return <h3 className="text-center">Ez da azterketarik aurkitu...</h3>;
    }

    const proiektua = props.proiektuak.filter(p => p.id === azterketa.proiektua)[0];
    const styles = show ? {display: "block"} : {display: "none"};

    return (
        <div className="container">
            <br/>
            <h2><b>{azterketa.izena}</b> azterketa ({proiektua.izena})</h2>
            <button className='btn btn-primary btn-md float-right' onClick={e => setShow(true)}>Sortu kodea</button>
            <h4>Ondorengoa da %{azterketa.emaitza * 100}-ko emaitza lortu duen pipelinea:</h4>
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    {azterketa.pausuak.map((pausua, index) => pausuaFormat(pausua, index))}
                </div>
            </div>
            <div className={`modal fade ${show ? 'show' : ''}`} id="exampleModal" role="dialog" style={styles}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Kodea</h5>
                            <button type="button" className="close" onClick={e => setShow(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {kodea}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={e => setShow(false)}>Itxi
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );


}

const mapStateToProps = state => ({
    azterketak: state.azterketa.azterketak,
    proiektuak: state.proiektuak.proiektuak


});


export default connect(mapStateToProps)(AzterketaEmaitza);
