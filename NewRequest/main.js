'use-strict';

// ---------------------------- Login ----------------------------
const loginView = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const siteTitle = document.querySelector('.site-title');
const user1 = {
  useName: 'satoru',
  departmentCode: 'LP224',
  phoneNumber: '5323',
};
const user2 = {
  useName: 'john',
  departmentCode: 'LP214',
  phoneNumber: '110',
};
const users = [user1, user2];
let currentAccount;
let currentDepartmentCode;

// loginForm イベント処理
loginForm.addEventListener('click', function (e) {
  e.preventDefault();
  if (!e.target.closest('.login-btn')) return;
  const inputDepartmentCode = e.target.parentNode.children[1].value;
  const inputUserName = e.target.parentNode.children[3].value;

  // ユーザー情報確認
  currentDepartmentCode = users.find(
    acc => acc.departmentCode === inputDepartmentCode
  );
  currentAccount = users.find(acc => acc.useName === inputUserName);
  if (!currentAccount || !currentDepartmentCode) {
    return alert('ユーザー情報がありません');
  }
  setTimeout(() => {
    loginView.classList.add('hidden');
    const html = `
    <p>こんにちは ${currentAccount.useName}さん</p>
    `;
    siteTitle.insertAdjacentHTML('beforeend', html);
    document.querySelector('.container').style.opacity = 1;
  }, 1000);
  loginForm.style.opacity = '0.2';
  loginView.style.scale = '1.4';
  console.log('login');
});

// ---------------------------- リクエスト Nav イベント処理 ----------------------------
const requestMenu = document.querySelector('.request-menu');
const requestList = document.querySelector('.request-list');
const requestNum = document.querySelector('.request-num');
const messageMenu = document.querySelector('.message-menu');
const messageList = document.querySelector('.message-list');
const messageNum = document.querySelector('.message-num');
const messageItem = document.querySelector('.message-item');
const tableList = document.querySelector('.table-list');
let curRequestNum = 0;
let curMessageNum = 0;
let mesureResult;

const toggleHidden = function (el) {
  el.classList.toggle('hidden');
};

// リクエスト・メッセージ数表示
const addRequestNum = function () {
  curRequestNum = requestNum.textContent =
    requestList.firstElementChild.childElementCount;
};
const addMessageNum = function () {
  curMessageNum = messageNum.textContent =
    messageList.firstElementChild.childElementCount;
};
addRequestNum();
addMessageNum();

// リクエスト・メッセージ表示
requestMenu.addEventListener('click', function () {
  if (curRequestNum === 0) {
    requestList.classList.add('hidden');
    alert('現在測定予約をしていません');
    return;
  } else {
    messageList.classList.add('hidden');
    toggleHidden(requestList);
  }
});
messageMenu.addEventListener('click', function () {
  if (curMessageNum === 0) {
    messageList.classList.add('hidden');
    alert('メッセージがありません');
    return;
  } else {
    requestList.classList.add('hidden');
    toggleHidden(messageList);
  }
});

const deleteEvent = function (e) {
  const deleteList = e.target.closest('.list-delete');
  if (!deleteList) return;
  deleteList.parentNode.remove();
};

// メッセージリスト削除
messageItem.addEventListener('click', e => {
  deleteEvent(e);
  addMessageNum();
});

// リクエストリスト削除
requestList.addEventListener('click', e => {
  deleteEvent(e);
  addRequestNum();
});

// ---------------------------- リクエスト 工程イベント処理 ----------------------------
const process = document.querySelectorAll('.process');
const slidesOuter = document.querySelectorAll('.slide-outer');
const slideInner = document.querySelectorAll('.slide-inner');
const slideInbord = document.querySelectorAll('.slide-inbord');
const outer = {
  slideNum: 0,
  maxSlide: slidesOuter.length,
};
const inner = {
  slideNum: 1,
  maxSlide: slideInner.length,
};
const inbord = {
  slideNum: 2,
  maxSlide: slideInbord.length,
};
const work = [outer, inner, inbord];
let workArry = new Array(work.length).fill(0);
let inputQuantity;

