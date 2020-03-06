# IKEA
<div>
    <img src="https://user-images.githubusercontent.com/60219368/76086719-00e8b400-5ff8-11ea-9e00-cfaf3ca898bc.jpg" width="70%" title="ikea_pc" alt="ikea_pc"></img>
    <img src="https://user-images.githubusercontent.com/60219368/76086804-31c8e900-5ff8-11ea-9af1-98ac508cba00.jpg" width="20%" title="ikea_mobile" alt="ikea_mobile"></img>
</div>

## index

- [intro](#intro)
- [ikea.js](#ikeajs)
- [shopping.js](#shoppingjs)
- [product.js](#productjs)
- [search.js](#searchjs)

---------------------------

## intro
- 프로젝트 소개
    - IKEA 사이트 리뉴얼
    - 반응형 웹
    - HTML, CSS(SASS), JavaScript, Jquery 

- 페이지
    - 메인 페이지
    - 로그인 페이지

- <a href="https://www.ikea.com/kr/ko/" target="_blank">기존 사이트</a>
- <a href="https://ofkande.github.io/ikea/" target="_blank">리뉴얼 사이트</a>

## ikea.js
- **Main Slide** : swiper 플러그인 사용
- **GNB** 
    - 모든 제품 클릭 시 기본적으로 '소파·의자·테이블'(1 depth) 메뉴에 active를 줌
    - active 된 메뉴의 2 depth 메뉴가 우측에 나타남
    - 1 depth 메뉴 클릭 시, 클릭한 메뉴의 top 값을 구해 `.gnb_active_product`의 높이로 지정<br>
    (mobile에서는 초기 active를 제거)

```javascript
    $(".all_products_list li").on("click", function(e) {
        e.preventDefault();
        if ($(this).hasClass("active") && $(window).innerWidth() < 767) {
            $(this).removeClass("active");
        } else {
        $(".all_products_list li").removeClass("active");
            $(this).addClass("active");
            var menuTop = $(this).position().top;
            var scrollTop = $(".all_products_list").scrollTop();
            $(".gnb_active_product").css({
                top: menuTop + scrollTop
            });
        }
        changeListWidth();
    });
```
- **GNB(mobile)**
    - 범위 : `$(window).innerWidth() < 767`
    - `.gnb`, `.all_products_list`, `.gnb_bg`의 상태를 `display : none;`으로 바꿔줌 (초기화)
    - 메뉴 버튼 클릭 시 
        - `.gnb`, `.all_products_list`, `.gnb_bg`, `.m_menu_bg`에 toggle() 메소드 사용
        - 메뉴 버튼의 아이콘 변경
        - `.all_products_list`, `.gnb_bg`의 높이를 window의 높이에 맞춰 설정
    - 1depth 메뉴 클릭시
        - active인 1depth메뉴의 화살표 아이콘에 `.active` (rotate 효과)
        - 2depth 메뉴가 펼쳐짐 (CSS에서 height 변경)
        

- `searchRolling()` : 실시간 검색어에 rolling 애니메이션을 주기 위한 함수
    - margin-top을 이용해 li가 위로 올라가는 효과를 줌
    - 반복을 위해 가장 상단의 li를 맨 뒤로 이동시킴
    - 3초 간격으로 함수 실행

``` javascript
    function searchRolling() {
    $(".search_keyword_list")
        .stop(true)
        .animate({
            "margin-top": -21
        },
        function() {
            $(".search_keyword_list li").first().appendTo(".search_keyword_list");
            $(".search_keyword_list li").removeClass("active");
            $(".search_keyword_list li").first().addClass("active");
            $(".search_keyword_list").css("margin-top", 0);
        });
    }

    var play = setInterval(searchRolling, 3000);
```

- 그 외 함수들

| 함수명 | 기능 |
|---|---|
|`changeListWidth()`|window의 넓이에 따라 `.all_products_list_child` (gnb 2depth 메뉴)의 넓이를 바꿔줌|
|`keywordShow()`| - 실시간 검색어의 전체 리스트를 보여주기 위한 함수 <br> - 현재 rolling에 보이는 li를 찾아 `.active`를 붙임  |
|`keywordHide()`| - 실시간 검색어의 전체 리스트를 숨기기 위한 함수 <br> - li의 `.active`를 제거|

## shopping.js
- 상품에 hover시 나타나는 버튼(좋아요/장바구니)을 눌렀을 때 해당 아이콘을 상품 이미지의 중앙에 띄움
- 아이콘에 애니메이션 효과를 줘서 사라지게 함
```javascript
    $(".click_like").animate({
        "font-size": 0,
        opacity: 0
    },900);
``` 

## product.js
- **이달의 인기 제품**
    - `windowW < 900`일 때 swiper 객체 생성
    - 클릭한 메뉴의 상품을 `productList` 배열에서 찾아 반복문을 통해 출력
    ```javascript
        for (const i in productList[index]) {
            $(".best_products_list .swiper-wrapper").append(`
                <div class="best_product swiper-slide">
                    <div class="product_img">
                        <a href="#!"><img src="${productList[index][i].img}" alt="">
                            <span class="blind">${productList[index][i].name}<span>
                        </a>
                        <div class="product_hover_bg">
                            <button class="material-icons like">favorite_border</button>
                            <button class="material-icons-outlined cart">shopping_cart</button>
                        </div>
                    </div>
                    <dl>
                        <dt>${productList[index][i].shop}</dt>
                        <dd>${productList[index][i].name}</dd>
                        <dd>${numberWithCommas(productList[index][i].price)}원</dd>
                    </dl>
                </div>
            `);
        }
    ```
    - 초기에는 첫 번째 메뉴(가구)의 상품을 보여줌 `$(".best_products li").eq(0).click();`

- **오늘의 공간**
    - 섬네일 이미지를 눌렀을 때 왼쪽의 화면에 누른 이미지가 뜨도록 src 변경
    - `<object>`태그를 사용해서 SVG를 불러옴
        > `<object>`태그를 사용하면 CSS 조작, JS 조작, SVG 조작, 인터렉티브 SVG 애니메이션이 모두 가능하므로 SVG를 최대한 활용할 수 있다.

    ```html
      <object data="img/today/today1.svg" type="image/svg+xml" class="svg" id="placeObj"></object>
    ```

    - 클릭한 제품의 상세 정보가 오른쪽의 제품 영역에 뜨도록 함
        - `$(window).innerWidth() < 1120`일 때는 팝업 형식으로 뜸

- `placeProduct()` : AJAX통신으로 JSON파일을 불러와 id가 일치하는 상품을 출력 
``` javascript
    function placeProduct(id) {
        $.ajax({
            url: "js/place_product.json",
            success: function(data){
            for (const i in data){
                if (data[i].id === id){
                    $(".place_product").empty();
                    $(".place_product").prepend(`
                        <div class="product_img">
                            <a href="#"><img src=${data[i].img} alt=""><span class="blind">${data[i].product}<span></a>
                            <div class="product_hover_bg">
                                <button class="material-icons like">favorite_border</button>
                                <button class="material-icons-outlined cart">shopping_cart</button>
                            </div>
                        </div>
                        <dl>
                            <dt>${data[i].name}</dt>
                            <dd>${data[i].product}</dd>
                            <dd>${data[i].price}원</dd>
                        </dl>
                        <button class="material-icons close">close</button>
                    `);
                    break;
                }
            }
            }
        });
    }
```

- 그 외 함수들

| 함수명 | 기능 |
|---|---|
|numberWithCommas(x)| 정규표현식을 이용해 3자리 수마다 콤마(,)를 찍어줌|
|placeCircle()| window 사이즈에 따라 원의 색과 크기를 변경해줌|

## search.js
- 검색창에 focus가 발생했을 때, 최근 검색어 목록을 보여줌
- 검색창이 아닌 다른 영역을 클릭하면 최근 검색어 목록을 숨김
```javascript
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
```
- **검색어 입력**
    - 검색창에서 submit이 발생했을 때 값이 없다면 '검색어를 입력해주세요.' 경고창을 출력
    - 값이 있다면 저장소에 저장 및 최근 검색어 목록에 출력
```javascript
    $(".header_search").submit(function() {
    var keyword = $(this).find("input").val();
    $(this).find("input").val("");
    if (keyword === ""){
        alert("검색어를 입력해주세요.");
    } else{
        var getKey = getKeyword();
        var keyList = {};
        keyList.date = date();
        keyList.keyword = keyword;

        getKey.push(keyList);
        setKeyword(getKey);
        printKeyword(getKey);
    }
    });
```
- **검색어 삭제**
    - 검색어 삭제 버튼을 누르면 id를 비교해 해당 검색어만 삭제 후 다시 저장
```javascript
    $(".searched_keywords").on("click", ".del_btn", function(){
        var id = $(this).parents("span").attr("id");
        var getKey = getKeyword();
        for (const i in getKey){
            if (getKey[i].date === id) {
                getKey.splice(i, 1);
                break;
            }
        }
        setKeyword(getKey);
        printKeyword(getKey);
    });
```

- 그 외 함수들

| 함수명 | 기능 |
|---|---|
|setKeyword(key)| 검색창에 입력한 키워드를 localStorage에 저장|
|getKeyword()| localStorage에서 키워드를 가져옴|
|date()| id로 사용할 현재 날짜와 시각을 구함|
|printKeyword(key)|저장된 키워드를 최근 검색어 목록에 출력 <br> 만약 저장된 키워드가 없다면 '최근 검색어가 없습니다.' 출력|