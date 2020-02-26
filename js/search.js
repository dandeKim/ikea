// focus
$(document).click(function() {
  if ($(".header_search input").is(":focus")) {
    $(".header_search .searched_keywords").show();
    $(".searched_keywords").click(function() {
      $(".header_search input").focus();
    });
  } else {
    $(".header_search .searched_keywords").hide();
  }
});

function getKeyword() {
  var keyJSON = localStorage.getItem("keyword");
  return JSON.parse(keyJSON);
}

function setKeyword(key) {
  var keyJSON = JSON.stringify(key);
  localStorage.setItem("keyword", keyJSON);
}

function date() {
  var date = new Date().toLocaleDateString();
  var time = new Date().toLocaleTimeString();
  return date + time;
}
date();

function printKeyword(key) {
  $(".searched_keywords").empty();
  if (key === null || !key.length) {
    $(".searched_keywords").prepend(`
            <span class="empty_keyword">최근 검색어가 없습니다.</span>
        `);
  } else {
    key.forEach(el => {
      $(".searched_keywords").prepend(`
        <span id="${el.date}"><a href="#">${el.keyword}</a><button type="button" class="material-icons del_btn">close</button></span>
      `);
    });
  }
}

var keyword = getKeyword();
if (keyword === null) {
  setKeyword([]);
}
printKeyword(keyword);

// save keyword
$(".header_search").submit(function() {
  var keyword = $(this)
    .find("input")
    .val();
  $(this)
    .find("input")
    .val("");
  if (keyword === "") {
    alert("검색어를 입력해주세요.");
  } else {
    var getKey = getKeyword();
    var keyList = {};
    keyList.date = date();
    keyList.keyword = keyword;

    getKey.push(keyList);
    setKeyword(getKey);
    printKeyword(getKey);
  }
});

// delete
$(".searched_keywords").on("click", ".del_btn", function() {
  var id = $(this)
    .parents("span")
    .attr("id");
  var getKey = getKeyword();

  for (const i in getKey) {
    if (getKey[i].date === id) {
      getKey.splice(i, 1);
      break;
    }
  }

  setKeyword(getKey);
  printKeyword(getKey);
});

// m_search
$(".m_header_right_icon button:nth-child(1)").click(function() {
  $(".m_search_box").toggleClass("active");
});
