import "./Form.scss";
import React from "react";
import Content from '../../components/Layout/Content/Content';
import FormField from '../../components/UI/Form/FormField/FormField';
import Button from '../../components/UI/Button/Button';

const SignIn = () => {
  return (
    <Content title="Sign In" size="sm">
      <form className="rw-form" action="" id="sign-in">
        <div className="rw-form__field">
          <label htmlFor="sign-in-username" className="rw-form__label">Username or email</label>
          <div className="rw-form__control">
            <FormField name="username" id="sign-in-username" type="text" />
          </div>
        </div>
        <div className="rw-form__field">
          <label htmlFor="sign-in-password" className="rw-form__label">Password</label>
          <div className="rw-form__control">
            <FormField name="username" id="sign-in-password" type="password" />
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

export default SignIn;