var React = require("react-native"),
	StoryTypes = require("../constants/StoryTypes");
	
var {
	Text,
	View,
	StyleSheet,
	TouchableHighlight
} = React;

//var window = Dimensions.get("window");
var Menu = React.createClass({
	_onSelect: function(storyType){
		// this.props.menuActions.close();
		// this.props.navigator.push({
		// 	title: storyType
		// });
	},
	render: function(){
		return (
				<View style={styles.menuContainer}>
					<TouchableHighlight
						underlayColor="#672D0C"
						style={styles.optionHighlight}
						onPress={()=> {this._onSelect(StoryTypes.TOP_STORIES)} }>
						<Text style={[styles.menuOption, styles.active]} >Top Stories</Text>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor="#672D0C"
						style={styles.optionHighlight}
						onPress={()=> {this._onSelect(StoryTypes.NEW_STORIES)} }>
						<Text style={styles.menuOption} >New Stories</Text>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor="#672D0C"
						style={styles.optionHighlight}
						 onPress={()=> {this._onSelect(StoryTypes.ASK_HN)} }>
						<Text style={styles.menuOption}>Ask HN</Text>	
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor="#672D0C"
						style={styles.optionHighlight}
						onPress={()=> {this._onSelect(StoryTypes.SHOW_HN)} }>
						<Text style={styles.menuOption} >Show HN</Text>	
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor="#672D0C"
						style={styles.optionHighlight}
						 onPress={()=> {this._onSelect(StoryTypes.HN_JOBS)} }>
						<Text style={styles.menuOption}>HN Jobs</Text>	
					</TouchableHighlight>
				</View>
		);
	}
});

var styles = StyleSheet.create({
	menuContainer: {
		flex: 1,
		marginTop: 60,
		width: 120,
		height: 120,
		backgroundColor: "#7e3309"
	},
	menuOption: {
		color: "#F07530",
		fontSize: 20,
		marginTop: 0.25,
		marginBottom: 0.25,
		lineHeight: 30
	},
	active: {
		color: "#fff"
	},
	optionHighlight: {
		padding: 20
	}
});

module.exports = Menu;