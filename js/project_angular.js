app = angular.module("woc", ["ngRoute","ngCookies"]);
baseurl = window.location.origin;
url = baseurl + "/girish/woc/js/";
//alert(url);

// Start Routes

app.config(function($routeProvider){
	// console.log($routeProvider);
	$routeProvider
	.when("/",{
		//template: "<b>HELLO HOME</b>",
		templateUrl: "payment_offline.html",
		controller: "paymentCtrl"
	})

	.when("/cart", {
		template: "Hello Cart",
		//templateUrl: "cartPage.html",
		controller: "cartCtrl"
	})

	.when("/login",{
		template: "Login Page",
		//templateUrl: "loginPage.html",
		controller: "loginCtrl"
	})
	.when("/cashpayment",{
		//template: "Login Page",
		templateUrl: "cashpayment.html",
		controller: "cashpaymentCtrl"
	})
	.when("/chequepayment",{
		//template: "Login Page",
		templateUrl: "chequepayment.html",
		controller: "chequepaymentCtrl"
	})
	.when("/test",{
		//template: "Login Page",
		templateUrl: "test.html",
		controller: "testCtrl"
	})
	.otherwise({
		template: "404"
	})
});
app.controller()
app.controller("paymentCtrl", function($scope,$http,$rootScope,$cookies){
	$rootScope.cashformHide = true;
	$rootScope.chqueformHide = true;
	$scope.payment_mode=function(modeid){
		alert(modeid);
		if(modeid==1)
		{
			$rootScope.cashformHide = false; 
			$rootScope.chqueformHide = true;
		}	
		else
		{
			$rootScope.cashformHide = true;
			$rootScope.chqueformHide = false; 
		}	
		
	}
});
app.controller("testCtrl",function($scope,$http,$rootScope){
	
	
})
app.controller("chequepaymentCtrl",function($scope,$http,$rootScope){
	$scope.errLogin = "";
	$scope.cheque_payment = function(){
	if(!$scope.account_name){
		msg = "Please Enter Name";
	}
	else if(!$scope.bank_name){
		msg = "Please Enter Bank Name";
	}
	else if(!$scope.cheque_dt){
		msg = "Please Enter Cheque Date";
	}
	else if(!$scope.cheque_no){
		msg = "Please Enter Cheque Number";
	}
	else if(!$scope.amt){
		msg = "Please Enter Amount";
	}
	else 
	{
		
	}
$scope.errLogin = msg;	
	}
});
// rootscope
app.run(function($rootScope){
	// console.log($rootScope);
	$rootScope.mainHide = false;
	$rootScope.sliderHide = false;
});
// rootscope








app.controller("cartCtrl",function($scope,$http,$rootScope,$cookies){
	$rootScope.mainHide = true;
	$rootScope.sliderHide = true;

	// SHOW ALL PRODUCT
	if($cookies.get("cartdata")){
		New_arr_for_cartdata = []

		data_from_cart = $cookies.get("cartdata").split(",");
		// console.log(data_from_cart)
		$http.get(url+"features.json").then(function(res){
			// console.log(res.data);
			angular.forEach(res.data , function(val,key){
				console.log(val.id);
				// console.log(data_from_cart.indexOf(val.id));
				if(data_from_cart.indexOf(val.id.toString()) > -1){
					New_arr_for_cartdata.push(val)
				}
			})

			console.log(New_arr_for_cartdata)
			$scope.results = New_arr_for_cartdata;

		},function(err){});
	}

	// Delete From Cart'
	$scope.delete_to_cart = function(proid,ev){
		console.log(proid)
	from_cart = $cookies.get("cartdata").split(",");
	// console.log(from_cart)

	pos = from_cart.indexOf(proid);
	// console.log(pos);

	from_cart.splice(pos,1);
	// console.log(from_cart)

	finalstring = from_cart.join(",");
	// console.log(finalstring)
	$cookies.put("cartdata", finalstring)
	// console.log(ev.currentTarget.parentMode);
	ev.currentTarget.parentNode.parentNode.parentNode.parentNode.style.display="none"
	
	}
	
})

