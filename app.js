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
const getElmBtnC = $(".btn__C");
const getElmBtnSqrt = $(".btn__sqrt");

//ham tat bat calculator
// biến hiển thị nội dung người nhập lên màn hình :calcultor
let calculation = "";
// biến chứa lần lươt giá trị phần tử  mà người dùng nhập vào:term
let term = "";
let checkON = false;
let checkSqrt = true;
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
  convertCalculations = "";
  term = "";
  checkResult = false;
  checkSqrt = true;
  lastString = "";
  arraySqrt = [];
  arrayNoSqrt = [];
}

// Nut AC xoa gia tri
function clearCalculator() {
  getElmBtnCE.click(function () {
    resetValue();
  });
}
// ham xóa từng kí tự người dùng nhập vào
function clearOneValueCalculator() {
  getElmBtnC.click(function () {
    if (calculation.length != 0 && !checkResult)
      calculation = calculation.slice(0, -1);
    getElmClassDisplayText1.text(`${calculation}`);
    lastString = calculation[calculation.length - 1];
    if (!checkLogic2()) {
      checkSqrt = true;
    }
  });
}

// ham hien thi noi dung phep tinh ra man hinh
function screenShow(This) {
  calculation += $(This).text().trim();
  getElmClassDisplayText1.text(`${calculation}`);
  lastString = calculation[calculation.length - 1];
}
function screenShow2(This) {
  calculation = calculation.slice(0, -1);
  calculation += $(This).text().trim();
  getElmClassDisplayText1.text(`${calculation}`);
}
// ham lay gia tri cua cac nut roi hien thi len man hinh
function getValueBtnShowScreen() {
  $(".btn").click(function () {
    if (checkResult) {
      resetValue();
    }
    checkSqrt = false;
    screenShow(this);
    term += $(this).text().trim();
  });
  $(".btn1").click(function () {
    if (checkLogic1()) {
      checkSqrt = true;
      if (!checkLogic2()) {
        screenShow2(this);
      } else {
        screenShow(this);
      }
      term = "";
    }
  });
  getElmClassBtnDot.click(function () {
    if (checkLogic1() && checkLogic2()) {
      checkLogicDot();
    }
  });
  getElmBtnSqrt.click(function () {
    checkLogicSqrt();
  });
}
// Hàm kiểm tra trong 1 phần tử đã có dấu chấm hay chưa .
function checkLogicDot() {
  for (let i = 0; i < term.length; i++) {
    if (term[i] == ".") {
      return;
    }
  }
  checkSqrt = false;
  term += getElmClassBtnDot.text();
  calculation += getElmClassBtnDot.text();
  getElmClassDisplayText1.text(`${calculation}`);
}
getElmBtnSqrt;
// Hàm kiểm tra trong 1 phần tử đã có dấu chấm hay chưa .
function checkLogicSqrt() {
  for (let i = 0; i < term.length; i++) {
    if (term[i] == "√") {
      return;
    }
  }
  if (checkSqrt || typeof lastString == "undefined") {
    term += getElmBtnSqrt.text();
    calculation += getElmBtnSqrt.text();
    getElmClassDisplayText1.text(`${calculation}`);
  }
}

// hàm check logic các dấu + - * / trong phép tính
let lastString;
function checkLogic1() {
  lastString = calculation[calculation.length - 1];
  if (
    lastString != "√" &&
    lastString != "." &&
    lastString != undefined &&
    checkResult != true
  ) {
    return true;
  }
}
function checkLogic2() {
  if (
    lastString != "+" &&
    lastString != "-" &&
    lastString != "÷" &&
    lastString != "×"
  ) {
    return true;
  }
}

// hàm tìm mảng các  phần tử chứa căn bac 2
let arraySqrt = [];
function valueSqrt() {
  let tam = "√";
  for (let i = 0; i < calculation.length; i++) {
    if (calculation[i] == "√") {
      for (let j = i + 1; j < calculation.length; j++) {
        if (
          calculation[j] != "+" &&
          calculation[j] != "-" &&
          calculation[j] != "×" &&
          calculation[j] != "÷"
        ) {
          tam += calculation[j];
        } else {
          break;
          i = j;
        }
      }
      arraySqrt.push(tam);
      tam = "√";
    }
  }
}

// ham tính mảng các  giá trị phần tử co dấu can bac 2
let arrayNoSqrt = [];
function valueNoSqrt() {
  arrayNoSqrt = arraySqrt.map(function (data) {
    return squareRootOf2(data.slice(1));
  });
}
// ham chuyen du lieu sang dang chuoi tinh toan duoc
let convertCalculations;
function convertCalCulation() {
  valueSqrt();
  valueNoSqrt();
  for (let i = 0; i < arraySqrt.length; i++) {
    convertCalculations = calculation.replaceAll(
      `${arraySqrt[i]}`,
      `${arrayNoSqrt[i]}`
    );
  }
  if (convertCalculations) {
    convertCalculations = convertCalculations
      .replaceAll("×", "*")
      .replaceAll("÷", "/");
  } else {
    convertCalculations = calculation.replaceAll("×", "*").replaceAll("÷", "/");
  }
  return convertCalculations;
}
let checkResult = false;
// hàm tính căn bậc 2
function squareRootOf2(number) {
  return Math.sqrt(number);
}

// Ham  hien thi ket qua
function showResult() {
  getElmClassBtnEqual.click(function () {
    if (checkResult) {
      return;
    }
    if (checkLogic1() && checkLogic2()) {
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
// hàm click vào các nút
function clickBtnChangeBgColor() {
  $(".keyboard__item").mousedown(function () {
    $(this).css("backgroundColor", "rgb(199, 198, 198)");
  });
  $(".keyboard__item").mouseup(function () {
    $(this).css("backgroundColor", "rgb(217, 220, 223)");
  });
  $(".keyboard__item").mouseover(function () {
    $(this).css("backgroundColor", "rgb(217, 220, 223)");
  });
  $(".keyboard__item").mouseout(function () {
    $(this).css("backgroundColor", "aliceblue");
  });
}
OnOffCalculator();
clearCalculator();
clearOneValueCalculator();
getValueBtnShowScreen();
showResult();
clickBtnChangeBgColor();
