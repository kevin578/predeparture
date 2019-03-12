import React, {useEffect} from 'react';
import Amplify, { Auth } from 'aws-amplify';
import {connect} from 'react-redux';
import axios from 'axios';
import {setUserInfo, editProgress} from '../state/actions'

function LoadUserInfo(props) {

  useEffect(()=> {
    if (!props.user.id) {
      loadUser()
    }
  }, [])

  function amplifyConfig() {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: 'US_EAST_1',
        userPoolId: 'us-east-1_8tnRUiOnT',
        identityPoolId: 'us-east-1:ce09f285-c38e-4292-a412-1aa11f184343',
        userPoolWebClientId: '4fd480nivo5qc7ssmjv02eqo24',
      },
      Storage: {
        region: 'US_EAST_1',
        bucket: 'clark-predeparture',
        identityPoolId: 'us-east-1:ce09f285-c38e-4292-a412-1aa11f184343'
      },
  });
}


  async function loadUser() {
    const user = await Auth.currentAuthenticatedUser()
    if (!user.username) return
    let userInfo = await axios.get(
      'https://6qb13v2ut8.execute-api.us-east-1.amazonaws.com/dev/getUserById',
      { params: { id: user.username } }
    )
    const {
      email,
      firstName,
      lastName,
      id,
      progress,
      role,
    } = userInfo.data.Item
    userInfo = { email, firstName, lastName, id, progress, role }
    props.setUserInfo(userInfo)
    props.editProgress(progress)
  }

  return (
    <div>
      {props.children}
    </div>
  )
}

const mapStateToProps = (state)=> ({
  user: state.user
}) 

export default connect(mapStateToProps, {setUserInfo, editProgress})(LoadUserInfo);
