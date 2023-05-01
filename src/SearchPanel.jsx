import {Component} from 'react';


class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            term:''
        }
    }
    render(){
        return (
                    <div className="container text-center">
            <input type="text"
                    className="form-control search-input"
                    placeholder="Search" value={this.state.term}
                    onChange={this.onUpdateSearch}/>
                    </div>
        )
    }

      onUpdateSearch = (e)=>{
        const term = e.target.value;
        this.setState({term:term});
        this.props.onUpdateSearch(term);
    }

}

export default SearchPanel;
