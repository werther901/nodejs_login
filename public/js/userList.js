console.log(userInfo);

let newArray = [];

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

      newLang.push(data);
      newArray = newLang;
      localStorage.setItem("user", JSON.stringify(newArray));
    })
    // let newData = JSON.parse(JSON.stringify(data));
    // console.log(newData);
    .catch((err) => {
      console.error("오류: ", err);
    });
};
postJSON();