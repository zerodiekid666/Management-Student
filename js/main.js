//  ---------------------------------------------
//  Date: 24 Aug 2017
//  Author: Thang Nguyen
//  ---------------------------------------------
//  Requirements:
//  ---------------------------------------------
//  Tạo 1 listbox: có 5 sinh viên
//  Chọn sinh viên nào thì sẽ xuất ra:
//      + Sinh viên đó
//      + Giá trị index của nó
//  --------------------------------------------
var dsSinhVien = new DanhSachSinhVien();
var sinhVienInst = new SinhVien();

//Thêm phương thức XoaSinhVien vào prototype DanhSachSinhVien
DanhSachSinhVien.prototype.XoaSinhVien = function(dsSinhVienDuocChon) {
    // var slSinhVienDuocChon = dsSinhVienDuocChon.length;
    // var slDanhSachSV = dsSinhVien.DSSV.length;
    for (var i = 0; i < dsSinhVienDuocChon.length; i++) // Duyệt danh sách mã số sinh viên các sinh viên được chọn
    {
        for (var j = 0; j < dsSinhVien.DSSV.length; j++) // Duyệt tổng số sinh viên từ danh sách sinh viên (dsSinhVien.DSSV)
        {
            if (dsSinhVienDuocChon[i] == dsSinhVien.DSSV[j].MSSV) // So sánh nếu mssv thứ i == với danh sách tổng sinh viên thứ j thì xóa
            {
                dsSinhVien.DSSV.splice(j, 1);
            }
        }
    }
}

//Thêm phương thức TimSinhVienCaoDiemNhat vào prototype DanhSachSinhVien
DanhSachSinhVien.prototype.Top1 = function() {
    var sinhVienMax = new SinhVien();
    dsSinhVien.DSSV.sort(function(a, b) {
        return b.DTB - a.DTB
    });
    sinhVienMax = dsSinhVien.DSSV[0];
    return sinhVienMax;
}

//Thêm phương thức SVTop10 vào prototype DanhSachSinhVien
DanhSachSinhVien.prototype.Top10 = function() {
    var SinhVienTop10 = [];
    dsSinhVien.DSSV.sort(function(a, b) {
        return b.DTB - a.DTB
    });
    for (var i = 0; i < 10; i++) {
        SinhVienTop10.push(dsSinhVien.DSSV[i]);
    }
    return SinhVienTop10;
}

//Thêm phương thức TimKiemVoiMSSV vào prototype DanhSachSinhVien
DanhSachSinhVien.prototype.TimKiemVoiMSSV = function(MSSVtimkiem) {
    var sinhVienKQ = new SinhVien();
    for (var i = 0; i < dsSinhVien.DSSV.length; i++) {
        var n = dsSinhVien.DSSV[i].MSSV.search(MSSVtimkiem);
        if (n != -1) {
            sinhVienKQ = dsSinhVien.DSSV[i];
        }
        /*else {
                   sinhVienKQ =
               }*/
    }
    return sinhVienKQ;
}


//Thêm thuộc tính MSSV, Toan, Ly, Hoa, DTB, XepLoai vào prototype SinhVien
SinhVien.prototype.MSSV = '';
SinhVien.prototype.DiemToan = '';
SinhVien.prototype.DiemLy = '';
SinhVien.prototype.DiemHoa = '';
SinhVien.prototype.DTB = '';
SinhVien.prototype.XepLoai = '';

//Thêm phương thức DiemTrungBinh vào prototype SinhVien
SinhVien.prototype.TinhDiemTrungBinh = function(diemToan, diemLy, diemHoa) {
    var dt = parseInt(diemToan);
    var dl = parseInt(diemLy);
    var dh = parseInt(diemHoa);
    var result = parseFloat((dt + dl + dh) / 3).toFixed(2); // Làm tròn 2 chữ số
    return result;
}

