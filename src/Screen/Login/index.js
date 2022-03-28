import React from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import {GlobalContext} from '../../Context/GlobalProvider';
import loginUser from '../../Context/actions/loginUser';
import LoginComponent from '../../Components/LoginComponent';

const Login = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const {authDispatch} = useContext(GlobalContext);

  const inputChecker = () => {
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: '이메일을 적어주세요.'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: '비밀번호를 적어주세요.'};
      });
    }
  };
  const onChange = ({name, value}) => {
    setForm({...form, [name]: value.trim()});

    if (value !== '') {
      setErrors(prev => {
        return {...prev, [name]: null};
      });
    } else {
      setErrors(prev => {
        return {...prev, [name]: '빈칸을 채워주세요.'};
      });
    }
  };

  // const isEmail = email => {
  //   const emailRegex =
  //     /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  //   return emailRegex.test(email);
  // };
  const onLogin = async () => {
    inputChecker();
    const {email, password} = form;
    if (email && password)
      loginUser({email, password, errors, setErrors})(authDispatch);
  };
  return (
    <LoginComponent
      form={form}
      onChange={onChange}
      setForm={setForm}
      onLogin={onLogin}
      errors={errors}
      setErrors={setErrors}
    />
  );
};

export default Login;