// スライドボタン処理
const goToSlide = function (workslides, curSlide) {
  workslides.forEach((slide, index) => {
    slide.style.transform = `translateX(${110 * (index - curSlide)}%)`;
  });
};
goToSlide(slidesOuter, 0);
goToSlide(slideInner, 0);
goToSlide(slideInbord, 0);

process.forEach(sec => {
  sec.addEventListener('click', function (e) {
    const item = e.target.closest('.item');
    const itemMachine = e.target.closest('.item-machine');
    const btnRight = e.target.closest('.right');
    const btnLeft = e.target.closest('.left');
    const btnHidden = e.target.closest('.process').firstElementChild;
    const requestBtn = e.target.closest('.request-btn');

    // スライドボタン右
    const nextSlide = function (slideNum, workslides, maxSlide) {
      if (workArry[slideNum] === maxSlide - 1) {
        workArry[slideNum] = 0;
        btnHidden.classList.add('hidden');
      } else {
        workArry[slideNum]++;
        btnHidden.classList.remove('hidden');
      }
      goToSlide(workslides, workArry[slideNum]);
    };
    // スライドボタン左
    const prevSlide = function (slideNum, workslides, maxSlide) {
      if (workArry[slideNum] === 0) {
        workArry[slideNum] = maxSlide - 1;
      } else {
        workArry[slideNum]--;
      }
      goToSlide(workslides, workArry[slideNum]);
    };

    // 機番クリック処理
    if (item) {
      const itemHidden = item.lastElementChild;
      itemMachine && toggleHidden(itemHidden);
    }

    //スライドボタン処理(右)
    if (btnRight) {
      if (e.target.parentNode.parentNode.id === 'outer') {
        nextSlide(outer.slideNum, slidesOuter, outer.maxSlide);
      }
      if (e.target.parentNode.parentNode.id === 'inner') {
        nextSlide(inner.slideNum, slideInner, inner.maxSlide);
      }
      if (e.target.parentNode.parentNode.id === 'inbord') {
        nextSlide(inbord.slideNum, slideInbord, inbord.maxSlide);
      }
    }

    //スライドボタン処理(左)
    if (btnLeft) {
      if (e.target.parentNode.parentNode.id === 'outer') {
        prevSlide(outer.slideNum, slidesOuter, outer.maxSlide);
      }
      if (e.target.parentNode.parentNode.id === 'inner') {
        prevSlide(inner.slideNum, slideInner, inner.maxSlide);
      }
      if (e.target.parentNode.parentNode.id === 'inbord') {
        prevSlide(inbord.slideNum, slideInbord, inbord.maxSlide);
      }
    }

    // 測定予約ボタン
    if (requestBtn) {
      const requestWork =
        e.target.closest('.process').parentNode.firstElementChild.textContent;
      const requestMachine =
        e.target.closest('.item-detail ').parentNode.firstElementChild
          .firstElementChild.textContent;
      const date = e.target.parentNode.children[1].children[1];
      const processNum =
        e.target.closest('.slide').firstElementChild.textContent;
      const nowDate = new Date();
      const hour = nowDate.getHours().toString().padStart(2, '0');
      const minute = nowDate.getMinutes().toString().padStart(2, '0');
      const requestDate = new Date(date.value);
      const requestHour = requestDate.getHours().toString().padStart(2, '0');
      const requestMinute = requestDate
        .getMinutes()
        .toString()
        .padStart(2, '0');

      // 完了希望時間が空欄の場合
      if (date.value === '') {
        alert('完了希望時間を記入してください');
        return;
        // 完了希望時間が現在の時間より前の場合
      } else if (requestDate <= nowDate) {
        alert('完了希望時間を入力し直してください');
        return;
      } else {
        e.preventDefault();
        inputQuantity = e.target.parentNode.children[0].children[1].value;
        const itemHidden = e.target.parentNode;
        const request = `<li>${requestWork} <br />${requestMachine}<button class="list-delete">削除</button></li>`;
        requestList.firstElementChild.insertAdjacentHTML('afterbegin', request);
        addRequestNum();
        alert(`${requestWork} ${requestMachine} の測定予約をしました`);
        toggleHidden(itemHidden);
        date.value = '';
        const tableListItem = `
        <li>
          <div class="work-detail">
            <h2>${requestWork}</h2>
            <h3>${processNum}</h3>
            <p>${requestMachine}</p>
          </div>
          <div class="time">
            <p>受付時間 ${hour} : ${minute}</p>
            <p>完了希望時間 ${requestHour} : ${requestMinute}</p>
          </div>
          <div class="request-detail">
            <p class="detail"><span>&gt;</span> 詳細を確認</p>
            <div class="result">
            <button class="ok">合格</button>
            <button class="ng">不合格</button>
            </div>
          </div>
        </li>
        `;
        tableList.insertAdjacentHTML('afterbegin', tableListItem);
        addTableNum();
      }
    }
  });
});

