var view;
var map;
$(document).ready(function () {

    var areas = {

        "seoul": ["강남구", "강동구", "강북구", "강서구", "관악구",
                      "광진구", "구로구", "금천구", "노원구", "도봉구",
                      "동대문구", "동작구", "마포구", "서대문구", "서초구",
                      "성동구", "성북구", "송파구", "양천구", "영등포구",
                      "용산구", "은평구", "종로구", "중구", "중랑구"],
        "jeju": ["제주시", "서귀포시"],
        "incheon": ["계양구", "남구", "남동구", "동구", "부평구",
                        "서구", "연수구", "중구", "강화군", "옹진군"],
        "daejeon": ["대덕구", "동구", "서구", "유성구", "중구", ],
        "daegu": ["남구", "달서구", "동구", "북구", "서구",
                      "수성구", "중구", ],
        "busan": ["강서구", "금정구", "남구", "동구", "동래구",
                      "부산진구", "북구", "사상구", "사하구", "서구",
                      "수영구", "연제구", "영도구", "중구", "해운대구"],
        "ulsan": ["남구", "동구", "북구", "중구", "울주군"],
        "kwangju": ["광산구", "남구", "동구", "북구", "서구"],
        "kyngki": ["고양시", "과천시", "광명시", "광주시", "구리시",
                       "군포시", "김포시", "남양주시", "동두천시", "부천시",
                       "성남시", "수원시", "시흥시", "안산시", "안성시",
                       "안양시", "양주시", "여주시", "오산시", "용인시",
                       "의왕시", "의정부시", "이천시", "파주시", "파주시",
                       "평택시", "포천시", "하남시", "화성시", "가평군",
                       "양평군", "연천군", ],
        "chungnam": ["공주시", "계룡시", "논산시", "당진시", "보령시",
                         "서산시", "아산시", "천안시", "금산군", "부여군",
                         "서천군", "예산군", "청양군", "태안군", "홍성군"],
        "chungbuk": ["제천시", "청주시", "충주시", "괴산군", "단양군",
                         "보은군", "영동군", "옥천군", "음성군", "증평군",
                         "진천군"],
        "kangwon": ["강릉시", "동해시", "삼척시", "속초시", "원주시",
                        "춘천시", "태백시", "고성군", "양구군", "양양군",
                        "영월군", "인제군", "정선군", ],
        "kyngnam": ["거제시", "김해시", "밀양시", "사천시", "양산시",
                        "진주시", "창원시", "통영시", "거창군", "고성군",
                        "남해군", "산청군", "의령군", "창녕군", "하동군",
                        "함안군", "함양군", "합천군"],
        "kyngbuk": ["경산시", "경주시", "구미시", "김천시", "문경시",
                        "상주시", "안동시", "영주시", "영천시", "포항시",
                        "고령군", "군위군", "봉화군", "성주군", "영덕군",
                        "영양군", "예천군", "울릉군", "울진군", "의성군",
                        "청도군", "청송군", "칠곡군"],
        "jeonnam": ["광양시", "나주시", "목포시", "순천시", "여수시",
                        "강진군", "고흥군", "곡성군", "구례군", "담양군",
                        "무안군", "보성군", "신안군", "영광군", "영암군",
                        "완도군", "장성군", "장흥군", "진도군", "함평군",
                        "해남군", "화순군"],
        "jeonbuk": ["군산시", "김제시", "남원시", "익산시", "전주시",
                        "정읍시", "고창군", "무주군", "부안군", "순창군",
                        "완주군", "임실군", "장수군", "진안군"]
    };

    $("#sido_type").change(function () {
        $("#sigugun_type").empty();
        $("#sigugun_type").append("<option value='default'>시도군을 선택해주세요!</option>");
        for (var i = 0; i < areas[$(this).val()].length; i++) {

            $("#sigugun_type").append("<option value=''>" + areas[$(this).val()][i] + "</option>");
        }
    });




    //지도

    view = new ol.View({
        //                          longitude    latitude 
        center: ol.proj.fromLonLat([127.8531913, 35.5807185]),
        zoom: 12
    });


    //center(x,y) x 소수점 자리 올리면 오른쪽으로 이동, y 소수점 자리 올리면 위로 이동 
    map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: view
    });




});

//현재위치
function getLocation() {
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            //현재위치 좌표
            //alert(position.coords.latitude + ' ' + position.coords.longitude);

            flyTo(ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]), function () {});
        }, function (error) {
            console.error(error);
        }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
        });
    } else {
        alert('GPS를 지원하지 않습니다');
    }
}



//지정된 위치로 이동
function flyTo(location, done) {
    var duration = 2000;
    var zoom = view.getZoom();
    var parts = 2;
    var called = false;

    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    }
    view.animate({
        center: location,
        duration: duration
    }, callback);
    view.animate({
        zoom: zoom - 1,
        duration: duration / 2
    }, {
        zoom: zoom,
        duration: duration / 2
    }, callback);
}