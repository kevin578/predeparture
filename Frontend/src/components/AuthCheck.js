import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { navigate, navigateTo } from 'gatsby'
import { connect } from 'react-redux'

function AuthCheck(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [correctRole, setCorrectRole] = useState(false);

  useEffect(()=> {
    checkUserAuth();
    roleRedirect();
    checkRole();
  }, [])

  useEffect(()=> {
    setShowContent(isLoggedIn);
  },[isLoggedIn])

  useEffect(()=> {
    checkRole();
    roleRedirect();
    console.log("run")
  },[props.user.role])

  function checkUserAuth() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setIsLoggedIn(true)
      })
      .catch(err => {
        if (props.authRedirect) {
          navigate(props.authRedirect)
        }
      })
  }
  function checkRole() {
    if (!props.role) return setCorrectRole(true);
    if (props.role == props.user.role) setCorrectRole(true);
  }

  function roleRedirect() {
    if (!props.roleRedirect) return
    if (!props.user.role) return;
    console.log(props.role, props.user.role)
    if (props.role != props.user.role) {
        console.log("go")
      navigate(props.roleRedirect)
    }
  }

  function getContent() {
    if (showContent && correctRole) {
      return props.children
    } else {
      return null
    }
  }
  
  return getContent()
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(AuthCheck)
