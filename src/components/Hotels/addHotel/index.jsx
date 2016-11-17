import * as React from 'react';


export class AddHotelBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: this.props.hidden,
			errors: {},
			commonError: ""
		};
		this.handleSaveClick = this.handleSaveClick.bind(this);
	}


	show(){
		this.setState({
			hidden: false
		})
	}

	hide(){
		this.setState({
			hidden: true
		})
	}

	getDataFromInput(){
		return {
			title: $("#HotelPage__addHotelBlock__titleInput").val(),
			description: $("#HotelPage__addHotelBlock__descriptionInput").val(),
			phoneNumber: $("#HotelPage__addHotelBlock__phoneInput").val(),
			mail: $("#HotelPage__addHotelBlock__mailInput").val(),
			address: $("#HotelPage__addHotelBlock__addressInput").val()
		};
	}

	showError(errors){
		let errorObj = {};
		errors.forEach(error => {
			errorObj[error.field] = error.message;
		});
		this.setState({
			errors: errorObj
		})
	}

	handleSaveClick(){
		let data = this.getDataFromInput();

		let url = window.host + '/private/hotel/new';

		fetch(url, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(data)
		}).then((response)=>{
			if(response.status == 200){
				// show hotels + refresh
				this.props.parent.openShowHotels();
			}else if(response.status == 400){
				return response.json()
					.then(json => {
						if(json.fieldErrors){
							this.showError(json.fieldErrors);
						}
						if(json.commonErrors){
							this.setState({
								commonError: json.commonErrors[0]
							})
						}
					})
			}else{
				new Error();
			}
		}).catch((err) =>{
			this.setState({
				commonError: "Something went wrong. Reload page and try again"
			});
			console.log(err);
		});
	}

	render() {

		if(this.state.hidden){
			return null;
		}


		return (<div className="row" id="HotelPage__addHotelBlock">
			<div>
				<p className="text-danger text-xs-center">{this.state.commonError}</p>

				<p>
					<b>Title: </b> <input type="text" className="form-control" id="HotelPage__addHotelBlock__titleInput"/>
					<span className="small text-danger">{this.state.errors.title}</span>
				</p>

				<p>
					<b>Description: </b> <textarea type="text" className="form-control" id="HotelPage__addHotelBlock__descriptionInput" rows="4"></textarea>
					<span className="small text-danger">{this.state.errors.description}</span>
				</p>
				<p>
					<b>Phone: </b> <input type="tel" className="form-control" id="HotelPage__addHotelBlock__phoneInput"/>
					<span className="small text-danger">{this.state.errors.phoneNumber}</span>
				</p>
				<p>
					<b>E-mail: </b><input type="email"  className="form-control" id="HotelPage__addHotelBlock__mailInput"/>
					<span className="small text-danger">{this.state.errors.mail}</span>
				</p>
				<p>
					<b>Address: </b> <input type="text" className="form-control" id="HotelPage__addHotelBlock__addressInput"/>
					<span className="small text-danger">{this.state.errors.address}</span>
				</p>
				<button className="btn btn-md btn-success btn-block" type='submit' onClick={this.handleSaveClick}>Create</button>
			</div>
		</div>);
	}

}



