import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {jasoProiektuak} from "../../actions/proiektuak";
import Select from 'react-select';

class Grafikoak extends Component {


    state = {
        proiektua: null,
        aldagaiak: ['----',],
        aldagaiAukeratuak: [],
        ezaugarriak: ['----',],
        ezaugarria: '----'

    };


    static propTypes = {
        proiektuak: PropTypes.array.isRequired,
        jasoProiektuak: PropTypes.func.isRequired,
    }


    componentDidMount() {
        if (this.props.proiektuak === null) {
            this.props.jasoProiektuak();

        }

        this.setState({proiektua: this.props.proiektuak[0]})
    }


    onChangeProiektua = e => {
        const proiektua = this.props.proiektuak.filter(proiektua => proiektua.id === Number(e.value))[0];

        let targets = proiektua.targets;

        if (targets === null) {
            targets = ['----',];
        }


        this.setState({proiektua: e, aldagaiak: targets, aldagaiAukeratuak: targets[0]});
    }
    onChangeAldagaia = e => {

        this.setState({aldagaiAukeratuak: e})

    }
    onSubmit = e => {
        console.log('aldagaiak')

        console.log(this.state.aldagaiAukeratuak)
        console.log('proiektua')

        console.log(this.state.proiektua)
    }


    render() {
        const {proiektua, aldagaiAukeratuak, aldagaiak} = this.state;
        let proiektuDiv;

        if (proiektua !== null) {
            proiektuDiv = (
                <>
                    <div className="form-group">
                        <label>Proiektuak</label>
                        <Select options={this.props.proiektuak.map((p) => ({value: p.id, label: p.izena}))}
                                onChange={this.onChangeProiektua}
                                value={proiektua}
                                autoFocus={true}/>


                        <label>Aldagaiak</label>

                        <Select options={aldagaiak.map((p, idx) => ({value: idx, label: p}))}
                                onChange={this.onChangeAldagaia}
                                value={aldagaiAukeratuak}
                                isMulti={true}/>

                        <br/>
                        <button className="btn btn-success" onClick={this.onSubmit}>Grafikatu</button>


                    </div>
                </>

            );
        } else {

            proiektuDiv = '';
        }


        return (<>
                <br/><br/>

                <h2>Grafikatu</h2>
                <div className='container'>
                    {proiektuDiv}


                </div>
            </>
        );
    }
}


const mapStateToProps = state => ({
    proiektuak: state.proiektuak.proiektuak,


});

export default connect(mapStateToProps, {jasoProiektuak})(Grafikoak);
