import './Form.scss'
import React, { FC, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signIn } from '../../redux/auth/authActions'
import Content from '../../components/Layout/Content/Content'
import FormField from '../../components/UI/Form/FormField/FormField'
import Button from '../../components/UI/Button/Button'
import Message from '../../components/UI/Message/Message'
import { selectAccountUser } from '../../redux/account/accountSelector'
import { selectAuthProcess } from '../../redux/auth/authSelectors'

interface IFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

type FormEventType = FormEvent<HTMLFormElement> & { target: HTMLFormElement }

const SignIn: FC = () => {
  const history = useHistory()
  const { loading, error } = useSelector(selectAuthProcess)
  const user = useSelector(selectAccountUser)
  const dispatch = useDispatch()
  const loadingClass = loading ? 'rw-form--is-loading' : ''

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
      <form
        className={`rw-form ${loadingClass}`.trim()}
        action=""
        id="sign-in"
        onSubmit={submitHandler}
      >
        {error && (
          <div className="rw-form__field">
            <Message type="error">{error.toString()}</Message>
          </div>
        )}
        <div className="rw-form__field">
          <label htmlFor="sign-in-username" className="rw-form__label">
            Username or email
          </label>
          <div className="rw-form__control">
            <FormField name="username" id="sign-in-username" type="text" />
          </div>
        </div>
        <div className="rw-form__field">
          <label htmlFor="sign-in-password" className="rw-form__label">
            Password
          </label>
          <div className="rw-form__control">
            <FormField name="password" id="sign-in-password" type="password" />
          </div>
        </div>
        <div className="rw-form__field">
          <Button type="submit" size="lg" color="secondary">
            Sign in
          </Button>
        </div>
      </form>
    </Content>
  )
}

export default SignIn