// ---------------------------- Request Table ----------------------------
// 測定依頼状況数表示
const tableNum = document.querySelector('.table-num');
const mesurementDetail = document.querySelector('.mesurement-detail');
// ワーク情報
const work1 = {
  workName: 'アウター',
  partnumber: '43454 - 48020',

  process10: {
    purpose: '刃具交換',
    measurementItem: ['肩端面 ～ ねじ先端距離', '肩端面 ～ S/P先端距離'],
  },
  process20: {
    purpose: '転造刃具交換',
    measurementItem: ['スプライン長さ'],
  },
  process30: {
    purpose: '刃具交換',
    measurementItem: ['カシメ溝R形状', 'カシメ溝深さ', 'カシメ溝角度'],
  },
  process40: {
    purpose: 'コイル交換',
    measurementItem: ['表硬', '焼き入れ深さ', 'ねじり強度'],
  },
  process50: {
    purpose: '刃具交換',
    measurementItem: ['外径', '端面角度', 'R形状'],
  },
  process60: {
    purpose: '刃具交換',
    measurementItem: ['PCR測定', 'ボール溝接触角', '面取り'],
  },
};
const work2 = {
  workName: 'インナー',
  partnumber: '43452 - 48010',

  process10: {
    purpose: '刃具交換',
    measurementItem: ['端面R形状', '端面距離', '端面部角度'],
  },
  process20: {
    purpose: '刃具交換',
    measurementItem: ['外球径', '端面角度'],
  },
  process30: {
    purpose: '刃具交換',
    measurementItem: ['BBD', 'スプライン小径', 'スプライン大径'],
  },
  process40: {
    purpose: '焼き入れコイル交換',
    measurementItem: [
      'BBD（焼き後）',
      'スプライン小径（焼き後）',
      'スプライン大径（焼き後）',
    ],
  },
};
const work3 = {
  workName: 'インボード',
  partnumber: '43418 - 48010',

  process10: {
    purpose: '刃具交換',
    measurementItem: [
      '端面 ～ ブッシュ部長手',
      '端面 ～ O/S部長手',
      '端面 ～ カップ端面長手',
      'ブーツ溝形状',
    ],
  },
  process20: {
    purpose: '刃具交換',
    measurementItem: ['バリ幅(径方向)', 'バリ幅(軸方向)'],
  },
  process30: {
    purpose: '転造刃具交換',
    measurementItem: ['スプライン長さ'],
  },
  process40: {
    purpose: '洗浄ノズル調整',
    measurementItem: ['表硬', '焼き入れ深さ', 'ねじり強度'],
  },
};
const works = [work1, work2, work3];

let curTableNum = 0;
// 依頼件数の表示
const addTableNum = function () {
  curTableNum = tableNum.textContent = tableList.childElementCount;
};
addTableNum();

