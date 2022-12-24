const sheetID = '158eV8Ko_HXZQLlbxI2glp057J7AA_SdKhYehvEZn47w';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

let sheetName = 'Products';
const qu_AllData = 'Select * WHERE A != ""';
const queryAllData = encodeURIComponent(qu_AllData);
const urlAllData = `${base}&sheet=${sheetName}&tq=${queryAllData}`;

let data = [];
let dataAll = [];
let dataHotNews = [];
let dataSearch = [];
let dataRenderInfo = [];
let dataSearchRender = [];

let checkStatusSearch = false;
let htmlPagination = "";
let numberPage = 0;
let currentPage = 0;

let IndexTypeRealEstate = "";
let IndexPlace = "";
let IndexTypeService = "";
let IndexRangePrice = "";
window.onload = init;

function init() {    
    fetch(urlAllData)
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
            renderHotNews();            
            addContentPagination(currentPage);
        })
}

function renderHotNews(){
    dataHotNews = [];
    for(var count = dataAll.length - 1; count >= 0; count--){
        if(dataAll[count]['hotnews'] == "Yes" && dataAll[count]['status'] == "on-sale"){
            dataHotNews.push(dataAll[count]);
        }
    }
    checkStatusSearch = false;
    data = dataHotNews;

    if(data.length == 0){
        numberPage = 0;
        currentPage = 0;
    }
    else if(data.length%5 == 0){
        numberPage = data.length/5;
        currentPage = 1;
    }
    else{
        numberPage = (data.length - data.length%5)/5 + 1;
        currentPage = 1;
    }
    renderToWebsite(dataHotNews);
}

function showResultOfSearch(){
    IndexTypeRealEstate = document.getElementById("Type").value;    
    IndexPlace = document.getElementById("city").value;
    IndexTypeService = document.getElementById("bedrooms").value;
    IndexRangePrice = document.getElementById("garages").value;
    
    dataSearch = [];
    for(var count = dataAll.length - 1; count >= 0; count--){
        let checkPushToArray = false;
        let countNumberCondition = 0;
        let countNumberConditionAccept = 0;
        if(IndexTypeRealEstate != "0" || IndexPlace != "0" || IndexTypeService != "0" || IndexRangePrice != "0" &&  dataAll[count]['status'] == "on-sale"){
            if(IndexTypeRealEstate != "0"){
                countNumberCondition = countNumberCondition + 1;
                if(dataAll[count]['indextyperealestate'] == IndexTypeRealEstate){
                    countNumberConditionAccept = countNumberConditionAccept + 1;
                }
            }
            if(IndexPlace != "0"){
                countNumberCondition = countNumberCondition + 1;
                if(dataAll[count]['indexplace'] == IndexPlace){
                    countNumberConditionAccept = countNumberConditionAccept + 1;
                }
            }
            if(IndexTypeService != "0"){
                countNumberCondition = countNumberCondition + 1;
                if(dataAll[count]['indextypeservice'] == IndexTypeService){
                    countNumberConditionAccept = countNumberConditionAccept + 1;
                }
                else if(IndexTypeService == "1" && dataAll[count]['indextypeservice'] == "2"){
                    countNumberConditionAccept = countNumberConditionAccept + 1;
                }
            }
            if(IndexRangePrice != "0"){
                countNumberCondition = countNumberCondition + 1;
                if(dataAll[count]['indexrangeprice'] == IndexRangePrice){
                    countNumberConditionAccept = countNumberConditionAccept + 1;
                }
            }
            if(countNumberCondition == countNumberConditionAccept){
                checkPushToArray = true;
            }           
        }
        else if(dataAll[count]['status'] == "on-sale"){
            checkPushToArray = true;
        }
        if(checkPushToArray == true){
            dataSearch.push(dataAll[count]);
        }
    }
    checkStatusSearch = true;
    data = dataSearch;
    if(data.length == 0){
        numberPage = 0;
        currentPage = 0;
    }
    else if(data.length%5 == 0){
        numberPage = data.length/5;
        currentPage = 1;
    }
    else{
        numberPage = (data.length - data.length%5)/5 + 1;
        currentPage = 1;
    }
    
    if(dataSearch.length > 0 && dataSearch.length <=5){
        renderToWebsite(dataSearch);
        addContentPagination(currentPage);
    }
    else if(dataSearch.length > 5){
        dataSearchRender.push(dataSearch[0]);
        dataSearchRender.push(dataSearch[1]);
        dataSearchRender.push(dataSearch[2]);
        dataSearchRender.push(dataSearch[3]);
        dataSearchRender.push(dataSearch[4]);
        renderToWebsite(dataSearchRender);
        addContentPagination(currentPage);
    }
}

