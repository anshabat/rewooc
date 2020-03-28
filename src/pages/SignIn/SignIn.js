import "./Form.scss";
import React from "react";
import {connect} from "react-redux";
import {signIn} from "../../redux/actionCreators";
import Content from "../../components/Layout/Content/Content";
import FormField from "../../components/UI/Form/FormField/FormField";
import Button from "../../components/UI/Button/Button";
import Message from "../../components/UI/Message/Message";
import {Redirect} from "react-router";

const SignIn = props => {
  const {loading, userId, error, signInUser} = props;
  const loadingClass = loading ? "rw-form--is-loading" : "";

  const submitHandler = (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);
    const {username, password} = Object.fromEntries(formData.entries());
    signInUser(username, password);
  };

  return userId ? (
    <Redirect to="/"/>
  ) : (
    <Content title="Sign In" size="sm">
      <form
        className={`rw-form ${loadingClass}`.trim()}
        action=""
        id="sign-in"
        onSubmit={submitHandler}
      >
        {error && (
          <div className="rw-form__field">
            <Message type="error">
              {error.toString()}
            </Message>
          </div>
        )}
        <div className="rw-form__field">
          <label htmlFor="sign-in-username" className="rw-form__label">Username or email</label>
          <div className="rw-form__control">
            <FormField name="username" id="sign-in-username" type="text"/>
          </div>
        </div>
        <div className="rw-form__field">
          <label htmlFor="sign-in-password" className="rw-form__label">Password</label>
          <div className="rw-form__control">
            <FormField name="password" id="sign-in-password" type="password"/>
          </div>
        </div>
        <div className="rw-form__field">
          <Button type="submit" size="lg" color="secondary">
            Sign in
          </Button>
        </div>
      </form>
    </Content>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signInUser: (username, password) => {
      dispatch(signIn(username, password))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);