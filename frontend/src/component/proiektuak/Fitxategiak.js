import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {jasoFitxategiak, ezabatuFitxategiak} from "../../actions/fitxategiak";
import PropTypes from "prop-types";
import FormFile from "./FormFile";

class Fitxategiak extends Component {

    state = {
        proiektua: null,
        id: null,

    };

    static proptypes = {
        proiektuak: PropTypes.array.isRequired,
        jasoFitxategiak: PropTypes.func.isRequired,
        ezabatuFitxategiak: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        this.setState({id: id});
        this.props.jasoFitxategiak(id);

    }


    render() {
        const proiektua = this.props.proiektuak.filter(proiektua => proiektua.id === this.state.id)[0];

        if (proiektua === null || proiektua === undefined) {
            return <h1>Loading...</h1>;
        }

        return (
            <div>

                <br/>
                <div className='container'>
                    <h2 className='float-left'>{proiektua.izena}</h2>
                    <FormFile/>

                </div>
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Izena</th>
                        <th>Tamaina</th>
                        <th>Proiektua</th>
                        <th>Ezabatu</th>
                    </tr>
                    </thead>
                    <tbody>

                    {proiektua.fitxategiak.map((fitxategia) => {
                        return (
                            <tr key={fitxategia.id}>
                                <th>{fitxategia.id}</th>
                                <td>{fitxategia.izena}</td>
                                <td>{Math.round(fitxategia.tamaina * 100) / 100} MB</td>
                                <td>{fitxategia.proiektua}</td>
                                <td>
                                    <button className="btn btn-danger"
                                            onClick={this.props.ezabatuFitxategiak.bind(this, fitxategia.id)}>Ezabatu
                                    </button>
                                </td>
                            </tr>

                        );
                    })}


                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    proiektuak: state.proiektuak.proiektuak,

});

export default withRouter(connect(mapStateToProps, {jasoFitxategiak, ezabatuFitxategiak})(Fitxategiak));
