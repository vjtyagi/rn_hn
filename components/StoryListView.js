const React = require("react-native"),
	RefreshIndicator = require("./RefreshingIndicator"),
	util = require("../utils/ApiUtils"),
	moment = require("moment");

var {
	Text,
	View,
	ListView,
	StyleSheet,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
var StoryListView = React.createClass({
	renderIndicator: function(){
		var refreshIndicator = (this.props.isLoading == true)? (<RefreshIndicator />): null;
		return refreshIndicator;
	},
	onPostSelected: function(){
		console.log("onPostSelected called");
	},
	renderPost: function(postData){
		console.log("render post called");
		var time = moment(postData.time*1000).fromNow();
		var hostName = util.getHostName(postData.url);
		
		return (
			<TouchableHighlight
				underlayColor="#E4E4E4"
				onPress={()=> this.onPostSelected(postData)}
				>
				<View style={styles.postContainer}>
					<View>
						<Text style = {styles.title}>{postData.title}</Text>
						<Text style = {styles.host}>{hostName}</Text>
					</View>
					<View style={styles.descriptions}>
						<View style={styles.info_container}>
							<Text style={styles.info}>{time + " hours ago by " + postData.by}</Text>
						</View>
						<View style={styles.stats_container}>	
							<Text style={styles.info}>{postData.score + " points | " + postData.descendants + " comments"}</Text>
						</View>
					</View>
					<View style={styles.separator}></View>
				</View>
			</TouchableHighlight>
						
		);
	},
	render: function(){
		var stories = this.props.stories[this.props.type].values;
		var dataSource = baseDataSource.cloneWithRows(stories);
		return (
			<View style={styles.listContainer}>
				<ListView
				  style={styles.postsList}
				  dataSource={dataSource}
				  renderHeader={this.renderIndicator}
				  onEndReached={this.loadMore}
				  renderRow={this.renderPost} />
			</View>
			 			
		);
	},
	loadMore: function(){
		console.log("loadmore called");
	},
	onEndReached: function(){
		this.props.loadMore(this.props.type);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#F6F6EF',
		justifyContent: 'center',
		marginTop: 30
	},
	listContainer: {
		flex: 1,
		marginTop: 60,
		backgroundColor: '#F6F6EF',
		padding: 10
	},
	title:{
		fontSize: 15,
		textAlign: 'left',
		marginTop: 5,
		marginBottom: 5
	},
	postsList: {
		flex: 1,
		backgroundColor: '#F6F6EF'
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	host: {
		color: '#F07530',
		fontSize: 14,
		marginBottom: 5
	},
	descriptions: {
		flexDirection: "row",
		justifyContent: 'space-between'
	},
	info: {
		fontSize: 12,
		color: '#AAA',
		marginBottom : 5
	}
});


module.exports = StoryListView;