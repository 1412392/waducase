var product = {
    init: function () {
        product.deleteProduct();
    },
    deleteProduct: function () {
        $('.btn-delete-account').off('click').on('click', function (e) {//phải có off để single click với id đó
            e.preventDefault();

            var btn = $(this);
            var id = parseInt(btn.data("id")); //prefix la data, sau là id (id là do tự đặt trong view)
            var idrow = "#row_" + id;
            bootbox.confirm({
                message: "Bạn có chắc chắn muốn xóa user này?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result === true) {
                        $.ajax({
                            url: '/admin/account/deleteaccount',
                            data: { id: id },
                            type: 'POST',
                            ajaxasync: true,
                            dataType: 'json',
                            success: function (response) {
                                if (response.status === true) {

                                    $(idrow).remove();
                                    location.reload();
                                }
                                else {
                                    alert(response.message);
                                }

                            },
                            error: function () {
                                alert("Có lỗi xảy ra. Vui lòng kiểm tra lại thao tác");
                            }

                        });
                    }

                }
            });



        });
    }
}
product.init();