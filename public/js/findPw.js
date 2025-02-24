// 아이디로 비밀번호 찾기
const id = document.getElementById("id");
const findPw = document.querySelector(".findPw");
const resultPw = document.querySelector(".resultPw");

const findPwFunction = () => {
  let newLang = JSON.parse(localStorage.getItem("user")) || [];

  const filterId = newLang.filter((x) => x.id == id.value);

  if (filterId.length > 0) {
    const mapPw = filterId.map((x) => x.pass).join("");
    const mapName = filterId.map((x) => x.name).join("");

    resultPw.innerHTML = `<strong>${mapName}</strong>님의 비밀번호는 <strong>${mapPw}</strong>입니다.`;
  } else {
    resultPw.innerHTML = `<div class="fail">아이디 정보를 찾을 수 없습니다.</div>`;
  };
};
findPw.addEventListener("click", findPwFunction);
