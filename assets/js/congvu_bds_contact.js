const sheetID4 = '10rkpAYYKUCpU1er1pF18w0QCl-7R5evj11VXIYEk3MA';
const base4 = `https://docs.google.com/spreadsheets/d/${sheetID4}/gviz/tq?`;

let sheetName4 = 'Contact';
const qu_AllData4 = 'Select *';
const queryAllData4 = encodeURIComponent(qu_AllData4);
let urlAllData4 = `${base4}&sheet=${sheetName4}&tq=${queryAllData4}`;

let data = [];
let dataAll = [];
let dataHotNews = [];
let dataSearch = [];

let checkStatusSearch = false;
let htmlContactInfo = "";
let htmlMainContactInfoCongVu = "";


window.onload = init4;

function init4() {
    fetch(urlAllData4)
        .then(res => res.text())
        .then(rep => {
            
            const jsData = JSON.parse(rep.substr(47).slice(0, -2));
            const colz = [];
            jsData.table.cols.forEach((heading) => {                
                if (heading.label) {
                    colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
                }
            })
            
            jsData.table.rows.forEach((main) => {
                
                const row = {};
                colz.forEach((ele, ind) => {
                    
                    row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
                })                
                dataAll.push(row);                
                
            })
            data = dataAll;
            renderContactInfo(data);
        });
}

function renderContactInfo(data){        
    htmlContactInfo = ""
    htmlContactInfo = htmlContactInfo
                    + "<span style=\"font-weight: normal; color: #555555\">"
                    + "<i class=\"fas fa-id-card\"></i>"
                    + "</span>"
                    + "<span style=\"font-weight: bold; color: blue\"> Mr.Công"
                    + "</span>&nbsp; &nbsp; &nbsp;"                                    
                    + "<span style=\"font-weight: normal; color: #555555\">"
                    + "<i class=\"fa fa-phone\"></i>"
                    + "</span>"
                    + " <strong style=\"color:blue;\">0903 380 652</strong>";
    
    htmlMainContactInfoCongVu = ""
    htmlMainContactInfoCongVu = htmlMainContactInfoCongVu
                    + "<div class=\"row contact-CongVu\">"
                    + "<div class=\"col-md-4 col-sm-12 col-12\">"
                    + "<img class=\"img-contact-CongVu\" src=\""
                    + data[0]['linkavatar']
                    + "\">"
                    + "</div>"
                    + "<div class=\"col-md-8 col-sm-12 col-12 introduce-CongVu\">"
                    + "<h2>"
                    + data[0]['title']
                    + "</h2>"
                    +"<p>"
                    + data[0]['description']
                    + "</p>"
                    + "</div>"
                    + "</div>"

                    + "<div class=\"row contact-CongVu2\">"
                    + "<div class=\"col-md-12 col-sm-12 col-12\">"
                    +"<p>"
                    + data[0]['endsentence']
                    + "</p>"
                    + "</div>"
                    + "</div>"

                    + "<div class=\"row social-CongVu\">"
                    
                    + "<div class=\"col-md-3 col-sm-3 col-3\">"
                    + "<a target=\"_blank\" href=\""
                    + data[0]['linkyoutube']
                    + "\">"
                    + "<img class=\"img-social-CongVu\" src=\""
                    + data[0]['imageyoutube']
                    + "\">"
                    + "</a>"
                    + "</div>"
                    
                    + "<div class=\"col-md-3 col-sm-3 col-3\">"
                    + "<a target=\"_blank\" href=\""
                    + data[0]['linktiktok']
                    + "\">"
                    + "<img class=\"img-social-CongVu\" src=\""
                    + data[0]['imagetiktok']
                    + "\">"
                    + "</a>"
                    + "</div>"

                    
                    + "<div class=\"col-md-3 col-sm-3 col-3\">"
                    + "<a target=\"_blank\" href=\""
                    + data[0]['linkfacebook']
                    + "\">"
                    + "<img class=\"img-social-CongVu\" src=\""
                    + data[0]['imagefacebook']
                    + "\">"
                    + "</a>"
                    + "</div>"

                    
                    + "<div class=\"col-md-3 col-sm-3 col-3\">"
                    + "<a target=\"_blank\" href=\""
                    + data[0]['linkzalo']
                    + "\">"
                    + "<img class=\"img-social-CongVu\" src=\""
                    + data[0]['imagezalo']
                    + "\">"
                    + "</a>"
                    + "</div>"
                    
                    + "</div>";

    document.getElementById("main").innerHTML = htmlMainContactInfoCongVu;
    document.getElementById("contractInfo").innerHTML = htmlContactInfo;
}

