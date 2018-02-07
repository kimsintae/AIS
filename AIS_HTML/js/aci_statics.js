
//슬라이드
var slideIndex = 1;
$(document).ready(function () {


    /* 분석 차트 */

    var chart = bb.generate({
            "size": {
                "height": 400,
                "width": 540
            },
            "data": {
                "columns": [
                    ["사망", 30, 200, 100, 400, 150, 250],
                    ["보행", 38, 240, 500, 200, 125, 23]
                ]
            },
            "bindto": "#older_aci"
        }

    );

    var chart = bb.generate({
        "size": {
            "height": 400,
            "width": 540
        },
        "data": {
            "columns": [
            ["어린이", 30, 200, 100, 400, 150, 250],
            ["노인", 130, 100, 140, 200, 150, 50]
            ],
            "type": "bar"
        },
        "axis": {
            "x": {
                "type": "category",
                "categories": [
                                "월",
                                "화",
                                "수",
                                "목",
                                "금",
                                "토",
                                "일"
                              ]
            }
        },
        "bar": {
            "width": {
                "ratio": 0.5
            }
        },
        "bindto": "#mudan_aci"
    });

    var chart = bb.generate({
        "size": {
            "height": 400,
            "width": 540
        },
        "data": {
            "columns": [
                ["data1", 300, 350, 300, 0, 0, 0],
                ["data2", 130, 100, 140, 200, 150, 50]
            ],
            "types": {
                "data1": "area",
                "data2": "area-spline"
            }
        },
        "bindto": "#car_aci",
        "title": {
             text: "2018",
             padding: {
                 top: 10,
                 right: 10,
                 bottom: 10,
                 left: 10
             },
             position: "top-center"
         }
    });

//최상단 체크박스 클릭
$(".checkall").click(function(){
    //클릭되었으면
    if($(".checkall").prop("checked")){
        //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
        $("input[name=graphType]").prop("checked",true);
        //클릭이 안되있으면
    }else{
        //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
        $("input[name=graphType]").prop("checked",false);
    }
});
    

//showSlides(slideIndex);
autoShowSlides();

}); //ready();

//슬라이드
function autoShowSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("aci_chart");
  var captionText = document.getElementById("caption");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1} 
    slides[slideIndex-1].style.display = "block"; 
    captionText.innerHTML = dots[slideIndex-1].title;
    setTimeout(autoShowSlides, 2000); // Change image every 2 seconds
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

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