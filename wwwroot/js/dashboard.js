var prev = 0;
var next = 0;
var spanval = "";
var currpage = "";


async function companyInformationTableLayout() {
  
    companyInfo = $('#cInformation').DataTable({
        "columnDefs": [

            { "width": "280px", "targets": 0 },
            { "width": "180px", "targets": 1 },
            { "width": "180px", "targets": 2 },
            { "width": "280px", "targets": 3 },
            { "width": "180px", "targets": 4 },
            // { "width": "70px", "targets": 9 }
        ],
        "deferRender": true,
        "bPaginate": false,
        "bFilter": false,
        "stripeClasses": [],
        "ordering": false,
        "ordering": false,
        "info": false,
        "bInfo": false,
        "bAutoWidth": false,
        "bLengthChange": false,
        "aLengthMenu": [10],
        "paging": true,
        "searching": false,
        "oLanguage": { "sZeroRecords": "", "sEmptyTable": "" }
    });

}

async function companyInformationShowFilter() {
    var exportFilter = document.getElementById("exportFilter");
    var exportFiltersuccess = document.getElementById("exportFiltersuccess");
    var errorMessage = document.getElementById("filterFormError");
    
    $('#compInfoBtn').click(function () {
        exportFilter.style.display = "block";
        
    });
    $('#closeFilterbtn').click(function () {
        exportFilter.style.display = "none";
         
    });
    $('#cancelFilter').click(function () {
        exportFilter.style.display = "none";

    });

    $('#ciExport').click(function () {
        if (document.getElementById("showAll").checked == false
            && document.getElementById("registered").checked == false
            && document.getElementById("unregistered").checked == false
            && document.getElementById("vip").checked == false
            && document.getElementById("userCount").checked == false
            )
        {
            
            errorMessage.style.display = "block";
            exportFilter.style.height = "500px";
            
            setTimeout(function () {
                errorMessage.style.display = "none";
                exportFilter.style.height = "442px";
            }, 5000);
            
        }
        else
        {
            exportFilter.style.display = "none";
            exportFiltersuccess.style.display = "block";

            setTimeout(function () {
                exportFiltersuccess.style.display = "none";
            }, 5000);
        }
    });
    $('#ciExportDone').click(function () {

        exportFiltersuccess.style.display = "none";
    });
}

async function getComponyInformation(spanval) {
   
    var data = {};
    var ciSearch = document.getElementById("ciSearch").value;
    if (ciSearch == "") {
        ciSearch = "0";
    }
    //console.log(ciSearch);

    data.corporatename = ciSearch;
    data.page = spanval;
    //console.log(data);
    //data.page = 0;
    $.blockUI(reloadLoading);
    $.ajax({
        url: '/Dashboard/PostCompanyInformation',
        data: {
            data: data,
        },
        type: "POST",
        datatype: "json",
        success: function (data) {
            //console.log(data);
            companyInfo.clear().draw();
            //console.log(data[0]);
            prev = data[0].prevPage;
            next = data[0].nextPage;
            currpage = data[0].currentPage;

           
            companyInfo.clear().draw();
            for (var i = 0; i < data[0].items.length; i++) {
                $("#cInformation").dataTable().fnAddData([
                    "<td><p></p><p style='text-align: left;'>" + data[0].items[i].corporateName + "</p></td>",
                    "<td><p>" + data[0].items[i].registered + "</p></td>",
                    "<td><p>" + data[0].items[i].unregistered + "</p></td>",
                    "<td><p>" + data[0].items[i].registeredVIP + "</p> <p style='font-size: 10px;'>Remaining VIP count: " + data[0].items[i].remainingVip+"</p></td>",
                    "<td><p>" + data[0].items[i].totalVIP + "</p></td>",
                    "<td><p>" + data[0].items[i].userCount + "</p></td>",
                    "<td><p>" + data[0].items[i].totalUser + "</p></td>",

                ]);
            }

        }
        
    });
    
}
async function SearchComponyInformation() {
    if (prev == 0) {
        $("#cInformation_prev").attr("disabled", true);
        $("#cInformation_prev").css("color", "gray").css("pointer-event", "none");
    }
    else {
        $("#cInformation_prev").attr("enabled", true);
        $("#cInformation_prev").css("color", "#c89328");
    }
    if (next == 0) {
        console.log(next);

        $("#cInformation_next").attr("disabled", true);
        $("#cInformation_next").css("color", "gray").css("pointer-event", "none");
    }
    else {
        $("#cInformation_next").attr("enabled", true);
        $("#cInformation_next").css("color", "#c89328");
    }


    $('#counter').on('click', '.tbl-pagenumber', function () {
        spanval = $(this).text();
        $(".tbl-pagenumber").removeClass("active-page");

        $(this).addClass("active-page");
        paginateAuditTrail(spanval);

    });
    $('#cInformation_next').click(function () {
        //
        next = parseInt(next);
        $(".tbl-pagenumber").removeClass("active-page");
        console.log(next);
        $("#spanId" + (next)).addClass("active-page");
        paginateAuditTrail(next);

    });
    $('#cInformation_previous').click(function () {

        prev = parseInt(prev);
        $(".tbl-pagenumber").removeClass("active-page");
        console.log(prev);
        $("#spanId" + (prev)).addClass("active-page");
        paginateAuditTrail(prev);

    });

    getComponyInformation(spanval);
   
}

async function filterCheckBox() {
    
    $('#showAll').change(function () {
        if (document.getElementById("showAll").checked == true) {
            document.getElementById("registered").checked = true;
            document.getElementById("unregistered").checked = true;
            document.getElementById("vip").checked = true;
            document.getElementById("userCount").checked = true;
        }
        if (document.getElementById("showAll").checked == false) {
            document.getElementById("registered").checked = false;
            document.getElementById("unregistered").checked = false;
            document.getElementById("vip").checked = false;
            document.getElementById("userCount").checked = false;
        }
    });
    
}