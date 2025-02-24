// 휴대전화번호로 id 찾기
const phone = document.getElementById("phone");
const findId = document.querySelector(".findId");
const resultId = document.querySelector(".resultId");

const findIdFunction = () => {
  let newLang = JSON.parse(localStorage.getItem("user")) || [];

  // 010xxxxxxxx -> 010-xxxx-xxxx 형태로 변경
  if (phone.value.length == 10) {
    let formatPhone = phone.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    phone.value = formatPhone;
  } else if (phone.value.length == 11) {
    let formatPhone = phone.value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    phone.value = formatPhone;
  }

  const filterPhone = newLang.filter((x) => x.phone == phone.value);

  if (filterPhone.length > 0) {
    const mapId = filterPhone.map((x) => x.id).join("");
    const mapName = filterPhone.map((x) => x.name).join("");

    resultId.innerHTML = `<strong>${mapName}</strong>님의 아이디는 <strong>${mapId}</strong>입니다.`;
  } else {
    resultId.innerHTML = `<div class="fail">전화번호 정보를 찾을 수 없습니다.</div>`;
  };
};
findId.addEventListener("click", findIdFunction);
