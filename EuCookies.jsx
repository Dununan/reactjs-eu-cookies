import './style/style.less';
import React from 'react';

export default class EuCookies extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {show: true, showHideEffect: false, height: 0};
  	}


  	cookiesAccepted() {
  		this.setState({showHideEffect: true});
  		this.setHideToCookies();
  		setTimeout(() => this.setState({show: false}), 800); 
  	}


  	setHideToCookies() {
  		var date = new Date();
	    date.setFullYear(date.getFullYear() + 10);
	    document.cookie = 'euCookiesAccepted=1; path=/; expires=' + date.toGMTString();
  	}


  	getCookies() {
		var cookies = {};
		for (let cookie of document.cookie.split('; ')) {
			let [name, value] = cookie.split("=");
			cookies[name] = decodeURIComponent(value);
		}
		return cookies;
	}


	componentWillMount() {
		let cookies = this.getCookies();
		if(cookies.euCookiesAccepted == 1) {
			this.setState({show: false})
		}
	}


  	componentDidMount() {
  		this.setState({height: React.findDOMNode(this).offsetHeight});
  	}


	render() {

		if(!this.state.show) {
			return <span></span>
		}


		var divClass = "eu-cookies";
		divClass += this.state.showHideEffect ? " hide" : "";

		var height = {
			height: this.state.height > 0 ? this.state.height : "auto"
		};

		return  <div className={divClass} style={height}>
					<div>
						Tento web používá k poskytování služeb, personalizaci reklam a analýze
						návštěvnosti soubory cookie. Používáním tohoto webu s tím souhlasíte.
						<button onClick={this.cookiesAccepted.bind(this)}>V pořádku</button>
						<a href="https://www.google.com/policies/technologies/cookies/" target="_blank">Další informace</a>
					</div>
				</div>;
  }
}