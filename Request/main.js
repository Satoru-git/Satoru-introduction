'use strict';

const inputWork = document.querySelector('#partname');
const inputWorkNum = document.querySelector('.partnumber--text');
const measurementList = document.querySelector('.measurement-list');
const porpose = document.querySelector('#porpose');
const requestDt = document.querySelector('#request-dt');
const requestPerson = document.querySelector('#request-person');
const requestPhone = document.querySelector('#request-phone');
const qty = document.querySelector('#qty');
const machineNum = document.querySelector('#machine-num');
const hopeComplete = document.querySelector('#hope-complete');
const partnumberText = document.querySelector('.partnumber--text');
const requestBtn = document.querySelector('.request-btn');
const previousBtn = document.querySelector('.previous-data');
const addTable = document.querySelector('tbody');
const popupImg = document.querySelector('.img');
const popupMask = document.querySelector('.mask');
const popupCloseBtn = document.querySelector('.closebtn');
const previousData = JSON.parse(localStorage.getItem('requestData'));
const numberOfRequest = document.querySelector('.number-of-Request');
const tbody = document.querySelector('tbody');
const now = new Date();
let inputworkName;

// ***********************  測定依頼書  ***********************
const work1 = {
  workNames: 'ボディAssy',
  partnumber: '23107 - 36080',
  measurementItem: ['真円度', '円筒度', '真直度', '面粗度'],
};

const work2 = {
  workNames: 'インボード',
  partnumber: '43418 - 48020',
  measurementItem: [
    '真円度',
    '円筒度',
    '研磨範囲',
    '面粗度',
    '筋目角度',
    '研磨焼け',
  ],
};
const work3 = {
  workNames: 'アウター',
  partnumber: '43405 - 48090',
  measurementItem: ['面粗度', '研磨焼け'],
};

const works = [work1, work2, work3];

const valueData = [
  requestDt,
  requestPerson,
  requestPhone,
  inputWork,
  porpose,
  qty,
  machineNum,
  hopeComplete,
];

// 測定項目追加
const addList = function (measurementItem) {
  measurementList.textContent = '';
  measurementItem.forEach(item => {
    const listitem = document.createElement('li');
    listitem.append(item);
    measurementList.append(listitem);
  });
};
// 測定項目削除
const removeList = function () {
  while (measurementList.firstChild) {
    measurementList.removeChild(measurementList.firstChild);
  }
};

// 品名変更
inputWork.addEventListener('change', function () {
  inputworkName = inputWork.value;
  if (inputworkName === '') {
    inputWorkNum.textContent = '';
    qty.value = '';
  } else {
    works.forEach(work => {
      if (inputworkName === work.workNames) {
        inputWorkNum.textContent = work.partnumber;
        inputWorkNum.style.color = 'black';
        qty.value = '1';
        porpose.value !== '' && addList(work.measurementItem);
      }
    });
  }
});

// 目的変更
porpose.addEventListener('change', function () {
  if (inputworkName === undefined) return;
  if (porpose.value === '') removeList();
  else {
    works.forEach(work => {
      inputworkName === work.workNames && addList(work.measurementItem);
    });
  }
});

// リセット
const reset = function () {
  valueData.forEach(item => (item.value = ''));
  partnumberText.textContent = '自動入力';
  partnumberText.style.color = 'gray';
  removeList();
};

// 前回複写ボタン
previousBtn.addEventListener('click', function (e) {
  if (!e.isTrusted) return;
  // ローカルストレージ読み込み
  for (const [key, item] of Object.entries(previousData)) {
    if (key === 'requestDt') requestDt.value = item;
    if (key === 'requestPerson') requestPerson.value = item;
    if (key === 'requestPhone') requestPhone.value = item;
    if (item !== '自動入力' && key === 'partnumberText') {
      partnumberText.innerText = item;
      partnumberText.style.color = 'black';
    }
    if (key === 'inputWork') {
      inputWork.value = item;
      works.forEach(work => {
        item === work.workNames && addList(work.measurementItem);
      });
    }
    if (key === 'porpose') porpose.value = item;
    if (key === 'qty') qty.value = item;
    if (key === 'machineNum') machineNum.value = item;
    if (key === 'hopeComplete') hopeComplete.value = item;
  }
});

