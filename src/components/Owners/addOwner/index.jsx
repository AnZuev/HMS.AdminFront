import * as React from 'react';


export class AddOwnerBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: this.props.hidden,
			errors: {},
			commonError: "",
			hotels: []
		};
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.loadHotels();
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

	getDataFromInputs(){
		return {
			firstName: $("#OwnerPage__addOwnerBlock__firstNameInput").val(),
			secondName: $("#OwnerPage__addOwnerBlock__secondNameInput").val(),
			fatherName: $("#OwnerPage__addOwnerBlock_fatherNameInput").val(),
			email: $("#OwnerPage__addOwnerBlock__mailInput").val(),
			hotelId: $("#OwnerPage__addOwner__hotels").val(),
			password: $("#OwnerPage__addOwnerBlock__passwordInput").val()
		}
	}

	loadHotels(){
		fetch(window.host + '/private/hotels/full', {
			method: "get",
			credentials: 'include'
		}).then((response)=>{

			if(response.status == 200){
				return response.json();
			}
		}).then((json)=>{
			this.setState({hotels: json});
		}).catch((err)=>{
			console.log(err);
		});
	}

	renderHotelDropDown(){
		let opt = [];

		this.state.hotels.forEach((hotel)=>{
			opt.push(<option key={hotel.id} value={hotel.id}> {hotel.title} </option>);
		});

		return (<div className="form-group">
			<label htmlFor="OwnerPage__addOwner__hotels"><b>Hotel:</b></label>
			<select className="form-control" id="OwnerPage__addOwner__hotels">
				<option value="" disabled selected>Choose hotel...</option>
				{opt}
			</select>
			<span className="small text-danger">{this.state.errors.hotelId}</span>

		</div>)
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

	cleanErrors(){
		this.setState({
			errors: {}
		})
	}

	handleSaveClick(){
		let data = this.getDataFromInputs();

		let url = window.host + '/private/owner/update';


		this.cleanErrors();

		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(data)
		}).then((response)=>{
			if(response.status == 200){
				this.props.parent.openShowOwners();
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


		return (<div id="OwnerPage__addOwnerBlock">
			<div>
				<p className="text-danger text-xs-center">{this.state.commonError}</p>

				<p>
					<b>First name: </b> <input type="text" className="form-control" id="OwnerPage__addOwnerBlock__firstNameInput"/>
					<span className="small text-danger">{this.state.errors.firstName}</span>
				</p>

				<p>
					<b>Second name: </b> <input type="text" className="form-control" id="OwnerPage__addOwnerBlock__secondNameInput"/>
					<span className="small text-danger">{this.state.errors.secondName}</span>
				</p>

				<p>
					<b>Father name: </b> <input type="text" className="form-control" id="OwnerPage__addOwnerBlock_fatherNameInput"/>
					<span className="small text-danger">{this.state.errors.fatherName}</span>
				</p>

				{this.renderHotelDropDown()}

				<p>
					<b>E-mail: </b><input type="email"  className="form-control" id="OwnerPage__addOwnerBlock__mailInput"/>
					<span className="small text-danger">{this.state.errors.email}</span>
				</p>

				<p>
					<b>Password: </b> <input type="password" className="form-control" id="OwnerPage__addOwnerBlock__passwordInput"/>
					<span className="small text-danger">{this.state.errors.password}</span>
				</p>
				<button className="btn btn-md btn-success btn-block" type='submit' onClick={this.handleSaveClick}>Create</button>
			</div>
		</div>);
	}

}



