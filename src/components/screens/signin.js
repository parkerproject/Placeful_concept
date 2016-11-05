import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import {
  Container,
  Content,
  Title,
  Header,
  Button,
  List,
  ListItem,
  InputGroup,
  Input,
  Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Row, Grid } from 'react-native-easy-grid';
import { reduxForm } from 'redux-form';
// import localStore from 'react-native-simple-store';
import * as actions from '../../actions';
import myTheme from '../../../Themes/myTheme';
import sharedStyles from '../../../Themes/sharedStyles';

const styles = StyleSheet.create({
  headerIcon: {
    color: 'black',
  },
  logo: {
    marginVertical: 30,
    alignSelf: 'center',
    width: 100,
    height: 28,
  },
  textColor: {
    color: '#fff',
  },
});

class Signin extends Component {
  constructor(props) {
    super(props);
    this.signInWithEmail = this.signInWithEmail.bind(this);
  //  this.checkIfLocalStore = this.checkIfLocalStore.bind(this);
    this.state = { errorMessage: '' };
  }

  // componentDidUpdate() {
  //   this.checkIfLocalStore();
  // }

  // checkIfLocalStore() {
  //   localStore.get('placeful_user')
  //   .then(user => {
  //     if (user) Actions.signup;
  //   });
  // }

  // nextPage() {
  //   this.props.navigator.immediatelyResetRouteStack([{ name: 'plans' }]);
  // }

  signInWithEmail(formProps) {
    this.props.signInWithEmailAndPassword(formProps, this.props);
  }

  // signInWithFacebook() {
  //   LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
  //   .then((result) => {
  //     if (result.isCancelled) {
  //       Alert.alert('Login cancelled');
  //     } else {
  //       this.graph();
  //     }
  //   }, (error) => {
  //     Alert.alert(`Login fail with error:${error}`);
  //   });
  // }

  // facebookLoginController(accessToken) {
  //   const user = firebaseApp.auth().currentUser;
  //   if (user) {
  //     const uid = user.uid;
  //     const name = user.displayName;
  //     const email = user.email;
  //     localStore.save('placeful_user', { uid, name, email })
  //     .then(() => {
  //       this.nextPage();
  //     })
  //     .catch(error => {
  //       Alert.alert(error.message);
  //     });
  //   } else {
  //     firebaseApp.auth().signInWithCredential(accessToken)
  //     .then(() => {
  //       const newUser = firebaseApp.auth().currentUser;
  //       const uid = newUser.uid;
  //       const name = newUser.displayName;
  //       const email = newUser.email;
  //       localStore.save('placeful_user', { uid, name, email })
  //         .then(() => {
  //           this.nextPage();
  //         })
  //         .catch(error => {
  //           Alert.alert(error.message);
  //         });
  //     })
  //     .catch(error => {
  //       Alert.alert(error.message);
  //     });
  //   }
  // }


  // responseInfoCallback(error, result) {
  //   function makeid() {
  //     let text = '';
  //     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     for (let i = 0; i < 7; i++) {
  //       text += possible.charAt(Math.floor(Math.random() * possible.length));
  //     }
  //     return text;
  //   }
  //   if (error) {
  //     Alert.alert('Error connecting to Facebook');
  //   } else {
  //     const user = {
  //       title: result.name,
  //       email: result.email,
  //       password: makeid(),
  //       is_man: result.gender === 'man',
  //     };
  //     AccessToken.getCurrentAccessToken()
  //   .then(accessTokenData => {
  //     this.facebookLoginController(accessTokenData.accessToken);
  //   });
  //   }
  // }

  // graph() {
  //   const infoRequest = new GraphRequest(
  //     '/me?fields=id,name,email,gender',
  //     null,
  //     this.responseInfoCallback
  //   );
  //   new GraphRequestManager().addRequest(infoRequest).start();
  // }


  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <Container theme={myTheme}>
        <Header style={sharedStyles.header}>
          <Title>
            <Text style={sharedStyles.headerText}>Sign in</Text>
          </Title>
        </Header>
        <Content>
          <Image source={{ uri: 'https://dl.dropbox.com/s/0e3a9tz77snqq8y/black_logo.png' }} style={styles.logo} />
          <Grid>
            <Row size={60} style={sharedStyles.wrapper}>
              <List style={sharedStyles.container}>
                <ListItem>
                  <InputGroup>
                    <Input placeholder="Email" {...email} />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <InputGroup>
                    <Input placeholder="Password" {...password} secureTextEntry />
                  </InputGroup>
                </ListItem>
              </List>
            </Row>
            <View>
              {email.touched && email.error &&
                <Text style={sharedStyles.error}>{email.error}</Text>}
              {password.touched && password.error &&
                <Text style={sharedStyles.error}>{password.error}</Text>}
              {this.props.auth.error &&
                <Text style={[sharedStyles.error, { alignSelf: 'center' }]}>
                  {this.props.auth.error}</Text>}
            </View>
            <View style={sharedStyles.wrapper}>
              <Button
                style={[sharedStyles.button, { marginTop: 20 }]}
                onPress={handleSubmit(this.signInWithEmail)}
              >
             Sign in
              </Button>
            </View>
          </Grid>
          <View style={[sharedStyles.wrapper, sharedStyles.signupFooter]}>
            <Text style={sharedStyles.footerText} onPress={Actions.signup}>
              Don't have an account?&nbsp;
              <Text style={sharedStyles.link}>Sign up</Text>
            </Text>
            <Text style={sharedStyles.footerText}>
              By clicking to sign up you are agreeing to the&nbsp;
            </Text>
            <Text
              style={sharedStyles.link}
              onPress={Actions.terms}
            >
            Terms of use
            </Text>
            <Text>and&nbsp;</Text>
            <Text
              style={sharedStyles.link}
              onPress={Actions.policy}
            >Privacy policy
            </Text>
          </View>
        </Content>

      </Container>
    );
  }
}

Signin.propTypes = {
  navigator: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  fields: React.PropTypes.object,
  authUser: React.PropTypes.func,
  authError: React.PropTypes.func,
  signInWithEmailAndPassword: React.PropTypes.func,
  errorMessage: React.PropTypes.string,
  loginWithFacebook: React.PropTypes.func,
  auth: React.PropTypes.any,
};

function validate(formProps) {
  const errors = {};
  if (formProps.email === undefined || formProps.email === '') {
    errors.email = 'Email is required';
  }
  if (formProps.password === undefined || formProps.password === '') {
    errors.password = 'Password is required';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default reduxForm({
  form: 'SigninUser',
  fields: ['email', 'password'],
  validate,
}, mapStateToProps, actions)(Signin);