// 受付依頼
const requestMotion = function (e) {
  if (valueData.some(item => item.value === '')) {
    alert('未入力があります');
    return;
  }
  e.preventDefault();
  const dataValue = {
    requestDt: requestDt.value,
    requestPerson: requestPerson.value,
    requestPhone: requestPhone.value,
    partnumberText: partnumberText.innerText,
    inputWork: inputWork.value,
    porpose: porpose.value,
    qty: qty.value,
    machineNum: machineNum.value,
    hopeComplete: hopeComplete.value,
  };
  // ローカルストレージ保存
  localStorage.setItem('requestData', JSON.stringify(dataValue));
  // テーブル追加
  const requestDay = new Date(hopeComplete.value);
  const html = `
      <tr class="request-list">
      <td class="fake-img">
                <button class="fake-img--button">
                  <img src="./img/依頼書1.png" alt="" />
                </button>
              </td>
        <td>${inputWork.value}</td>      
        <td>${porpose.value}</td>
        
        <td>${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now
    .getHours()
    .toString()
    .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}</td>
    <td>${requestDay.getFullYear()}/${
    requestDay.getMonth() + 1
  }/${requestDay.getDate()} ${requestDay
    .getHours()
    .toString()
    .padStart(2, '0')}:${requestDay
    .getMinutes()
    .toString()
    .padStart(2, '0')}</td>
        <td>${requestPerson.value}</td>
        <td>
          <select name="result" id="result">
            <option value="未測定">未測定</option>
            <option value="OK">OK</option>
            <option value="NG">NG</option>
          </select>
        </td>
        <td>
          <button class="info-deploy">済</button>
        </td>
      </tr>
  `;
  addTable.insertAdjacentHTML('afterbegin', html);
  updataRequest();
  alert('依頼を予約しました。ワークの入検をお願いします');
  reset();
};

// エンターキーでの受付依頼
window.document.onkeydown = function (e) {
  if (e.key === 'Enter') {
    requestMotion(e);
  }
};
// 受付依頼ボタン
requestBtn.addEventListener('click', function (e) {
  requestMotion(e);
});

// ***********************  受付依頼テーブル  ***********************

// 依頼件数表示
const updataRequest = function () {
  const currentRequest = tbody.childElementCount;
  numberOfRequest.textContent = `依頼件数 : ${currentRequest} 件`;
};

// ポップアップを閉じる
const popupClose = function () {
  popupImg.classList.add('hidden');
  popupMask.classList.add('hidden');
};

// 各テーブル処理
addTable.addEventListener('click', function (e) {
  // 合否
  if (e.target === e.target.closest('#result')) {
    const target = e.target.closest('#result');
    target.addEventListener('change', function () {
      if (target.value === 'OK') {
        target.style.backgroundColor = '#0093e9';
        target.style.color = 'white';
        target.parentElement.style.backgroundColor = '#0093e9';
      } else if (target.value === 'NG') {
        target.style.backgroundColor = 'rgb(245, 70, 70)';
        target.style.color = 'white';
        target.parentElement.style.backgroundColor = 'rgb(245, 70, 70)';
      } else if (target.value === '未測定') {
        target.style.backgroundColor = 'white';
        target.style.color = 'black';
        target.parentElement.style.backgroundColor = 'white';
      }
    });
    // 情報展開済ボタン
  } else if (e.target === e.target.closest('.info-deploy')) {
    const target = e.target.closest('.info-deploy');
    const answer = window.confirm('削除してもよろしいですか？');
    if (answer === true) {
      target.closest('.request-list').remove();
      updataRequest();
    }
    // 依頼書ポップアップ
  } else if (e.target === e.target.closest('img')) {
    popupImg.classList.remove('hidden');
    popupMask.classList.remove('hidden');
  }
});

popupMask.addEventListener('click', popupClose);
popupCloseBtn.addEventListener('click', popupClose);
