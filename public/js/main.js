// console.log(userInfo);

let newArray = [];

// fetch로 회원가입 데이터 가져온 후 로컬스토리지에 저장
const postJSON = () => {
  fetch("/userInfo")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`에러 : ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      let newLang = JSON.parse(localStorage.getItem("user")) || [];

      // 중복데이터 확인
      let isDuplicate = newLang.some((user) => user.id == data.id);

      if (!isDuplicate) {
        newLang.push(data);
        newArray = newLang;
        localStorage.setItem("user", JSON.stringify(newArray));
      } else {
        console.log('문제 있음');
      };
    })
    // let newData = JSON.parse(JSON.stringify(data));
    // console.log(newData);
    .catch((err) => {
      console.error("오류: ", err);
    });
};
postJSON();

// 아이디, 비밀번호 입력값이 일단 들어가면 로그인 버튼 'disabled' 해제
const id = document.getElementById('id');
const password = document.getElementById('password');
const login_btn = document.querySelector('.login-btn');

const openLogin = () => {
  if (id.value != '' && password.value != '') {
    login_btn.disabled = false;
  } else {
    login_btn.disabled = true;
  };
};
id.addEventListener('input', openLogin);
password.addEventListener('input', openLogin);

// 로컬스토리지 데이터와 email, pw 일치하면 welcome 페이지로
const valuelogin = () => {
  let newLang = JSON.parse(localStorage.getItem("user")) || [];

  const filterUser = newLang.filter((x) => x.id == id.value && x.pass == password.value);

  const mapUser = filterUser.map((x) => x.name).join("");
  // console.log(mapUser);

  if (filterUser.length > 0) {
    console.log("로그인 성공");

    window.location.href = `/welcome?name=${mapUser}`;
  } else {
    console.log("로그인 실패")
  };

};
login_btn.addEventListener('click', valuelogin);