// function renderHotNews(){
//     dataHotNews = [];
//     for(var count = dataAll.length - 1; count >= 0; count--){
//         if(dataAll[count]['hotnews'] == "Yes" && dataAll[count]['status'] == "on-sale"){
//             dataHotNews.push(dataAll[count]);
//         }
//     }
//     checkStatusSearch = false;
//     data = dataHotNews;
//     renderToWebsite(dataHotNews);
// }

// function showResultOfSearch(){
//     IndexTypeRealEstate = document.getElementById("Type").value;    
//     IndexPlace = document.getElementById("city").value;
//     IndexTypeService = document.getElementById("bedrooms").value;
//     IndexRangePrice = document.getElementById("garages").value;
    
//     dataSearch = [];
//     for(var count = dataAll.length - 1; count >= 0; count--){
//         let checkPushToArray = false;
//         let countNumberCondition = 0;
//         let countNumberConditionAccept = 0;
//         if(IndexTypeRealEstate != "0" || IndexPlace != "0" || IndexTypeService != "0" || IndexRangePrice != "0" &&  dataAll[count]['status'] == "on-sale"){
//             if(IndexTypeRealEstate != "0"){
//                 countNumberCondition = countNumberCondition + 1;
//                 if(dataAll[count]['indextyperealestate'] == IndexTypeRealEstate){
//                     countNumberConditionAccept = countNumberConditionAccept + 1;
//                 }
//             }
//             if(IndexPlace != "0"){
//                 countNumberCondition = countNumberCondition + 1;
//                 if(dataAll[count]['indexplace'] == IndexPlace){
//                     countNumberConditionAccept = countNumberConditionAccept + 1;
//                 }
//             }
//             if(IndexTypeService != "0"){
//                 countNumberCondition = countNumberCondition + 1;
//                 if(dataAll[count]['indextypeservice'] == IndexTypeService){
//                     countNumberConditionAccept = countNumberConditionAccept + 1;
//                 }
//                 else if(IndexTypeService == "1" && dataAll[count]['indextypeservice'] == "2"){
//                     countNumberConditionAccept = countNumberConditionAccept + 1;
//                 }
//             }
//             if(IndexRangePrice != "0"){
//                 countNumberCondition = countNumberCondition + 1;
//                 if(dataAll[count]['indexrangeprice'] == IndexRangePrice){
//                     countNumberConditionAccept = countNumberConditionAccept + 1;
//                 }
//             }
//             if(countNumberCondition == countNumberConditionAccept){
//                 checkPushToArray = true;
//             }           
//         }
//         else if(dataAll[count]['status'] == "on-sale"){
//             checkPushToArray = true;
//         }
//         if(checkPushToArray == true){
//             dataSearch.push(dataAll[count]);
//         }
//     }
//     checkStatusSearch = true;
//     data = dataSearch;
//     renderToWebsite(dataSearch);    
// }

// function renderToWebsite(data){
//     htmlListInfo = "";
//     htmlTitleInfo = "";
//     htmlContactInfo = ""

//     for(var count = 0; count < data.length; count++){
//         htmlListInfo = htmlListInfo + "<a href=\"#info" + String(count+1) + "\" onclick=\"modalInfoRender(" + String(count+1) + ")\">"
//                                     + "<div id=\"info" + String(count+1) + "\" class=\"card-box-c foo\">"
//                                     + "<div class=\"col-md-4 col-sm-4 col-12 card-header-c\">"
//                                     + "<img class=\"img-header\" src=\"" + data[count]['image1'] + "\">" + "</div>"
//                                     + "<div class=\"col-md-8 col-sm-8 col-12 card-info-c\">"
//                                     + "<div class=\"card-title-c align-self-center\">"
//                                     + "<h2>" + data[count]['title'] + "</h2>" + "<h3>"
//                                     + "<span style=\"font-weight: normal; color: #555555\">"

//                                     + "<i class=\"fas fa-money-bill-wave\"></i>"

//                                     + "</span> " + data[count]['price'] + "&nbsp; &nbsp; &nbsp;"
//                                     + "<span style=\"font-weight: normal; color: #555555\">"

