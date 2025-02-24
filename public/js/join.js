let emailVaule = false;
let pwValue = false;
let pwCheckValue = false;
let nameValue = false;
let phoneValue = false;

// 로드 시 생년월일에 값 추가
window.addEventListener('DOMContentLoaded', function() {
  const yearA = this.document.getElementById('year');
  const monthA = this.document.getElementById('month');
  const dayA = this.document.getElementById('day');

  let now = new Date();
  let year = now.getFullYear();
  let month = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  let day = (now.getDate()) > 9 ? '' + (now.getDate()) : '0' + (now.getDate());

  // 연도 select 만들기
  for(let i = 1900; i <= year; i++) {
    yearA.innerHTML += `<option value="${i}">${i}</option>`;
  };

  // 월별 select 만들기
  for(let i = 1; i <= 12; i++) {
    let mm = i > 9 ? i : "0" + i;
    monthA.innerHTML += `<option value="${i}">${i}</option>`;
  };

  // 일별 select 만들기
  for(let i = 1; i <= 31; i++) {
    let dd = i > 9 ? i : "0" + i;
    dayA.innerHTML += `<option value="${i}">${i}</option>`;
  }
})

// 유효성 검증 통과 시 회원가입 버튼 disabled
const saveData = document.querySelector('.saveData');

const ifTrue = () => {
  if (emailVaule && pwValue && pwCheckValue && nameValue && phoneValue) {
    saveData.disabled = false;
  } else {
    saveData.disabled = true;
  }
};

// 이메일 중복검사
const email = document.getElementById("email");
const duplicateCheck = document.querySelector(".duplicateCheck");
const content01 = document.querySelector(".content01");

const valueEmail = (e) => {
  let newLang = JSON.parse(localStorage.getItem("user")) || [];
  // console.log(newLang);

  const filterEmail = newLang.filter((x) => x.id == email.value);

  if (filterEmail.length > 0) {
    console.log("중복 이메일임");

    content01.innerHTML = `<div>중복된 이메일입니다.</div>`;
    // div 추가
    emailVaule = false;
    ifTrue();
  } else if (email.value == "") {
    // div 추가 / '아이디는 필수 정보입니다.'
    content01.innerHTML = `<div>아이디는 필수 정보입니다.</div>`;
    
    emailVaule = false;
    ifTrue();
  } else if (email.type === "email") {
    console.log("이메일 사용 가능");
    alert("사용 가능한 이메일 입니다.")
    // div 없앰
    content01.innerHTML = "";

    emailVaule = true;

    // duplicateCheck.disabled = true;

    ifTrue();
  }
};
duplicateCheck.addEventListener("click", valueEmail);

// 비밀번호 유효성 검증(특수문자 1개 이상, 영어 대소문자 각 1개 이상, 8자리 이상)
const password = document.getElementById("password");
const content02 = document.querySelector(".content02");
// console.log(password);

const valuePW = (e) => {
  let inspectPassWord = "Abcd123!";
  let regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/;

  if (regex.test(e.target.value)) {
    console.log("비번 유효성 검증 완료");

    content02.innerHTML = "";
    pwValue = true;

    ifTrue();
  } else if (password.value == "") {
    console.log(password.value);
    content02.innerHTML = `<div>비밀번호는 필수 정보입니다.</div>`;

    pwValue = false;
    ifTrue();
  } else {
    console.log("비밀번호는 특수문자 1자, 영어 대소문자 각 1자 포함 8자 이상이어야 합니다.");
    content02.innerHTML = `<div>비밀번호는 특수문자 1자, 영어 대소문자 각 1자 포함 8자 이상이어야 합니다.</div>`;

    pwValue = false;
    ifTrue();
  }
};
password.addEventListener("input", valuePW);

// 비밀번호 확인(비밀번호와 똑같은지)
const passCheck = document.getElementById("passCheck");
const content03 = document.querySelector(".content03");

const valuePWCheck = (e) => {
  if (password.value == e.target.value) {
    console.log("비번 일치함");
    content03.innerHTML = "";
    pwCheckValue = true;

    ifTrue();
  } else {
    console.log("비번 불일치");
    content03.innerHTML = `<div>비밀번호가 일치하지 않습니다.</div>`;
    pwCheckValue = false;
    ifTrue();
  }
};
passCheck.addEventListener("input", valuePWCheck);

// 이름 작성여부 확인
const names = document.getElementById("name");
const content04 = document.querySelector(".content04");

const valueName = (e) => {
  if (e.target.value == "") {
    console.log("이름은 필수정보 입니다.");
    content04.innerHTML = `<div>이름은 필수정보 입니다.</div>`;

    nameValue = false;
    ifTrue();
  } else {
    console.log("이름 ok");
    content04.innerHTML = "";

    nameValue = true;
    ifTrue();
  }
};
names.addEventListener("blur", valueName);

// 휴대전화번호 유효성 검증
const content05 = document.querySelector(".content05");
const phone = document.getElementById("phone");

const valuePhone = (e) => {
  let phoneNumber = "01028232322";
  let regex = /^01[0-9]\d{3,4}\d{4}$/;
  const regex02 = /^01[0-9]-\d{3,4}-\d{4}$/;

  if (regex.test(e.target.value)) {
    console.log("전화번호 검증 완료");

    if (e.target.value.length == 10) {
      let formatPhone = e.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      e.target.value = formatPhone;
    } else if (e.target.value.length == 11) {
      let formatPhone = e.target.value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      e.target.value = formatPhone;
    };

    content05.innerHTML = "";

    phoneValue = true;
    ifTrue();
  } else if (regex02.test(e.target.value)) {
    console.log("전화번호 검증 완료2");
    content05.innerHTML = "";

    phoneValue = true;
    ifTrue();
  } else if (e.target.value == '') {
    content05.innerHTML = `<div>휴대전화번호는 필수 정보 입니다.</div>`;

    phoneValue = false;
    ifTrue();
  } else {
    content05.innerHTML = `<div>휴대전화번호가 정확한지 확인해 주세요.</div>`;

    phoneValue = false;
    ifTrue();
  }
};
phone.addEventListener("blur", valuePhone);

