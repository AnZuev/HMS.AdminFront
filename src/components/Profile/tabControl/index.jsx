import * as React from 'react';


export class TabControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: {
				profile: false,
				orders: true
			}

		};
		this.parent = this.props.parent;
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick(event){
		let val = event.target.innerHTML;
		if(val == "Profile"){
			this.setState({
				active: {
					profile: true,
					orders: false
				}
			});
			this.parent.openProfile();
		}else{
			this.setState({
				active: {
					profile: false,
					orders: true
				}
			});
			this.parent.openOrders();
		}

	}

	render() {
		return 	(
			<nav className="profileBlock__tabControl">
				{(this.state.active.profile) ?
					<div>
						<p className="profileBlock__tab profileBlock__border-right"  onClick={this.handleClick}>Orders</p>
						<p className="profileBlock__tab profileBlock__border-left  profileBlock__tab__active" onClick={this.handleClick} >Profile</p>
					</div>
					:
					<div>
						<p className="profileBlock__tab profileBlock__border-right profileBlock__tab__active"  onClick={this.handleClick}>Orders</p>
						<p className="profileBlock__tab profileBlock__border-left " onClick={this.handleClick} >Profile</p>
					</div>
				}
				<div className="clearfix"></div>
			</nav>
		)
	}

}



