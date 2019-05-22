import React, {useState} from 'react';
import {connect} from 'react-redux';
import {gehituProiektua} from "../../actions/proiektuak";

function FormProiektua(props) {
    const [show, setShow] = useState(false);
    const [izena, setIzena] = useState('');
    const [target, setTarget] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        props.gehituProiektua({izena, target});
        setIzena('');
        setTarget('');
        setShow(false);
    };


    const styles = show ? {display: "block"} : {display: "none"};
    return (
        <div className='container'>
            <br/><br/>
            <div className={`modal fade ${show ? 'show' : ''}`} id="exampleModal" role="dialog" style={styles}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Gehitu proiektua</h5>
                            <button type="button" className="close" onClick={e => setShow(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Izena</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="izena"
                                        onChange={e => setIzena(e.target.value)}
                                        value={izena}
                                    />

                                </div>

                                <div className="form-group">

                                    <button className="btn btn-primary btn-md" onSubmit={onSubmit}>Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={e => setShow(false)}>Itxi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button className='btn btn-primary btn-md float-right' onClick={e => setShow(true)}>
                    Gehitu proiektua
                </button>
            </div>


        </div>

    );

}


export default connect(null, {gehituProiektua})(FormProiektua);