app.controller("loginCtrl",function($scope,$http,$rootScope){
	$rootScope.mainHide = true;
	$rootScope.sliderHide = true;

	// start signup process
$scope.errSignup = "";
$scope.signup = function(){
	// alert(1)
	// console.log($scope);

	if(!$scope.uname){
		msg = "Please Enter Name";
	}
	else if(!$scope.uemail){
		msg = "Please enter Email";
	}
	else if(!$scope.upass){
		msg = "Plewase Enter Password";
	}
	else if(!$scope.ucpass || ($scope.ucpass!=$scope.upass)){
		msg = "Please Enter valid Confirm Password"
	}
	else{
		if(typeof localStorage == "object"){
			// alert(1);
			// localStorage
			// console.log(localStorage);
			localStorage.setItem("Username",$scope.uname);
			localStorage.setItem("Useremail",$scope.uemail);
			localStorage.setItem("Userpass",$scope.upass);
			$scope.uname = "";
			$scope.uemail = "";
			$scope.upass = "";
			$scope.ucpass = "";
			msg = "Value Added";
		}
	}
	$scope.errSignup = msg;
}
// end signup process
$scope.errLogin = "";
$scope.login = function(){
	// alert(1)
	// console.log($scope);
	if(!$scope.chkemail){
		msg = "Please Enter Email";
	}
	else if(!$scope.chkpass){
		msg = "Please Enter Password";
	}
	else{
		// console.log(typeof localStorage);
		if(typeof localStorage == "object"){
			// alert(1)
			// localStorage
			// console.log(localStorage);
			if(localStorage.Useremail && localStorage.Userpass){
				email_from_storage = localStorage.getItem("Useremail");
				pass_from_storage = localStorage.getItem("Userpass");
				if($scope.chkemail == email_from_storage && $scope.chkpass == pass_from_storage){
					msg = "Valid Login";
				}
				else{
					msg = "Invalid Username of Password";
				}
			}
			else{
				msg = "Invalid Credential"
			}
		}
	}
	$scope.errLogin = msg;
}
// Start login process

// End login process


})
// End Routes



// start brandCtrl
app.controller("brandCtrl", function($scope,$http,$rootScope){
	$http.get(url+"brand.json").then(function(res){
		// console.log(res);
		// console.log(res.data);
		$scope.records = res.data;
	}, function(err){});

	$scope.filter_brand = function(id) {
		// alert(id);
		// filter:{category_id:3}
		// console.log($scope);
		// console.log($rootScope);
		$rootScope.$broadcast("brid",id);
	}
});
// end brandCtrl

// start categoryCtrl
app.controller("categoryCtrl", function($scope,$http,$rootScope){
	$http.get(url+"category.json").then(function(res){
		// console.log(res);
		// console.log(res.data);
		$scope.records = res.data;
	}, function(err){});

	$scope.filter_cat = function(id) {
		// alert(id)
		//filter:{category_id:3}
		// console.log($scope);
		// console.log($rootScope);
		$rootScope.$broadcast("catid",id);
	}

});
// end categoryCtrl

// start featureCtrl
app.controller("productCtrl", function($scope,$http,$rootScope,$cookies){
	$http.get(url+"features.json").then(function(res){
		// console.log(res);
		// console.log(res.data);
		$scope.records = res.data;
	}, function(err){});

	$rootScope.$on("brid",function(a,b){
		// console.log(a)
		// console.log(b)
		$scope.value_for_category = {brand_id:b}
	});

	$rootScope.$on("catid",function(a,b){
		// console.log(a)
		// console.log(b)
		$scope.value_for_category = {category_id:b}
	});

	$scope.add_to_cart=function(proid){
		alert(proid);
		// console.log($cookies);
		if(!$cookies.get("cartdata")){
			// alert("Add First Product");
			$cookies.put("cartdata",proid);
			alert("Product Added in Cart");
		}

		else{
			alert("add second Product");
			getCookiesData = $cookies.get("cartdata");
			// alert(getCookiesData);
			alert(proid);
			newdata = getCookiesData+","+proid;
			$cookies.put("cartdata",newdata)
			alert("Product Updated in Cart")

		}
	}

	// SHOW ALL Product

	if($cookies.get("cartdata")){
		New_arr_for_cartdata = []

		data_from_cart = $cookies.get("cartdata").split(",");
		// console.log(data_from_cart)

		$http.get(url+"product.json").then(function(res){
			// console.log(res.data);
			angular.forEach(res.data , function(val,key){
				// console.log(val.id)
				// console.log(data_from_cart.indexOf(val.id));
				if(data_from_cart.indexOf(val.id)> -1) {
					New_arr_for_cartdata.push(val)
				}
			})

			// console.log(New_arr_for_cartdata)
			$scope.results = New_arr_for_cartdata;
		},function(err){});
	}



});
// end featureCtrl