function send_message(verityCode, phone) {
  const finErrCode = 404;
  const config = require('../../config');
  const axios = require('axios');
  const CryptoJS = require('crypto-js');
  const date = Date.now().toString();

  const serviceId = `${config.default.SENS_SERVICE_ID}`;
  const secretKey = `${config.default.SENS_SECRET_KEY}`;
  const accessKey = `${config.default.SENS_ACCESS_KEY}`;
  const my_number = `${config.default.WORK_PHONE_NUMBER}`;

  const method = 'POST';
  const space = ' ';
  const newLine = '\n';
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
  const url2 = `/sms/v2/services/${serviceId}/messages`;

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  axios({
    method: method,
    url: url,
    headers: {
      'Contenc-type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-timestamp': date,
      'x-ncp-apigw-signature-v2': signature,
    },
    data: {
      type: 'SMS',
      countryCode: '82',
      from: my_number,
      content: `EasyHelp 인증번호 [${verityCode}]`,
      messages: [{to: phone}],
    },
  })
    .then(res => {
      console.log(res.data);
      if (res.data.statusCode === '202') {
        alert('전송 했습니다.');
        return;
      }
    })
    .catch(err => {
      console.log(err);
      alert('전송에 실패했습니다. 잠시후에 다시 시도해주세요.');
    });
  return finErrCode;
}

module.exports = send_message;
