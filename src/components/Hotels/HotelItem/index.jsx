import * as React from 'react';


export class HotelItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			title: this.props.title,
			description: this.props.description,
			phone: this.props.phoneNumber,
			address: this.props.address,
			mail: this.props.mail
		};
		this.parent = this.props.parent;
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick(){
		this.parent.pageController.changeState("roomPage", this.state.id);
	}

	render() {
		return 	(
			<div className="HotelItem">
				<p className="h3">{this.state.title}:</p>
				<p className="HotelItem__text">
					{this.state.description}
				</p>
				<p className="text-primary">
					<b>Phone:</b> {this.state.phone}
					<br/>
					<b>Address:</b> {this.state.address}
					<br/>
					<b>Mail:</b> {this.state.mail}
					<br/>
				</p>
				{ /*<p className="text-primary text-xs-left">
					<button className="btn btn-md btn-danger pull-right" onClick={this.handleClick}>
						Block
					</button>
				</p>
				*/}
				<div className="clearfix"></div>
			</div>
		)
	}

}



