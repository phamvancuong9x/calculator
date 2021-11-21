const getElmBtnOnOff = $(".btn__on-off");
const getElmBtnCE = $(".btn__CE");
const getElmClassDisplayText1 = $(".display-text1");
const getElmClassDisplayText2 = $(".display-text2");
const getElmClassScreenDisplayText = $(".screen__display-text");
//
const getElmClassBtnDivide = $(".btn__divide");
const getElmClassBtnMultiply = $(".btn__multiply");
const getElmClassBtnSubtract = $(".btn__subtract");
const getElmClassBtnEqual = $(".btn__equal");
const getElmClassBtnSum = $(".btn__sum");
const getElmClassBtnDot = $(".btn__dot");
//ham tat bat calculator
// biến hiển thị nội dung người nhập lên màn hình :calcultor
let calculation = "";
// biến chứa lần lươt giá trị phần tử  mà người dùng nhập vào:term
let term = "";
let checkON = false;
function OnOffCalculator() {
  getElmBtnOnOff.click(function () {
    getElmClassScreenDisplayText.toggleClass("display-flex");
    resetValue();
  });
}
// ham reset cac gia tri
function resetValue() {
  getElmClassDisplayText1.text("");
  getElmClassDisplayText2.text("0");
  calculation = "";
  fixCalCulation = "";
  term = "";
  checkResult=false;
}

// Nut AC xoa gia tri
function clearCalculator() {
  getElmBtnCE.click(function () {
    resetValue();
  });
}

// ham hien thi noi dung phep tinh ra man hinh
function screenShow(This) {
  calculation += $(This).text().trim();
  getElmClassDisplayText1.text(`${calculation}`);
}
// ham lay gia tri cua cac nut roi hien thi len man hinh

function getValueBtnShowScreen() { 
  $(".btn").click(function () {
    if(checkResult){
      resetValue();
    }
    screenShow(this);
    term += $(this).text().trim();
  });
  $(".btn1").click(function () {
    if (checkLogic()) {
      screenShow(this);
      term = "";
    }
  });
  getElmClassBtnDot.click(function () {
    if (checkLogic()) {
      checkLogicDot();
    }
  });
}
// Hàm kiểm tra trong 1 phần tử đã có dấu chấm hay chưa .
function checkLogicDot() {
  for (let i = 0; i < term.length; i++) {
    if (term[i] == ".") {
      return;
    }
  }
  term += getElmClassBtnDot.text();
  calculation += getElmClassBtnDot.text();
  getElmClassDisplayText1.text(`${calculation}`);
}
// hàm check logic các dấu + - * / trong phép tính
let lastString;
function checkLogic() {
  lastString = calculation[calculation.length - 1];
  if (
    lastString != "+" &&
    lastString != "-" &&
    lastString != "÷" &&
    lastString != "×" &&
    lastString != "." &&
    lastString != undefined&&
    checkResult!=true
  ) {
    return true;
  }
}
// ham chuyen du lieu sang dang chuoi tinh toan duoc
function convertCalCulation() {
  let convertCalculation = 
  calculation.replaceAll("×", "*").replaceAll("÷", "/");
  return convertCalculation;
}

let checkResult = false;
// Ham  hien thi ket qua
function showResult() {
  getElmClassBtnEqual.click(function () {
    if (checkResult) {
      return;
    }
    if (checkLogic()) {
      if (
        eval(convertCalCulation()) == "Infinity" ||
        eval(convertCalCulation()) == "-Infinity"
      ) {
        getElmClassDisplayText2.text(`Không thể chia cho 0 !`);
      } else {
        getElmClassDisplayText2.text("");
        setTimeout(function () {
          getElmClassDisplayText2.text(`${eval(convertCalCulation())}`);
        }, 60);
      }
      checkResult = true;
      term = "";
    }
  });
}
OnOffCalculator();
clearCalculator();
getValueBtnShowScreen();
showResult();