//Thêm phương thức XepLoai vào prototype DanhSachSinhVien
SinhVien.prototype.CachXepLoai = function(diemTrungBinh) {
    if (diemTrungBinh >= 9) {
        return "Xuất Sắc";
    } else if (diemTrungBinh >= 8 && diemTrungBinh < 9) {
        return "Giỏi";
    } else if (diemTrungBinh >= 7 && diemTrungBinh < 8) {
        return "Khá";
    } else if (diemTrungBinh >= 6 && diemTrungBinh < 7) {
        return "Trung Bình Khá";
    } else if (diemTrungBinh >= 5 && diemTrungBinh < 6) {
        return "Trung Bình";
    } else {
        return "Yếu";
    }
}

/*Các hàm thực thi phương thức của prototype để thể hiện kết quả lên HTML*/

//Thêm sinh viên
function ThemSinhVien() {
    //Bước 1: Lấy thông tin người dùng nhập vào đổ vào đối tượng sinh viên
    var hoten = document.getElementById("hoten").value;
    var cmnd = document.getElementById("cmnd").value;
    var email = document.getElementById("email").value;
    var sdt = document.getElementById("sdt").value;
    var masv = document.getElementById("masv").value;
    //Thêm vào thuộc tính MSSV cho prototype DSSV
    /* SinhVien.prototype.MSSV = '';*/
    /*-----------------------------------------------------------------------*/
    //Điểm Toán, Lý, Hóa
    var diemToan = document.getElementById("diemtoan").value;
    var diemLy = document.getElementById("diemly").value;
    var diemHoa = document.getElementById("diemhoa").value;
    //Thêm gía trị vào các thuộc tính của đối tượng sinh viên
    var sv = new SinhVien(hoten, email, cmnd, sdt);
    sv.MSSV = masv;
    /*-----------------------------------------------------------------------*/
    sv.DiemToan = diemToan;
    sv.DiemLy = diemLy;
    sv.DiemHoa = diemHoa;
    sv.DTB = sv.TinhDiemTrungBinh(diemToan, diemLy, diemHoa);
    sv.XepLoai = sv.CachXepLoai(sv.DTB);
    /*-----------------------------------------------------------------------*/
    //Bước 2: Đưa dữ liệu của đối tượng sinh viên (sv) vào listBox phía dưới
    dsSinhVien.themSV(sv);
    //Cập nhật lại danh sách sinh viên
    CapNhatDSSinhVien();

}

//Xóa sinh viên
function XoaSinhVien() {
    if (confirm("Bạn có chắc muốn xóa ?") == true) {
        var lstBoxSinhVien = document.getElementById('lstDanhSachSinhVien');
        //Tạo ra mãng chứa các mã số sinh viên được chon
        var dsSinhVienDuocChon = new Array();
        var slSinhVienDuocChon = lstBoxSinhVien.options.length;
        for (var i = 0; i < slSinhVienDuocChon; i++) {
            //Lấy giá trị người dùng chọn đưa vào mảng dsSinhVienDuocChon
            if (lstBoxSinhVien.options[i].selected) {
                var masvDuocChon = lstBoxSinhVien.options[i].value;
                dsSinhVienDuocChon.push(masvDuocChon);
            }
        }
        dsSinhVien.XoaSinhVien(dsSinhVienDuocChon);
        CapNhatDSSinhVien();
    }
}

//Cập nhật danh sách sinh viên
function CapNhatDSSinhVien() {
    var lstBoxSinhVien = document.getElementById("lstDanhSachSinhVien");
    //Clear tất cả option trong giao diện
    lstBoxSinhVien.innerHTML = '';
    for (var i = 0; i < dsSinhVien.DSSV.length; i++) {
        var optionSV = document.createElement('option');
        //Lấy sinh viên thứ i trong DSSV
        var svTam = dsSinhVien.DSSV[i];
        optionSV.value = svTam.MSSV;
        optionSV.innerHTML = svTam.HoTen;
        lstBoxSinhVien.appendChild(optionSV);
    }
}