// 各測定依頼テーブル処理
tableList.addEventListener('click', function (e) {
  const targetList = e.target.closest('.request-detail');
  if (!targetList) return;
  const inputWorkName =
    targetList.parentNode.firstElementChild.firstElementChild.textContent;
  const inputProcessNum =
    targetList.parentNode.firstElementChild.children[1].textContent;
  const inputMachine =
    targetList.parentNode.firstElementChild.children[2].textContent;
  const inputCompleteTimeText =
    targetList.parentNode.children[1].children[1].textContent;
  const inputCompleteTime = inputCompleteTimeText.slice(
    inputCompleteTimeText.indexOf('時間') + 3
  );

  const createHtml = function (mesureResult) {
    return (html = `
    <li>${inputWorkName}<br />${inputMachine}
      <p  style = "background-color:${
        mesureResult === '合格' ? 'rgb(52, 130, 247)' : 'rgb(228, 76, 76)'
      };" class="result">${mesureResult}</p>
      <button class="list-delete">削除</button>
    </li>
    `);
  };
  // 詳細確認処理
  if (e.target.closest('.detail')) {
    const measurementTable = document.querySelector('.mesurement-table');
    const inputDetail = works.find(work => work.workName === inputWorkName);
    let purpose;
    let measurementItem;

    const createListItem = function (measurementItem) {
      setTimeout(() => {
        const mesureItemList = document.querySelector('.mesure-item');
        measurementItem.forEach(item => {
          const list = document.createElement('li');
          list.append(item);
          mesureItemList.append(list);
        });
      }, 100);
    };
    // 10工程
    if (inputProcessNum === '10工程') {
      purpose = inputDetail.process10.purpose;
      measurementItem = inputDetail.process10.measurementItem;
    }
    // 20工程
    if (inputProcessNum === '20工程') {
      purpose = inputDetail.process20.purpose;
      measurementItem = inputDetail.process20.measurementItem;
    }
    // 30工程
    if (inputProcessNum === '30工程') {
      purpose = inputDetail.process30.purpose;
      measurementItem = inputDetail.process30.measurementItem;
    }
    // 40工程
    if (inputProcessNum === '40工程') {
      purpose = inputDetail.process40.purpose;
      measurementItem = inputDetail.process40.measurementItem;
    }
    // 50工程
    if (inputProcessNum === '50工程') {
      purpose = inputDetail.process50.purpose;
      measurementItem = inputDetail.process50.measurementItem;
    }
    // 60工程
    if (inputProcessNum === '60工程') {
      purpose = inputDetail.process60.purpose;
      measurementItem = inputDetail.process60.measurementItem;
    }
    mesurementDetail.classList.toggle('hidden');
    measurementTable.lastElementChild.remove();
    const html = `
    <table>
      <tr>
        <th>依頼部署</th>
        <th>依頼者</th>
        <th>連絡先</th>
      </tr>
      <tr>
        <td>${currentAccount.departmentCode}</td>
        <td>${currentAccount.useName}</td>
        <td>${currentAccount.phoneNumber}</td>
      </tr>
      <tr>
        <th>品番</th>
        <td colspan="2">${inputDetail.partnumber}</td>
      </tr>
      <tr>
        <th>品名</th>
        <td colspan="2">${inputDetail.workName}</td>
      </tr>
      <tr>
        <th>数量</th>
        <td colspan="2">${inputQuantity || '1'}</td>
      </tr>
      <tr>
        <th>目的</th>
        <td colspan="2">${purpose}</td>
      </tr>
      <tr>
        <th>機番</th>
        <td colspan="2">${inputMachine}</td>
      </tr>
      <tr>
        <th>完了希望</th>
        <td colspan="2">${inputCompleteTime}</td>
      </tr>

      <tr>
        <td colspan="3">
          <h4>< 測定項目 ></h4>
          <ul class="mesure-item">
             
          </ul>
        </td>
      </tr>
    </table>
    `;
    measurementTable.insertAdjacentHTML('beforeend', html);
    createListItem(measurementItem);
  }
  //測定結果処理
  const resultBtn = function (mesureResult) {
    if (window.confirm(`${mesureResult}通知後、リストを削除します`)) {
      e.target.parentNode.parentNode.parentNode.remove();
      createHtml(mesureResult);
      messageItem.insertAdjacentHTML('afterbegin', html);
      addMessageNum();
      addTableNum();
    }
  };
  // 合格ボタン処理
  if (e.target.closest('.ok')) {
    mesureResult = '合格';
    resultBtn(mesureResult);
    // 不合格ボタン処理
  } else if (e.target.closest('.ng')) {
    mesureResult = '不合格';
    resultBtn(mesureResult);
  }
});

// 詳細確認を閉じる
const closeBtn = document.querySelector('.round_btn');
closeBtn.addEventListener('click', function () {
  mesurementDetail.classList.add('hidden');
});
