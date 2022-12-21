const sheetID4 = '1GbrGnOBAY7O_Y_PWIG6yv81Z1kdb7iLT9FlucmUnj9U';
const base4 = `https://docs.google.com/spreadsheets/d/${sheetID4}/gviz/tq?`;

let sheetName4 = 'FormRealEstate';
const qu_AllData4 = 'Select *';
const queryAllData4 = encodeURIComponent(qu_AllData4);
let urlAllData4 = `${base4}&sheet=${sheetName4}&tq=${queryAllData4}`;

let data = [];
let dataAll = [];
let dataHotNews = [];
let dataSearch = [];

let checkStatusSearch = false;
let htmlContactInfo = "";
let htmlListForm = "";
let htmlModalItemForm = "";

let IndexTypeRealEstate = "";
let IndexPlace = "";
let IndexTypeService = "";
let IndexRangePrice = "";
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
            renderToWebsite(dataAll);
        });

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

        document.getElementById("contractInfo").innerHTML = htmlContactInfo;
}

function renderToWebsite(data){
    htmlListForm = "";   
    htmlListForm = htmlListForm + "<table class=\"table-form-real-estate-CongVu\">"
                                + "<tr class=\"table-row-form-real-estate-CongVu\">"
                                + "<th class=\"table-header-form-real-estate-CongVu\">Loại biểu mẫu</th>"
                                + "<th class=\"table-header-form-real-estate-CongVu\">Tùy chọn</th>"
                                + "</tr>";

    for(var count = 0; count < data.length; count++){
        let linkFilePDF = String(data[count]['linkpdf']);
        let linkFileWord = String(data[count]['linkword']);
        htmlListForm = htmlListForm + "<tr "
                                    + "id=\"info" + String(count+1) + "\""
                                    + " class=\"table-row-form-real-estate-CongVu\">"
                                    + "<td class=\"table-data-form-real-estate-CongVu\">"
                                    + data[count]['title']
                                    + "</td>"
                                    + "<td class=\"table-data-form-real-estate-CongVu\">"
                                    + "<a href=\"#info" + String(count+1) + "\" onclick=\"modalFormRender("
                                    + "\'"
                                    + String(data[count]['linkpdf'])
                                    + "\'"
                                    + ")\">"
                                    + "<button class=\"button-preview\" type=\"button\">Preview</button>"
                                    + "</a>"
                                    + "&nbsp;"

                                    + "<a href=\""
                                    + data[count]['linkpdf']
                                    + "\" download=\""
                                    + linkFilePDF.slice(22)
                                    + "\">"
                                    + "<button class=\"button-PDF\" type=\"button\">Download PDF</button>"
                                    + "</a>"
                                    + "&nbsp;"

                                    + "<a href=\""
                                    + data[count]['linkword']
                                    + "\" download=\""
                                    + linkFileWord.slice(22)
                                    + "\">"
                                    + "<button class=\"button-Word\" type=\"button\">Download Word</button>"
                                    + "</a>"
                                    + "</td>"
                                    + "</tr>"
    }
    htmlListForm = htmlListForm + "</table>";
    document.getElementById("listFormRealEstate").innerHTML = htmlListForm;
}