//Xuất danh sách sinh viên ra bảng
function XuatDanhSachSinhVien() {
    var titleDisplay = document.getElementById('titleDisplay');
    titleDisplay.innerHTML = '';
    var titleResult = document.createElement('h4');
    titleResult.setAttribute('style', 'margin-left: 5%');
    titleResult.innerHTML = "Danh danh sách tất cả sinh viên";
    titleDisplay.appendChild(titleResult);
    var tableSV = document.getElementById('tableStudent');
    tableSV.innerHTML = '';
    var rowHeader = document.createElement('tr');
    var contentHeader = ["MSSV", "Họ Tên", "Điểm Trung Bình", "Xếp loại"];
    for (var a = 0; a < contentHeader.length; a++) {
        var headerCreation = document.createElement('th');
        headerCreation.setAttribute('style', 'text-align: center');
        headerCreation.innerHTML = contentHeader[a];
        rowHeader.appendChild(headerCreation);
    }
    tableSV.appendChild(rowHeader);
    for (var i = 0; i <= dsSinhVien.DSSV.length; i++) {
        var rowCreation = document.createElement('tr');
        for (var j = 0; j < contentHeader.length; j++) {
            var svTmp = dsSinhVien.DSSV[i];
            var columnCreation = document.createElement('td');
            columnCreation.setAttribute('style', 'text-align: center');
            if (j == 0) {
                var columnTxTCreation = document.createTextNode(svTmp.MSSV);
                columnCreation.appendChild(columnTxTCreation);
            } else if (j == 1) {
                var columnTxTCreation = document.createTextNode(svTmp.HoTen);
                columnCreation.appendChild(columnTxTCreation);
            } else if (j == 2) {
                var columnTxTCreation = document.createTextNode(svTmp.DTB);
                columnCreation.appendChild(columnTxTCreation);
            } else {
                var columnTxTCreation = document.createTextNode(svTmp.XepLoai);
                columnCreation.appendChild(columnTxTCreation);
            }
            rowCreation.appendChild(columnCreation);
        }
        tableSV.appendChild(rowCreation);
    }
}

//Xuất sinh viên có diểm trung bình cao nhất
function XuatTop1() {
    var svMax = dsSinhVien.Top1();
    var titleDisplay = document.getElementById('titleDisplay');
    titleDisplay.innerHTML = '';
    var titleResult = document.createElement('h4');
    titleResult.setAttribute('style', 'margin-left: 5%');
    titleResult.innerHTML = "Sinh viên xuất sắc nhất";
    titleDisplay.appendChild(titleResult);
    var tableSV = document.getElementById('tableStudent');
    tableSV.innerHTML = '';
    var rowHeader = document.createElement('tr');
    var contentHeader = ["MSSV", "Họ Tên", "Điểm Trung Bình", "Xếp loại"];
    for (var a = 0; a < contentHeader.length; a++) {
        var headerCreation = document.createElement('th');
        headerCreation.setAttribute('style', 'text-align: center');
        headerCreation.innerHTML = contentHeader[a];
        rowHeader.appendChild(headerCreation);
    }
    tableSV.appendChild(rowHeader);
    var rowCreation = document.createElement('tr');
    for (var j = 0; j < contentHeader.length; j++) {
        var columnCreation = document.createElement('td');
        columnCreation.setAttribute('style', 'text-align: center');
        if (j == 0) {
            var columnTxTCreation = document.createTextNode(svMax.MSSV);
            columnCreation.appendChild(columnTxTCreation);
        } else if (j == 1) {
            var columnTxTCreation = document.createTextNode(svMax.HoTen);
            columnCreation.appendChild(columnTxTCreation);
        } else if (j == 2) {
            var columnTxTCreation = document.createTextNode(svMax.DTB);
            columnCreation.appendChild(columnTxTCreation);
        } else {
            var columnTxTCreation = document.createTextNode(svMax.XepLoai);
            columnCreation.appendChild(columnTxTCreation);
        }
        rowCreation.appendChild(columnCreation);
    }
    tableSV.appendChild(rowCreation);
}

