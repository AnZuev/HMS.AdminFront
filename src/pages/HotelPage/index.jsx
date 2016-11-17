import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {HotelItem} from "../../components/Hotels/HotelItem/index.jsx";
import {AddHotelBlock} from "../../components/Hotels/addHotel/index.jsx";


export class HotelsPage extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			hidden: this.props.hidden,
			title: 'hotels',
			hotels: [],
			status: 'showHotels'
		};
		this.pageController = this.props.pageController;
		this.loadHotels();


		this.openAddHotel = this.openAddHotel.bind(this);
		this.openShowHotels = this.openShowHotels.bind(this);
	}


	loadHotels(){
		$.get(window.host + '/private/hotels/full', function (result) {
			if(result){
				this.setState({hotels: result});
			}else{
				// show error or something like that
			}
		}.bind(this));
	}

	close(){
		this.setState({hidden: true});
	}

	open(){
		this.setState({hidden: false});
	}

	openShowHotels(){
		this.loadHotels();
		this.setState({
			status: 'showHotels'
		})
	}

	openAddHotel(){
		this.setState({
			status: 'addHotel'
		})
	}

	renderHotels(){
		let block =[];

		for(let i = 0; i < this.state.hotels.length; i++){
			block.push(
				<HotelItem key={this.state.hotels[i].id}
				           title={this.state.hotels[i].title}
				           description={this.state.hotels[i].description}
				           phoneNumber={this.state.hotels[i].phoneNumber}
				           address={this.state.hotels[i].address}
				           mail = {this.state.hotels[i].mail}
				           id = {this.state.hotels[i].id}
				           parent = {this}
				/> )
		}
		return block;
	}

	render(){
		if(this.state.hidden){
			return null;
		}

		if(this.state.status == 'showHotels'){
			return (
				<div className='page HotelPage'>
					<p className="text-primary" style={{'textAlign': 'center'}}>
						<button className="btn btn-lg btn-success" onClick={this.openAddHotel}>
							Add new hotel
						</button>
					</p>
					{this.renderHotels()}
				</div>
			)
		}else{
			return (
				<div className='page HotelPage'>
					<p className='HotelPage__goToShowHotelsButton' onClick={this.openShowHotels}> Back to Hotel page</p>
					<AddHotelBlock hidden={false} parent={this} />
				</div>
			)
		}

	}
}





