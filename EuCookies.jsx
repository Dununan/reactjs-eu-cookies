import './style/style.less';
import React from 'react';
import Lang from './Lang';

export default class EuCookies extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	show: true, 
	    	showHideEffect: false, 
	    	height: 0,
	    	lang: this.getLanguage(props.lang)
	    };
  	}


  	getLanguage(forced) {
  		let lang = (navigator.language || navigator.userLanguage).substring(0,2);

  		if(typeof forced != "undefined") {
  			lang = forced;
  		}
 
  		if(typeof Lang[lang] == "undefined") {
  			lang = "en";
		}

  		return lang;
  	}


  	cookiesAccepted() {
  		this.setState({showHideEffect: true});
  		this.setHideToCookies();
  		setTimeout(() => this.setState({show: false}), 800); 
  	}


  	setHideToCookies() {
  		let date = new Date();
	    date.setFullYear(date.getFullYear() + 10);
	    document.cookie = 'euCookiesAccepted=1; path=/; expires=' + date.toGMTString();
  	}


  	getCookies() {
		let cookies = {};
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

  		window.resizeTimeOut = null;

		window.onresize = () => {

		    if (window.resizeTimeOut != null)
		        clearTimeout(window.resizeTimeOut);

		    window.resizeTimeOut = setTimeout(() => {
		    	this.setState({height: 0});
		    	setTimeout(() => {this.setState({height: React.findDOMNode(this).offsetHeight})}, 100);
		    }, 400);
		     

		}.bind(this);
  	}


	render() {

		if(!this.state.show) {
			return <span></span>
		}


		let divClass = "eu-cookies";
		divClass += this.state.showHideEffect ? " hide" : "";

		let height = {
			height: this.state.height > 0 ? this.state.height : "auto"
		};

		return  <div className={divClass} style={height}>
					<div>
						{Lang[this.state.lang].text}
						<button onClick={this.cookiesAccepted.bind(this)}>{Lang[this.state.lang].btn}</button>
						<a href="http://www.aboutcookies.org/default.aspx?page=5" target="_blank">{Lang[this.state.lang].link}</a>
					</div>
				</div>;
  }
}