import React, {useState, useEffect} from 'react';
import {useContext} from 'react';
import {GlobalContext} from '../../Context/GlobalProvider';
import regUser from '../../Context/actions/regUser';
import RegisterComponent from '../../Components/RegisterComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isFinishConfirm, setIsFinishConfirm] = useState(false);
  const [isReadCheck, setIsReadCheck] = useState(false);
  const {
    authState: {isLoading},
    authDispatch,
  } = useContext(GlobalContext);
  const inputChecker = () => {
    if (!form.email) {
      setErrors(prev => {
        return {...prev, email: '이메일을 적어주세요.'};
      });
    }
    if (!form.username) {
      setErrors(prev => {
        return {...prev, username: '이름을 적어주세요.'};
      });
    }
    if (!form.password) {
      setErrors(prev => {
        return {...prev, password: '비밀번호를 적어주세요.'};
      });
    }
    if (!form.phone) {
      setErrors(prev => {
        return {...prev, phone: '휴대폰번호를 적어주세요.'};
      });
    }
    if (form.email && isEmail(form.email) === false) {
      setErrors(prev => {
        return {...prev, email: '이메일이 잘 못 되었습니다.'};
      });
    }
    if (isReadCheck === false) {
      setErrors(prev => {
        return {...prev, readcheck: '체크를 해야 가입이 가능합니다.'};
      });
    }
  };

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value.trim()});
    if (value !== '') {
      if (name === 'password') {
        if (value.length < 6) {
          setErrors(prev => {
            return {...prev, [name]: '6글자 이상으로 만들어주세요.'};
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: '여기를 작성해주세요.'};
      });
    }
  };
  const isEmail = email => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
  };
  const onSubmit = async () => {
    inputChecker();
    if (Object.values(form).length === 4 && isFinishConfirm === false) {
      alert('휴대폰 인증이 필요합니다.');
      return;
    }
    const {email, password, username, phone} = form;

    if (
      Object.values(form).length === 4 &&
      Object.values(errors).every(item => !item) &&
      isReadCheck === true
    ) {
      regUser({email, password, username, phone})(authDispatch);
    }
  };
  useEffect(() => {
    if (isReadCheck === true) {
      setErrors(prev => {
        return {...prev, readcheck: null};
      });
    }
  }, [isReadCheck]);
  return (
    <RegisterComponent
      errors={errors}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      isLoading={isLoading}
      setIsFinishConfirm={setIsFinishConfirm}
      setForm={setForm}
      setIsReadCheck={setIsReadCheck}
      isReadCheck={isReadCheck}
    />
  );
};

export default Register;
