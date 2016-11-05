import { StyleSheet, Dimensions } from 'react-native';
import styleVars from './styleVars';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: styleVars.Colors.primary,
    borderColor: styleVars.Colors.primary,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 0,
    width: 250,
    height: 40,
  },
  container: {
    flex: 1,
  },
  noPaddingBottom: {
    paddingBottom: 0,
  },
  noPaddingTop: {
    paddingTop: 0,
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  footer: {
    backgroundColor: 'white',
    borderWidth: 1,
    width,
  },
  footerLink: {
    alignSelf: 'center',
    fontSize: 13,
  },
  footerLinkIcon: {
    alignSelf: 'center',
    fontSize: 28,
  },
  footer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    width,
  },
  headerIconWrapper: {
    height: 30,
    width: 30,
  },
  headerIcon: {
    alignSelf: 'flex-start',
    top: 3,
    color: 'black',
  },
  header: {
    shadowColor: 'transparent',
    backgroundColor: 'white',
  },
  card: {
    marginTop: 10,
    borderTopWidth: 0,
    shadowColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0,
    paddingBottom: 10,
    width: width - 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
    zIndex: 10,
    position: 'relative',
  },
  cardItem: {
    borderBottomWidth: 0,
    width: width - 20,
  },
  cardItemMerchant: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardItemAddress: {
    fontSize: 13,
  },
  placeIcon: {
    fontSize: 14,
  },
  cardItemPhone: {
    fontSize: 13,
    paddingLeft: 10,
  },
  follow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingBottom: 0,
  },
  followButton: {
    borderColor: styleVars.Colors.primary,
    borderRadius: 3,
    borderWidth: 1,
    width: 100,
    alignSelf: 'center',
    paddingBottom: 5,

  },
  followText: {
    color: styleVars.Colors.primary,
    textAlign: 'center',
    fontSize: 13,
  },
  followerNumberWrapper: {
    marginTop: -16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  followerNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 11,
    color: '#888',
    backgroundColor: 'transparent',
  },
  description: {
    fontSize: 13,
  },
  hashtags: {
    fontSize: 12,
    color: '#F22613',
  },
  footerText: {
    paddingTop: 30,
    textAlign: 'center',
    fontSize: 13,
  },
  signupFooter: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 40,
  },
  link: {
    color: '#F22613',
    fontSize: 13,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 13,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
