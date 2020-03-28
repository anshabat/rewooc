import "./Form.scss";
import React from "react";
import axios from "axios";
import Content from "../../components/Layout/Content/Content";
import FormField from "../../components/UI/Form/FormField/FormField";
import Button from "../../components/UI/Button/Button";
import {ajaxEndpoint} from "../../shared/utilities";

const SignIn = () => {

  const onSubmitFrom = (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);
    const {username, password} = Object.fromEntries(formData.entries());
    console.log(username, password);
    axios.get(ajaxEndpoint('rewooc_get_current_user'), {
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
      }
    }).then(result => {
      console.log(result)
    }).catch(e => {
      console.log(e)
    })

  };

  //axios.defaults.headers.common["Authorization"] = "Basic " + Buffer.from("admin:admin").toString("base64");

  return (
    <Content title="Sign In" size="sm">
      <form className="rw-form" action="" id="sign-in" onSubmit={onSubmitFrom}>
        <div className="rw-form__field">
          <label htmlFor="sign-in-username" className="rw-form__label">Username or email</label>
          <div className="rw-form__control">
            <FormField name="username" id="sign-in-username" type="text" onChange={() => {
            }}/>
          </div>
        </div>
        <div className="rw-form__field">
          <label htmlFor="sign-in-password" className="rw-form__label">Password</label>
          <div className="rw-form__control">
            <FormField name="password" id="sign-in-password" type="password" onChange={() => {
            }}/>
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