    Kakao.init("eb99713f8da2e009a60a92ee80e0e58f");
	window.name ="parent";
	  var nickname ="";
	  var email ="";
	  var unique_id = "";
	  var form = $("#loginform");
      // 사용할 앱의 JavaScript 키를 설정해 주세요.
      
     
      function loginWithKakao() {
    	//프로필 정보를 가지고옵니다.
    	
      // 로그인 창을 띄웁니다.
    	
      Kakao.Auth.login({
    	 
        success: function(authObj) {
          console.log(authObj)
          
          Kakao.API.request({ 
      		url: '/v1/user/me',
    		success: function(res) {
    		  console.log(res)
    		  nickname =res.properties.nickname;
    		  unique_id = res.id;
    		  email = res.kaccount_email;
    		  $("#logintype").val("2"); 
    	      $("#nickname").val(nickname);
    	      $("#uniqueID").val(unique_id); 
    	      $("#id").val(email); 
    	      
    		},
    		fail: function(error) {
    		  console.log(error);
    		} 
    	  });
          
          if(typeof unique_id == 'object'){
        	location.href="Login.jsp";
          }else{
        	console.log(typeof(unique_id));
            setTimeout("form.submit()",1000);
            }
          
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
      
    };	
    
    function logout(){
    	Kakao.Auth.logout();
    	
    	
    	
    }