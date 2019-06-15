import React from 'react';
import {Text, View,Image, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheets/commit_css';
import GLOBALS from '../src/globals';

class AllCommit extends React.Component {

    constructor(props) {

        super(props);
        const commit = this.props.navigation.getParam('param');
        
        this.state = {

            UserName: '',
            UserPassword: '',
            commit : commit,
            commit_data:[{
              commit: {
                committer: {
  
                  date: "2018-07-22T17:25:26Z"
              },
                  message: "Check",
              },
              committer: {
                  login: "Parasgr7",
                  avatar_url: "https://avatars3.githubusercontent.com/u/22578296?v=4",
                
              },
          }]
        }
    }
 
    componentWillMount(){
      this.fetchCommits();
  }
  fetchCommits = async() =>
  {
    const auth_token = await AsyncStorage.getItem('session_data');
    this.setState({name: JSON.parse(auth_token)[0].username});

    fetch(GLOBALS.FETCH_COMMITS+this.state.name+"/"+this.state.commit.name+"/commits", {
      method: 'GET',
      }).then((response) => response.json())
          .then((responseJson) => {
              if(responseJson)
              {    
                 this.setState({commit_data: responseJson});
              }
              else{
                  Alert.alert("No Commit History");
              }

          }).catch((error) => {
          console.log(error);
          Alert.alert("Server Unavailable");

      });
  }

  display_list(list)
    {   const that=this;
        return list.map(function(item, i){
            return(
                  <View style={styles.SubmitButtonStyle1} key={i} >
                  <View style={{flex: 0.3}}>
                      <Image
                        style={styles.image}
                        source= {{uri: item.committer.avatar_url}}
                      />
                  </View>
                  <View style={{flex: 0.7, marginLeft: 18}}>
                        <Text style={{marginLeft:10,marginBottom:5}}  >
                        <Text style={styles.TextStyle2Bold}>UserName : </Text>
                            <Text style={styles.TextStyle2}>{item.committer.login}</Text>
                        </Text>
                        
                        <Text style={{marginLeft:10,marginBottom:5}} >
                            <Text style={styles.TextStyle2Bold}>Message : </Text>
                            <Text style={styles.TextStyle2}>{item.commit.message}</Text>
                        </Text>
                        <Text style={{marginLeft:10,marginBottom:5}} >
                            <Text style={styles.TextStyle2Bold}>Commit Date : </Text>
                            <Text style={styles.TextStyle2}>{item.commit.committer.date.split('T')[0]}</Text>
                        </Text>
                    </View>
                      
                  </View>  
            );
          });
    }

  render() {

    return (
      <View style={styles.container}>
          
           <ScrollView >
           <Text style={styles.TextStyle1}> Commit History:</Text>
            {this.display_list(this.state.commit_data)}
           </ScrollView>
        
              
      </View>
    );
  }
}

export default AllCommit;