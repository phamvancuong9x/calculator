const getElmBtnOnOff = $(".btn__on-off");
const getElmBtnCE = $(".btn__CE");
const getElmClassDisplayText1 = $(".display-text1");
const getElmClassDisplayText2 = $(".display-text2");
const getElmClassScreenDisplayText = $(".screen__display-text");
//
const getElmClassBtn0 = $(".btn__0");
const getElmClassBtn1 = $(".btn__1");
const getElmClassBtn2 = $(".btn__2");
const getElmClassBtn3 = $(".btn__3");
const getElmClassBtn4 = $(".btn__4");
const getElmClassBtn5 = $(".btn__5");
const getElmClassBtn6 = $(".btn__6");
const getElmClassBtn7 = $(".btn__7");
const getElmClassBtn8 = $(".btn__8");
const getElmClassBtn9 = $(".btn__9");
const getElmClassBtnDivide = $(".btn__divide");
const getElmClassBtnMultiply = $(".btn__multiply");
const getElmClassBtnSubtract = $(".btn__subtract");
const getElmClassBtnEqual = $(".btn__equal");
const getElmClassBtnSum = $(".btn__sum");
const getElmClassBtnDot = $(".btn__dot");
//
let calculation = "";
let fixCalCulation = "";
let checkON = false;
function OnOffCalculator() {
  getElmBtnOnOff.click(function () {
    getElmClassScreenDisplayText.toggleClass("display-flex");
    calculation = "";
    fixCalCulation = "";
    getElmClassDisplayText1.text("");
    getElmClassDisplayText2.text("0");
  });
}
// Nut AC xoa gia tri
function clearCalculator() {
  getElmBtnCE.click(function () {
    getElmClassDisplayText1.text("");
    getElmClassDisplayText2.text("0");
    calculation = "";
    fixCalCulation = "";
  });
}
const getElmClassBtnNumber = [
  getElmClassBtn0,
  getElmClassBtn1,
  getElmClassBtn2,
  getElmClassBtn3,
  getElmClassBtn4,
  getElmClassBtn5,
  getElmClassBtn6,
  getElmClassBtn7,
  getElmClassBtn8,
  getElmClassBtn9,
];
const getElmBtn = [
  getElmClassBtnDivide,
  getElmClassBtnMultiply,
  getElmClassBtnSubtract,
  getElmClassBtnSum,
];
// ham lay gia tri cua cac nut roi hien thi len man hinh
let term = "";
function getValueBtnShowScreen() {
  for (let i = 0; i <= 9; i++) {
    getElmClassBtnNumber[i].click(function () {
      if (checkResult) {
        getElmClassDisplayText1.text("");
        getElmClassDisplayText2.text("0");
        calculation = "";
        fixCalCulation = "";
        term = "";
        checkResult = false;
      }
      term+= `${i}`;
      calculation += `${i}`;
      fixCalCulation += `${i}`;
      getElmClassDisplayText1.text(`${calculation}`);
    });
  }
  for (const value of getElmBtn) {
    value.click(function () {
      if (checkResult) {
        return;
      }
      if (checkLogic(calculation)) {
        term = "";
        calculation += value.text();
        getElmClassDisplayText1.text(`${calculation}`);
        if (value.text() == "÷") {
          fixCalCulation += "/";
        } else if (value.text() == "×") {
          fixCalCulation += "*";
        } else {
          fixCalCulation += value.text();
        }
      }
    });
  }
  getElmClassBtnDot.click(function () {
    if (checkResult) {
        return;
      }
    //   kiểm tra xem gia trị phần tử hiện tại có dấu '.' chưa nếu có rồi thì return ko thêm nữa;
    for (let i = 0; i < term.length; i++) {
        console.log(i+term[i])
      if (term[i] == ".") {
        return;
      }
    }
    term+= `.`;
    calculation += getElmClassBtnDot.text();
    getElmClassDisplayText1.text(`${calculation}`);
    fixCalCulation += getElmClassBtnDot.text();
  });
}
// hàm check logic*,/
function checkLogic(calculation) {
  const lastString = calculation[calculation.length - 1];
  const arrayCalculation = calculation.split("");
  if (
    lastString != "+" &&
    lastString != "-" &&
    lastString != "*" &&
    lastString != "/" &&
    lastString != "÷" &&
    lastString != "×" &&
    lastString != "." &&
    lastString != undefined
  ) {
    return true;
  }
}
let checkResult = false;
function showResult() {
  getElmClassBtnEqual.click(function () {
    if (checkResult) {
        return;
      }
    if (checkLogic(calculation)) {
      if (
        eval(fixCalCulation) == "Infinity" ||
        eval(fixCalCulation) == "-Infinity"
      ) {
        getElmClassDisplayText2.text(`Không thể chia cho 0 !`);
      } else {
        getElmClassDisplayText2.text('')
        setTimeout(function(){
            getElmClassDisplayText2.text(`${eval(fixCalCulation)}`);
        },60)
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
