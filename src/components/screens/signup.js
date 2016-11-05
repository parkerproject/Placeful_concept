import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';
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
import localStore from 'react-native-simple-store';

import * as actions from '../../actions';
import myTheme from '../../../Themes/myTheme';
import sharedStyles from '../../../Themes/sharedStyles';

const styles = StyleSheet.create({
  headerIcon: {
    color: 'black',
  },
  logo: {
    marginTop: 30,
    alignSelf: 'center',
    width: 100,
    height: 28,
  },
  form: {
    flex: 1,
  },
  textColor: {
    color: '#fff',
  },
});

class Signup extends Component {

  constructor(props) {
    super(props);
    this.signUpWithEmail = this.signUpWithEmail.bind(this);
  }

  componentDidUpdate() {
    localStore.get('placeful_user')
        .then(user => {
          if (user) this.nextPage();
        });
  }

  nextPage() {
    this.props.navigator.immediatelyResetRouteStack([{ name: 'plans' }]);
  }

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
  //     Alert.alert('Signup with Facebook successfully');
  //     const user = {
  //       title: result.name,
  //       email: result.email,
  //       password: makeid(),
  //       is_man: result.gender === 'man',
  //     };
  //
  //     this.props.signUpUser(user, 'facebook');
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

  // signUpWithFacebook() {
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

  signUpWithEmail(formProps) {
    this.props.signUpUser(formProps, 'password');
  }


  render() {
    const { handleSubmit, fields: { title, email, password } } = this.props;

    return (
      <Container theme={myTheme}>
        <Header style={sharedStyles.header}>
          <Title>
            <Text style={sharedStyles.headerText}>Sign up</Text>
          </Title>
        </Header>
        <Content>
          <Image source={{ uri: 'https://dl.dropbox.com/s/0e3a9tz77snqq8y/black_logo.png' }} style={styles.logo} />
          <Grid>
            <Row size={60} style={sharedStyles.wrapper}>
              <List style={sharedStyles.container}>
                <ListItem>
                  <InputGroup>
                    <Input placeholder="Name" {...title} />
                  </InputGroup>
                </ListItem>
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
              {title.touched && title.error &&
                <Text style={sharedStyles.error}>{title.error}</Text>}
              {email.touched && email.error &&
                <Text style={sharedStyles.error}>{email.error}</Text>}
              {password.touched && password.error &&
                <Text style={sharedStyles.error}>{password.error}</Text>}
            </View>
            <Row size={20} style={sharedStyles.wrapper}>
              <Button
                style={[sharedStyles.button, { marginTop: 20 }]}
                onPress={handleSubmit(this.signUpWithEmail)}
              >Sign up</Button>
            </Row>
          </Grid>
          <View size={20} style={[sharedStyles.wrapper, sharedStyles.signupFooter]}>
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
            <Text style={sharedStyles.footerText} onPress={Actions.signin}>
              I already have an account?&nbsp;
              <Text style={sharedStyles.link}>Sign in</Text>
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (formProps.email === undefined || formProps.email === '') {
    errors.email = 'Email is required';
  }
  if (formProps.title === undefined || formProps.title === '') {
    errors.title = 'Name is required';
  }
  if (formProps.password === undefined || formProps.password === '') {
    errors.password = 'Password is required';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

Signup.propTypes = {
  handleSubmit: React.PropTypes.func,
  fields: React.PropTypes.object,
  navigator: React.PropTypes.object,
  signUpUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string,
};
export default reduxForm({
  form: 'NewUser',
  fields: ['title', 'email', 'password'],
  validate,
}, mapStateToProps, actions)(Signup);
