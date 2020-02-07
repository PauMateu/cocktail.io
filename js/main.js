displayRandom = () =>{
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(res => {
      
        let cocktail = res.data.drinks[0];
        let strName = cocktail.strDrink;
        let strAlc = cocktail.strAlcoholic;
        let arrIng = [];
        let s = "strIngredient";
        for( let i = 1; i < 16; ++i){
            s = s+ i;
            if(!cocktail[s]) {
                break;
            }else{
                arrIng.push(cocktail[s])
            }
            s = "strIngredient";
        }
        let srcImg = cocktail.strDrinkThumb;
        let strIns = cocktail.strInstructions;

        //apply to html
        console.log(strName)
        $("#rname").html(strName);
        $("#ralcohol").html(strAlc);
        $('#rprep').html(strIns);
        list = $("#ring").empty();
        
        for( let i = 0; i < arrIng.length; i++){
            let ingr = "<li>"+arrIng[i]+"</li>"
            list.append(ingr);
        }
        $("#rimcont").empty().append('<img src="'+srcImg+'" alt="" class="img-fluid rounded-lg"></img>')
    })
    .catch(err => {
        console.error(err); 
    })
}

$(document).ready(function() {


    $(".main-wrapper").load("html/home.html");
    $("a.navbar-brand").click(function(){
        $(".main-wrapper").load("html/home.html");
        $('div.navbar-nav .active').removeClass('active');
        $("#home").addClass( "active" );
    });
    $(document).on("click", "#refresh",(function(){
        console.log("displaying")
        displayRandom()
        }))
    $(document).on("click", "#bestcard",(function(){
        $(".main-wrapper").load("html/map.html",function(){
            $(window).scrollTop(0);
            console.log("scrolling")
        });
    }))
    $(document).on("click", "#randomcard",(function(){
        $(".main-wrapper").load("html/random.html",function(){
            $(window).scrollTop(0);
            displayRandom()
            console.log("scrolling")
        });
    }))
    $(document).on("click", "#contactcard",(function(){
        $(".main-wrapper").load("html/contact.html",function(){
            $(window).scrollTop(0);
            console.log("scrolling")
        });
    }))
    $("div.navbar-nav a").each(function() {
        $(this).click(function(){
            $('div.navbar-nav .active').removeClass('active');
            $(".main-wrapper").load("html/"+$(this).attr("data-page")+".html");
          
            $(this).addClass( "active" )
            switch ($(this).attr("data-page")){
                
                case "random":
                    displayRandom()
                    
                   
            }
        });
    });
});



