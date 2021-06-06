import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signIn } from '../../redux/auth/authActions'
import Content from '../../components/Layout/Content/Content'
import Button from '../../components/UI/Button/Button'
import Message from '../../components/UI/Message/Message'
import { selectAccountUser } from '../../redux/account/accountSelector'
import { selectAuthProcess } from '../../redux/auth/authSelectors'
import FormField from '../../components/UI/Form/FormField/FormField'
import Form, { FormEventType } from '../../components/UI/Form/Form'

interface IFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

const SignIn: FC = () => {
  const history = useHistory()
  const { loading, error } = useSelector(selectAuthProcess)
  const user = useSelector(selectAccountUser)
  const dispatch = useDispatch()

  const submitHandler = (e: FormEventType) => {
    e.preventDefault()
    const elements = e.target.elements as IFormElements
    dispatch(signIn(elements.username.value, elements.password.value))
  }

  useEffect(() => {
    if (user) {
      history.replace('/')
    }
  }, [user])

  return (
    <Content title="Sign In" size="sm">
      <Form loading={loading} onSubmit={submitHandler}>
        <Form.Fields>
          {error && <Message type="error">{error.toString()}</Message>}
          <FormField
            label="Username or email"
            name="username"
            id="sign-in-username"
            type="text"
          />
          <FormField
            label="Password"
            name="password"
            id="sign-in-password"
            type="password"
          />
          <Button type="submit" size="lg" color="secondary">
            Sign in
          </Button>
        </Form.Fields>
      </Form>
    </Content>
  )
}

export default SignIn
