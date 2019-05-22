import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {gehituFitxategiak} from "../../actions/fitxategiak";
import {gehituTargeta} from "../../actions/proiektuak";

class FormFile extends Component{

    state = {
        show: false,
        fitxategiak: [],
        targets: ['----',],
        selectedTarget: '----'

    };
    static propTypes = {
        gehituFitxategiak: PropTypes.func.isRequired,
        gehituTargeta: PropTypes.func.isRequired,


    };
    handleFile = e => {
        let res = reader.result;
        this.setState({targets: res.split('\n')[0].split(',')});

    }

    onChangeFile = e => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            let res = reader.result;
            let targets = res.split('\n')[0].split(',');
            this.setState({targets: targets, selectedTarget: targets[0]});

        }
        reader.readAsText(file);

        this.setState({fitxategiak: e.target.files});

    }
    onChangeSelect = e => {
        this.setState({selectedTarget: e.target.value});

    }

    onSubmit = e => {
        e.preventDefault();
        const {fitxategiak, selectedTarget, targets} = this.state;

        this.props.gehituFitxategiak(fitxategiak);

        this.props.gehituTargeta(targets, selectedTarget);


        this.setState({
            fitxategiak: [],
            targets: ['----',],
            selectedTarget: '----'
        });
        this.handleClose();


    };


    handleClose = e => {
        this.setState({show: false});
    }

    handleShow = e => {
        this.setState({show: true});
    }


    render() {
        const {show, targets, selectedTarget} = this.state;
        let styles = show ? {display: "block"} : {display: "none"};
        return (
            <div className='container'>
                <br/><br/>

                <div className={`modal fade ${show ? 'show' : ''}`} id="exampleModal" role="dialog" style={styles}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Gehitu fitxategia</h5>
                                <button type="button" className="close" onClick={this.handleClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                    <div className="form-group">
                                        <label>Izena</label>
                                        <input type="file" accept=".csv" onChange={this.onChangeFile} multiple/>

                                    </div>
                                    <div className="form-group">
                                        <label>Targeta</label>
                                        <select id="target" name="target" onChange={this.onChangeSelect}
                                                value={selectedTarget}>
                                            {targets.map((target) => {
                                                return (<option value={target} key={target}>{target}</option>);
                                            })}

                                        </select>
                                    </div>

                                    <div className="form-group">

                                        <button className="btn btn-primary btn-md" onSubmit={this.onSubmit}>Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Itxi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='btn btn-primary btn-md float-right' onClick={this.handleShow}>
                        Gehitu fitxategia
                    </button>
                </div>


            </div>

        );
    }


}


export default connect(null, {gehituFitxategiak, gehituTargeta})(FormFile);