//Xuất Top 10 sinh viên có DTB cao nhất
function XuatTop10() {
    var Top10SinhVien = dsSinhVien.Top10();
    var titleDisplay = document.getElementById('titleDisplay');
    titleDisplay.innerHTML = '';
    var titleResult = document.createElement('h4');
    titleResult.setAttribute('style', 'margin-left: 5%');
    titleResult.innerHTML = "Top 10 Sinh viên xuất sắc nhất";
    titleDisplay.appendChild(titleResult);
    var tableSV = document.getElementById('tableStudent');
    tableSV.innerHTML = '';
    var rowHeader = document.createElement('tr');
    var contentHeader = ["MSSV", "Họ Tên", "Điểm Trung Bình", "Xếp loại"];
    for (var a = 0; a < contentHeader.length; a++) {
        var headerCreation = document.createElement('th');
        headerCreation.setAttribute('style', 'text-align: center');
        headerCreation.innerHTML = contentHeader[a];
        rowHeader.appendChild(headerCreation);
    }
    tableSV.appendChild(rowHeader);
    for (var i = 0; i <= Top10SinhVien.length; i++) {
        var rowCreation = document.createElement('tr');
        for (var j = 0; j < contentHeader.length; j++) {
            var svTmp = Top10SinhVien[i];
            var columnCreation = document.createElement('td');
            columnCreation.setAttribute('style', 'text-align: center');
            if (j == 0) {
                var columnTxTCreation = document.createTextNode(svTmp.MSSV);
                columnCreation.appendChild(columnTxTCreation);
            } else if (j == 1) {
                var columnTxTCreation = document.createTextNode(svTmp.HoTen);
                columnCreation.appendChild(columnTxTCreation);
            } else if (j == 2) {
                var columnTxTCreation = document.createTextNode(svTmp.DTB);
                columnCreation.appendChild(columnTxTCreation);
            } else {
                var columnTxTCreation = document.createTextNode(svTmp.XepLoai);
                columnCreation.appendChild(columnTxTCreation);
            }
            rowCreation.appendChild(columnCreation);
        }
        tableSV.appendChild(rowCreation);
    }
}

//Xuất kết quả tìm kiếm theo MSSV
function TimKiemTheoMSSV() {
    var MSSVcantim = document.getElementById('mssv').value;
    var svKQua = dsSinhVien.TimKiemVoiMSSV(MSSVcantim);
    var titleDisplay = document.getElementById('titleDisplay');
    titleDisplay.innerHTML = '';
    var titleResult = document.createElement('h4');
    titleResult.setAttribute('style', 'margin-left: 5%');
    titleResult.innerHTML = "Sinh viên có MSSV - " + MSSVcantim + " được tìm thấy";
    titleDisplay.appendChild(titleResult);
    var tableSV = document.getElementById('tableStudent');
    tableSV.innerHTML = '';
    var rowHeader = document.createElement('tr');
    var contentHeader = ["MSSV", "Họ Tên", "Điểm Trung Bình", "Xếp loại"];
    for (var a = 0; a < contentHeader.length; a++) {
        var headerCreation = document.createElement('th');
        headerCreation.setAttribute('style', 'text-align: center');
        headerCreation.innerHTML = contentHeader[a];
        rowHeader.appendChild(headerCreation);
    }
    tableSV.appendChild(rowHeader);
    var rowCreation = document.createElement('tr');
    for (var j = 0; j < contentHeader.length; j++) {
        var columnCreation = document.createElement('td');
        columnCreation.setAttribute('style', 'text-align: center');
        if (j == 0) {
            var columnTxTCreation = document.createTextNode(svKQua.MSSV);
            columnCreation.appendChild(columnTxTCreation);
        } else if (j == 1) {
            var columnTxTCreation = document.createTextNode(svKQua.HoTen);
            columnCreation.appendChild(columnTxTCreation);
        } else if (j == 2) {
            var columnTxTCreation = document.createTextNode(svKQua.DTB);
            columnCreation.appendChild(columnTxTCreation);
        } else {
            var columnTxTCreation = document.createTextNode(svKQua.XepLoai);
            columnCreation.appendChild(columnTxTCreation);
        }
        rowCreation.appendChild(columnCreation);
    }
    tableSV.appendChild(rowCreation);
}
