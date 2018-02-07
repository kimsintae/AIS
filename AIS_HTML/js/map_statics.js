//슬라이드
var slideIndex = 1;

var vmap;
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
            $("#sigugun_type").append("<option value='"+areas[$(this).val()][i]+"'>" + areas[$(this).val()][i] + "</option>");
        }
        
        //14132818.062706212,4518196.494315397 (좌우,상하);
        switch($(this).val()){
            case 'seoul' :
                move(14132818.062706212,4518196.494315397,11);
                break;
            case 'jeju' :
                move(14088855.430004759,3950341.7580767134,11);
                break;
            case 'incheon' :
                move(14099835.663393619,4505268.1150528025,11);
                break;
            case 'daejeon' :
                move(14183059.565026853,4349097.835558095,11);
                break;
            case 'daegu' :
                move(14311520.740294414,4280893.709901185,11);
                break;
            case 'busan' :
                move(14360410.256899985,4186268.1275908407,11);
                break;
            case 'ulsan' :
                move(14391546.32960681,4240542.595679611,11);
                break;
            case 'kwangju' :
                move(14115333.26233923,4184420.2311038882,11);
                break;
            case 'chungnam' :
                move(14083740.36783804,4379157.072613827,9);
                break;
            case 'chungbuk' :
                move(14200112.973144941,4395792.640335675,9);
                break;  
            case 'kangwon' :
                move(14245142.78696988,4552107.693377906,9);
                break;  
            case 'kyngnam' :
                move(14245327.054122992,4219744.381491814,9);
                break;  
            case 'kyngbuk' :
                move(14331728.968208285,4343478.350122426,9);
                break;  
            case 'jeonnam' :
                move(34.9331267,126.8180731,9);
                break;  
            case 'jeonbuk' :
                move(14127554.873386139,4260855.494898221,9);
                break;    
   

        }
    });



 
  vw.ol3.MapOptions = {
      basemapType: vw.ol3.BasemapType.GRAPHIC
    , controlDensity: vw.ol3.DensityType.EMPTY
    , interactionDensity: vw.ol3.DensityType.BASIC
    , controlsAutoArrange: true
    , homePosition: vw.ol3.CameraPosition
    , initPosition: vw.ol3.CameraPosition
   }; 
     
vmap = new vw.ol3.Map("vmap",  vw.ol3.MapOptions); 


//지도 이동
  function move(x,y,z){
       var _center = [ x, y ];

       var z = z;
       var pan = ol.animation.pan({
        duration : 500,
        source : (vmap.getView().getCenter())
       });
       vmap.beforeRender(pan);
       vmap.getView().setCenter(_center);
       vmap.getView().setZoom(z);
       //setTimeout("fnMoveZoom()", 500);
  }

  function fnMoveZoom() {
       zoom = vmap.getView().getZoom();
       if (16 > zoom) {
        vmap.getView().setZoom(14);
       }

  };

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

}); //ready();