//                                     + "<i class=\"fas fa-warehouse\"></i>"

//                                     + "</span> " + data[count]['area']
//                                     + "</h3>"
  
//                                     + "<h4>"
//                                     + "<span style=\"color: #555555;\">"
//                                     + "<i class=\"fas fa-map-marker-alt\"></i>&nbsp;"
//                                     + "</span>"
//                                     + data[count]['place'] + ", HCM"
//                                     + "&nbsp; &nbsp; &nbsp;"
                                    
//                                     + "<span style=\"color: #555555;\">"
//                                     + "<i class=\"fas fa-home\"></i>&nbsp;"
//                                     + "</span>"

//                                     + data[count]['typerealestate']
//                                     + "&nbsp; &nbsp; &nbsp;"
                                    
//                                     + "<span style=\"color: #555555;\">"
//                                     + "<i class=\"fas fa-bullhorn\"></i>&nbsp;"
//                                     + "</span>"
                                    

                                    
//                                     + data[count]['typeservice']

                                    
//                                     + "</h4></div>"
//                                     + "<div class=\"card-body-c\">"
                                    
//                                     + "<p class=\"content-c\">[ID: " + data[count]['code'] + "] "
//                                     + "Ngày đăng tin: " + data[count]['dateupload'] + "</p>"
//                                     + "</div></div></div></a>";  
//     }
//     if(checkStatusSearch == true){
//         htmlTitleInfo = htmlTitleInfo + "<div class=\"col-md-12\">"
//                                     + "<div class=\"title-box\">"
//                                     + "<h2 class=\"title-a\">"
//                                     + "<i class=\"bi bi-search\" style=\"font-size:48px;color:#2eca6a\"></i>"
//                                     + "<span style=\"color: #5F6368; font-weight: normal;\"> Kết Quả </span>" + "(" + String(data.length) + " tin)"
//                                     + "</h2></div></div>";
                    
//         htmlContactInfo = htmlContactInfo
//                                     + "<span style=\"font-weight: normal; color: #555555\">"
//                                     + "<i class=\"fas fa-id-card\"></i>"
//                                     + "</span>"
//                                     + "<span style=\"font-weight: bold; color: blue\"> Mr.Công"
//                                     + "</span>&nbsp; &nbsp; &nbsp;"                                    
//                                     + "<span style=\"font-weight: normal; color: #555555\">"
//                                     + "<i class=\"fa fa-phone\"></i>"
//                                     + "</span>"
//                                     + " <strong style=\"color:blue;\">0903 380 652</strong>";
        
//         document.getElementById("rowRenderTitle").innerHTML = htmlTitleInfo;
//         document.getElementById("rowRenderInfo").innerHTML = htmlListInfo;
//         document.getElementById("contractInfo").innerHTML = htmlContactInfo;
//         document.getElementById('main').scrollIntoView();
//     }
//     else{
//         htmlTitleInfo = htmlTitleInfo + "<div class=\"col-md-12\">"
//                                     + "<div class=\"title-box\">"
//                                     + "<h2 class=\"title-a\">"
//                                     + "<i class=\"fa fa-star\" style=\"font-size:48px;color:rgb(248, 170, 1)\"></i>"
//                                     + " Tin Nổi Bật " + "<i class=\"fa fa-star\" style=\"font-size:48px;color:rgb(248, 170, 1)\"></i>"
//                                     + "</h2></div></div>";        
//         htmlContactInfo = htmlContactInfo
//                                     + "<span style=\"font-weight: normal; color: #555555\">"
//                                     + "<i class=\"fas fa-id-card\"></i>"
//                                     + "</span>"
//                                     + "<span style=\"font-weight: bold; color: blue\"> Mr.Công"
//                                     + "</span>&nbsp; &nbsp; &nbsp;"                                    
//                                     + "<span style=\"font-weight: normal; color: #555555\">"
//                                     + "<i class=\"fa fa-phone\"></i>"
//                                     + "</span>"
//                                     + " <strong style=\"color:blue;\">0903 380 652</strong>";
        
//         document.getElementById("rowRenderTitle").innerHTML = htmlTitleInfo;
//         document.getElementById("rowRenderInfo").innerHTML = htmlListInfo;
//         document.getElementById("contractInfo").innerHTML = htmlContactInfo;
        
//     }
    
    
// }