function renderToWebsite(dataRender){
    htmlListInfo = "";
    htmlTitleInfo = "";
    htmlContactInfo = ""

    for(var count = 0; count < dataRender.length; count++){
        htmlListInfo = htmlListInfo + "<a href=\"#info" + String(count+1) + "\" onclick=\"modalInfoRender(" + String(count+1) + ")\">"
                                    + "<div id=\"info" + String(count+1) + "\" class=\"card-box-c foo\">"
                                    + "<div class=\"col-md-4 col-sm-4 col-12 card-header-c\">"
                                    + "<img class=\"img-header\" src=\"" + dataRender[count]['image1'] + "\">" + "</div>"
                                    + "<div class=\"col-md-8 col-sm-8 col-12 card-info-c\">"
                                    + "<div class=\"card-title-c align-self-center\">"
                                    + "<h2>" + dataRender[count]['title'] + "</h2>" + "<h3>"
                                    + "<span style=\"font-weight: normal; color: #555555\">"

                                    + "<i class=\"fas fa-money-bill-wave\"></i>"

                                    + "</span> " + dataRender[count]['price'] + "&nbsp; &nbsp; &nbsp;"
                                    + "<span style=\"font-weight: normal; color: #555555\">"

                                    + "<i class=\"fas fa-warehouse\"></i>"

                                    + "</span> " + dataRender[count]['area']
                                    + "</h3>"
  
                                    + "<h4>"
                                    + "<span style=\"color: #555555;\">"
                                    + "<i class=\"fas fa-map-marker-alt\"></i>&nbsp;"
                                    + "</span>"
                                    + dataRender[count]['place'] + ", HCM"
                                    + "&nbsp; &nbsp; &nbsp;"
                                    
                                    + "<span style=\"color: #555555;\">"
                                    + "<i class=\"fas fa-home\"></i>&nbsp;"
                                    + "</span>"

                                    + dataRender[count]['typerealestate']
                                    + "&nbsp; &nbsp; &nbsp;"
                                    
                                    + "<span style=\"color: #555555;\">"
                                    + "<i class=\"fas fa-bullhorn\"></i>&nbsp;"
                                    + "</span>"
                                    

                                    
                                    + dataRender[count]['typeservice']

                                    
                                    + "</h4></div>"
                                    + "<div class=\"card-body-c\">"
                                    
                                    + "<p class=\"content-c\">[ID: " + dataRender[count]['code'] + "] "
                                    + "Ngày đăng tin: " + dataRender[count]['dateupload'] + "</p>"
                                    + "</div></div></div></a>";  
    }
    if(checkStatusSearch == true){
        htmlTitleInfo = htmlTitleInfo + "<div class=\"col-md-12\">"
                                    + "<div class=\"title-box\">"
                                    + "<h2 class=\"title-a\">"
                                    + "<i class=\"bi bi-search\" style=\"font-size:48px;color:#2eca6a\"></i>"
                                    + "<span style=\"color: #5F6368; font-weight: normal;\"> Kết Quả </span>" + "(" + String(data.length) + " tin)"
                                    + "</h2></div></div>";
                    
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
        
        document.getElementById("rowRenderTitle").innerHTML = htmlTitleInfo;
        document.getElementById("rowRenderInfo").innerHTML = htmlListInfo;
        document.getElementById("contractInfo").innerHTML = htmlContactInfo;
        document.getElementById('main').scrollIntoView();
    }
    else{
        htmlTitleInfo = htmlTitleInfo + "<div class=\"col-md-12\">"
                                    + "<div class=\"title-box\">"
                                    + "<h2 class=\"title-a\">"
                                    + "<i class=\"fa fa-star\" style=\"font-size:48px;color:rgb(248, 170, 1)\"></i>"
                                    + " Tin Nổi Bật " + "<i class=\"fa fa-star\" style=\"font-size:48px;color:rgb(248, 170, 1)\"></i>"
                                    + "</h2></div></div>";        
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
        
        document.getElementById("rowRenderTitle").innerHTML = htmlTitleInfo;
        document.getElementById("rowRenderInfo").innerHTML = htmlListInfo;
        document.getElementById("contractInfo").innerHTML = htmlContactInfo;
        
    }
    
    
}

//Render button Pagnination
function addContentPagination(page){
    htmlPagination = "";
    htmlPagination = htmlPagination + "<button onclick=\"gotoPage(" + String(-2) + ")\">&laquo;</button>";
    for(var count = 1; count <= numberPage; count++){
      if(count != page){
        htmlPagination = htmlPagination + "<button onclick=\"gotoPage(" + String(count) +")\">" + String(count) + "</button>";
      }
      else{
        htmlPagination = htmlPagination + "<button class=\"active\" onclick=\"gotoPage(" + String(count) +")\">" + String(count) + "</button>";
      }
    }             
    htmlPagination = htmlPagination + "<button onclick=\"gotoPage(" + String(-1) + ")\">&raquo;</button>";
    document.getElementById("rowRenderPagination").innerHTML = htmlPagination;  
}

//Render Data Info when click button Pagnination
function gotoPage(page){
    dataRenderInfo = [];
    if(page == -1){        
      if(currentPage < numberPage){
        currentPage = currentPage + 1;
        startItem = (currentPage - 1)*5;
        if(currentPage == numberPage){
          endItem = data.length;
        }
        else{
          endItem = startItem + 5;
        }
        for(var count = startItem; count < endItem; count++){
            dataRenderInfo.push(data[count]);
        }       
        renderToWebsite(dataRenderInfo);
        addContentPagination(currentPage);   
      }
      else{
        return;
      }
    }
    else if(page == -2){
      if(currentPage > 1){
        currentPage = currentPage - 1;   
        startItem = (currentPage - 1)*5;
        if(currentPage == numberPage){
          endItem = data.length;
        }
        else{
          endItem = startItem + 5;
        }
        for(var count = startItem; count < endItem; count++){
            dataRenderInfo.push(data[count]);
        }       
        renderToWebsite(dataRenderInfo);
        addContentPagination(currentPage);
      }
      else{
        return;
      }
    }
    else{
      page = Number(page);
      startItem = (page-1)*5;
      if(page == numberPage){
        endItem = data.length;
      }
      else{
        endItem = startItem + 5;
      }
      currentPage = page;
      
      for(var count = startItem; count < endItem; count++){
        dataRenderInfo.push(data[count]);
      }
      renderToWebsite(dataRenderInfo);
      addContentPagination(currentPage);
    }
    

  }

