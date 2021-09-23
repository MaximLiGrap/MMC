var queryIndex = 1;
var car_names = $('.calc_settings select#car-name');
var car_drives = $('.calc_settings select#car-drive');
var car_kpps = $('.calc_settings select#car-kpp');
var car_wds = $('.calc_settings select#car-wd');
var ages = $('.calc_settings select#car-age');
var periods = $('.calc_settings select#period-to');
var dealer_list = $('.container_map-diler #dealer_list');

var cities = $('#city_block');
var car_image = $('.calc_img img');

var currency = '<i class="fa fa-rub"></i>';

var sign_up_button = $('.setting-panel .setting-block .sign-up');

var total_text = {
    self: $('.total-text'),
    showText1: function () {
        this.self.show();
        this.self.find('.text-1').show();
        this.self.find('.text-2').hide();
    },
    showText2: function () {
        this.self.find('.text-2').show();
    },
    hideAll: function () {
        this.self.hide();
        this.self.find('p').hide();
    }
};


var PriceController = function (className) {
    this.className = className;
    this.self = $('.setting-panel .setting-block .to-type .to-item.' + className);
    this.price = {
        full: 0,
        parts: 0,
        works: 0
    };
};

PriceController.prototype.set_parts_price = function (value) {
    this.set_hidding(value <= 0);
    this.price.parts = value;
    this.self.find('.to-prices.parts .desc-price').html(number_format(value) + ' ' + currency+' ₽');
    calc_content.parts.basic.set_total_price(this.className, value);
}

PriceController.prototype.set_works_price = function (value) {
    this.set_hidding();
    this.price.works = value;
    if (value > 0) {
        this.self.find('.to-prices.works .desc-price').html(number_format(value) + ' ' + currency);
        calc_content.works.basic.set_total_price(this.className, value);
        this.self.find('.to-prices.works').show();
        total_text.showText2();
    } else {
        this.self.find('.to-prices.works .desc-price').text(unknown_price);
    }
}


PriceController.prototype.set_TO_price = function (value) {
    this.price.full = value;
    if (value > 0) {
        this.self.find('span.price').html(number_format(value) + ' ' + currency+' ₽');
    } else {
        this.self.find('span.price').text(unknown_price);
    }
    this.set_hidding();
}


PriceController.prototype.set_extra_price = function (parts_value, works_value) {
    if (this.price.parts > 0)
        this.self.find('.to-prices.parts .desc-price').html(number_format(this.price.parts + parts_value) + ' ' + currency+' ₽');
    calc_content.parts.extra.set_total_price(this.className, parts_value);
    if (this.price.works > 0)
        this.self.find('.to-prices.works .desc-price').html(number_format(this.price.works + works_value) + ' ' + currency+' ₽');
    if (works_value > 0)
        calc_content.works.extra.set_total_price(this.className, works_value);
    if (this.price.full > 0)
        this.self.find('span.price').html(number_format(this.price.full + works_value + parts_value) + ' ' + currency+' ₽');
    this.set_hidding();
}

PriceController.prototype.set_hidding = function (value) {
    if (value !== undefined) {
        this.hiding = value;
    }
    if (!this.hiding && this.price.parts != 0) {
        this.self.show();
        calc_content.parts.basic.show_total_price(this.className);
        calc_content.works.basic.show_total_price(this.className);
        calc_content.parts.extra.show_total_price(this.className);
        calc_content.works.extra.show_total_price(this.className);
    } else {
        this.hide();
        calc_content.parts.basic.hide_total_price(this.className);
        calc_content.works.basic.hide_total_price(this.className);
        calc_content.parts.extra.hide_total_price(this.className);
        calc_content.works.extra.hide_total_price(this.className);
    }
}

PriceController.prototype.say_choose_dealer = function () {
    this.self.find('span.price').html('<a href="#map2link">Выберите дилера</a>');
    this.self.find('.to-prices.works').hide();
    calc_content.works.basic.self.find('.total-table .' + this.className + ' .price').html('<a href="#map2link">Выберите дилера</a>');
    calc_content.works.extra.self.find('.total-table .' + this.className + ' .price').html('<a href="#map2link">Выберите дилера</a>');
    this.price.full = 0;
    sign_up_button.attr('href', '#empty');
    sign_up_button.closest('.setting-block').hide();
}

PriceController.prototype.hide = function () {
    this.self.hide();
}

var ContentController = function (className) {
    this.basic = new ContentType('basic', className);
    this.extra = new ContentType('extra', className);
    this.basic.print_parts = function (parts) {
        var self = this;
        self.result.html('');
        parts.forEach(function (item) {
            $('<div class="row"></div>')
                .append($('<div class="col-md-7 col-12"></div>').text(item.name))
                .append($('<div class="col-md-2 col-6 count"></div>').html(item.klv))
                .append($('<div class="col-md-3 col-6 price"></div>').html(item.summ + ' ' + currency))
                .appendTo(self.result);
        });
    };
    this.basic.print_works = function (work_types, works) {
        var self = this;
        self.result.html('');
        $.each(work_types, function (type_key, type_name) {
            if (works[type_key] !== undefined) {
                var type_block = $('<ul class="list-unstyled"></ul>');
                $.each(works[type_key], function (key, work) {
                    type_block.append('<li><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;' + work + '</li>');
                });
                $('<p></p>')
                    .append($('<h3></h3>').text(type_name))
                    .append(type_block)
                    .appendTo(self.result);
            }
        });
    };
    //
};


var ContentType = function (TypeName, className) {
    this.self = $('.calc-content .calc-result .tabs-content .content.' + className + ' .' + TypeName); // example ".content.works .basic"
    this.result = this.self.find('.result-table');
}


ContentType.prototype.set_total_price = function (priceTypeClassName, value) {
    if (value > 0) {
        this.self.find('.total-table .' + priceTypeClassName + ' .price').html(number_format(value) + ' ' + currency);
    } else {
        this.self.find('.total-table .' + priceTypeClassName + ' .price').text('-');
    }
}

ContentType.prototype.hide_total_price = function (priceTypeClassName) {
    this.self.find('.total-table .' + priceTypeClassName).hide();
}

ContentType.prototype.show_total_price = function (priceTypeClassName) {
    this.self.find('.total-table .' + priceTypeClassName).show();
}



var TO_types = {
    self: $('.setting-panel .setting-block .to-type').attr('data-query', queryIndex),
    hide: function () {
        this.self.hide();
        this.self.closest('.setting-block').hide();
    },
    show: function () {
        this.self.show();
        this.self.closest('.setting-block').show();
        total_text.showText1();
    },
    say_choose_dealer: function () {
        this.standard.say_choose_dealer();
        this.plus3.say_choose_dealer();
    },
    standard: new PriceController('standard'),
    plus3: new PriceController('plus3')
};

var calc_content = {
    self: $('.calc-content'),
    parts: new ContentController('parts'),
    works: new ContentController('works')
}

var info_to = {
    self: $('.setting-panel #info-to').attr('data-query', queryIndex),
    id: $('.setting-panel #info-to .to-id'),
    extra: $('.setting-panel #info-to .to-extra'),
    hours: 0,
    set_hours: function (value) {
        this.hours = value;
        this.self.find('.to-hours').text(number_format(value, 1, '.', ''));
    },
    set_extra_hours: function (value, force_show) {
        if (value > 0 || force_show === true) {
            this.extra.show();
        } else {
            this.extra.hide();
        }
        this.self.find('.to-hours').text(number_format(this.hours + value, 1, '.', ''));
    }
};








var car_data = {
    "ASX": {
        image: '/files/images/auto/mini/asx.png',
        url: 'asx'
    },
    "ASX 20": {
        image: '/files/images/auto/mini/asx.png',
        url: 'asx'
    },
    "Eclipse Cross": {
        image: '/files/images/auto/mini/eclipse-cross.png',
        url: 'eclipse-cross'
    },
    "L200 Diesel IV": {
        image: '/files/images/auto/mini/l200-15my.png',
        url: 'l200-18my'
    },
    "L200-18MY Diesel V": {
        synonym: 'L200 Diesel V',
        image: '/files/images/auto/mini/l200-18my.png',
        url: 'l200-18my'
    },
    "L200 Diesel V": {
        image: '/files/images/auto/mini/l200.png',
        url: 'l200'
    },
    "Lancer": {
        image: '/files/images/auto/mini/lancer-x.png',
        url: 'lancer'
    },
    "Outlander II XL": {
        image: '/files/images/auto/mini/outlander-xl.png',
        url: 'outlander'
    },
    "Outlander III before17": {
        synonym: 'Outlander III',
        image: '/files/images/auto/mini/outlander.png',
        url: 'outlander'
    },
    "Outlander III": {
        image: '/files/images/auto/mini/outlander.png',
        url: 'outlander'
    },
    "Pajero III": {
        image: '/files/images/auto/mini/pajero-iii.png',
        url: 'pajero-iv'
    },
    "Pajero IV": {
        image: '/files/images/auto/mini/pajero-iv.png',
        url: 'pajero-iv'
    },
    "Pajero IV Diesel": {
        image: '/files/images/auto/mini/pajero-iv.png',
        url: 'pajero-iv'
    },
    "Pajero Sport": {
        image: '/files/images/auto/mini/pajero-sport-16MY.png',
        url: 'pajero-sport'
    },
    "Pajero Sport Diesel": {
        image: '/files/images/auto/mini/pajero-sport-16MY.png',
        url: 'pajero-sport'
    },
    "Pajero Sport QX": {
        image: '/files/images/auto/mini/pajero-sport.png',
        url: 'pajero-sport'
    },
    "Pajero Sport QX Diesel": {
        image: '/files/images/auto/mini/pajero-sport.png',
        url: 'pajero-sport'
    }
};

var car_ages = {
    0: 'менее 30 мес.',
    30: 'от 30 до 36 мес.',
    37: 'от 37 до 72 мес.',
    73: 'более 72 мес.'
};


var ExtraWorksController = function () {
    this.self = $('#dopWorks');
    this.init();
}

ExtraWorksController.prototype.init = function (inputWorksList) {
    this.prices = {
        parts: null,
        works: null
    };
    calc_content.works.extra.result.html('');
    calc_content.works.extra.list = $('<ul class="list-unstyled"></ul>');
    calc_content.works.extra.result.append(
        $('<p></p>').append(
            $('<h3></h3>').text('Дополнительные работы')
        ).append(calc_content.works.extra.list)
    );
    calc_content.parts.extra.result.html('');
    this.total = {
        hours: 0,
        parts: {
            standard: 0,
            plus3: 0
        },
        dealers: {}
    };
    this.current_dealer = null;
    this.nulltime_works = [];
    calc_content.works.extra.self.hide();
    calc_content.parts.extra.self.hide();
    if (inputWorksList !== undefined) {
        this.self.html('');
        this.worksList = inputWorksList;
        this.drawWorksList(inputWorksList);
    }
}

ExtraWorksController.prototype.sayDealersReady = function () {
    var self = this;
    placemarks.filter(function (item) {
        return item.price > 0;
    }).forEach(function (item) {
        self.total.dealers[item.dcCode] = {
            standard: 0,
            plus3: 0
        };
    });
}


ExtraWorksController.prototype.drawWorksList = function (worksList) {
    //console.log(worksList);
    var self = this;
    if (Object.keys(self.worksList).length > 0) {
        $.each(worksList, function (key, item) {
            var work = $('<input class="check" type="checkbox" extra-id="' + key + '">');
            var has_desc = item.desc !== undefined;
            var title = (has_desc ? item.desc : '');
            self.self.append(
                $('<label class="checkbox__label"></label>')
                    .append(work)
                    .append('<span class="checkbox__name">' + item.name + '</span>')
                    .append((has_desc ? '&nbsp;&nbsp;<i class="fa fa-question-circle" aria-hidden="true" titlen="' + title + '"></i>' : ''))
                    // .append('<span class="checkmark"></span>')
            );
            work.on('change', function () {
                if (work.is(':checked'))
                    self.plusWork(key);
                else
                    self.minusWork(key);
                self.freshDealerList(key);
            });
        });
    } else {
        self.self.hide();
        self.self.closest('.setting-block').hide();
    }
}

ExtraWorksController.prototype.setPartsWorksPrices = function (parts, works) {
    this.prices.parts = parts;
    this.prices.works = works;
}

ExtraWorksController.prototype.isReady = function () {
    if (this.prices.parts != null
        && this.prices.parts !== undefined
        && this.prices.works != null
        && this.prices.works !== undefined
        && this.worksList != null
        && this.worksList !== undefined
        && placemarks !== undefined
        && placemarks != null)
        return true;
    else return false;
}

ExtraWorksController.prototype.plusWork = function (id) {
    if (this.isReady()) {
        var self = this;
        var is_nulltime = self.nulltime_works.indexOf(parseInt(id)) > -1;
        if (!is_nulltime)
            self.total.hours += parseFloat(self.worksList[id].hours);
        $.each(self.prices.parts[id], function (key, item) {
            self.total.parts.standard += parseFloat(item.summ);
            self.total.parts.plus3 += parseFloat(item.summ3);
            $('<div class="row" extra-id="' + id + '"></div>')
                .append($('<div class="col-md-7 col-12"></div>').text(item.name))
                .append($('<div class="col-md-2 col-6 count"></div>').html(item.klv))
                .append($('<div class="col-md-3 col-6 price"></div>').html(number_format(item.summ) + ' ' + currency))
                .appendTo(calc_content.parts.extra.result);
        });
        placemarks.filter(function (item) {
            return item.price > 0;
        }).forEach(function (item) {
            if (!is_nulltime) {
                self.total.dealers[item.dcCode].standard += parseFloat(self.prices.works[id][item.dcCode].price);
                self.total.dealers[item.dcCode].plus3 += parseFloat(self.prices.works[id][item.dcCode].price3);
            }
        });
        if (!is_nulltime) {
            calc_content.works.extra.list.append('<li extra-id="' + id + '"><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;' + self.worksList[id].name + '</li>');
        }
    }
}

ExtraWorksController.prototype.minusWork = function (id) {
    if (this.isReady()) {
        var self = this;
        var is_nulltime = self.nulltime_works.indexOf(parseInt(id)) > -1;
        if (!is_nulltime)
            self.total.hours -= parseFloat(self.worksList[id].hours);
        $.each(self.prices.parts[id], function (key, item) {
            self.total.parts.standard -= parseFloat(item.summ);
            self.total.parts.plus3 -= parseFloat(item.summ3);
        });
        placemarks.filter(function (item) {
            return item.price > 0;
        }).forEach(function (item) {
            if (!is_nulltime) {
                self.total.dealers[item.dcCode].standard -= parseFloat(self.prices.works[id][item.dcCode].price);
                self.total.dealers[item.dcCode].plus3 -= parseFloat(self.prices.works[id][item.dcCode].price3);
            }
        });
        calc_content.parts.extra.result.find('[extra-id="' + id + '"]').detach();
        if (!is_nulltime)
            calc_content.works.extra.list.find('[extra-id="' + id + '"]').detach();
    }
}


ExtraWorksController.prototype.freshDealerList = function (id) {
    var self = this;
    if (id === undefined) {
        self.self.find('input:checked').each(function () {
            self.plusWork($(this).attr('extra-id'));
        });
    }
    if (self.isReady()) {
        if (self.total.parts.standard > 0)
            calc_content.parts.extra.self.show();
        else
            calc_content.parts.extra.self.hide();
        if (self.total.hours > 0)
            calc_content.works.extra.self.show();
        else
            calc_content.works.extra.self.hide();
        placemarks.filter(function (item) {
            return item.price > 0;
        }).forEach(function (item) {
            var new_sum = item.price + self.total.dealers[item.dcCode].standard + self.total.parts.standard;
            dealer_list.find('[data-dccode=' + item.dcCode + '] .price').html(number_format(new_sum) + ' ' + currency);
        });
        info_to.set_extra_hours(self.total.hours, self.total.parts.standard > 0);
        self.set_current_dealer();
    }
}

ExtraWorksController.prototype.set_current_dealer = function (dcCode) {
    if (dcCode !== undefined)
        this.current_dealer = dcCode;
    if (this.current_dealer != null && this.current_dealer !== undefined) {
        var currentDealer = extra_works.total.dealers[this.current_dealer];
        if (currentDealer !== undefined) {
            TO_types.plus3.set_extra_price(this.total.parts.plus3, currentDealer.plus3);
            TO_types.standard.set_extra_price(this.total.parts.standard, currentDealer.standard);
        }
    } else {
        TO_types.plus3.set_extra_price(this.total.parts.plus3, 0);
        TO_types.standard.set_extra_price(this.total.parts.standard, 0);
    }
}



ExtraWorksController.prototype.hide_repetitions = function (basic_parts) {
    var self = this;
    self.self.find('input').prop('disabled', false);
    self.self.find('label').removeAttr('title').off('click');
    $.each(basic_parts, function (basic_key, basic_item) {
        $.each(self.prices.parts, function (self_key, self_item) {
            $.each(self_item, function (part_key, part_item) {
                var input = self.self.find('[extra-id="' + self_key + '"]').first();
                if (basic_item.code == part_item.code) {
                    input.closest('label').attr('title', 'Данная работа входит в регламентное ТО');
                    input.prop('checked', false);
                    input.prop('disabled', true);
                }
            });
        });
    });
}


ExtraWorksController.prototype.set_nulltime_works = function (work_ids) {
    this.nulltime_works = work_ids;
};


var extra_works = new ExtraWorksController();


function refresh_dealers() {
    placemarks.forEach(function (item, index) {
        if (item.dcCode === 'qqqq') {
            placemarks.splice(index,1);
        }
    });
    drawPlacemarks(placemarks);
    ShowDealerList(placemarks);
    extra_works.freshDealerList();
}

function ShowDealerList(_placemarks) {
    //console.log(_placemarks);
    dealer_list.html('');
    if (_placemarks !== undefined && _placemarks != null && dealer_list !== undefined) {
        var current_city = cities.find("option:selected");
        var lat = parseFloat(current_city.attr("data-lat")),
            lon = parseFloat(current_city.attr("data-lon"));
        _placemarks.sort(function(a, b) {
            var a_lon = parseFloat(a.lon),
                a_lat = parseFloat(a.lat);
            var b_lon = parseFloat(b.lon),
                b_lat = parseFloat(b.lat);
            return getDistance(lat, lon, a_lat, a_lon) - getDistance(lat, lon, b_lat, b_lon);
        }).forEach(function(item) {
            console.log(item);
            if (item.dcCode !== 'qqqq') {
                var html = $('<div href="#" class="diler"></div>')
                    .attr('data-lon', item.lon)
                    .attr('data-lat', item.lat)
                    .attr('data-dccode', item.dcCode)
                    .append('<div class="diler-adres-btn"><p class="text text_500">' + item.name + '</p>')
                    .append('<p class="text-small">' + item.address + '</p>')
                    .append('<a class="text-small" href="tel:' + item.phone + '">' + item.phone + '</a></div>')
                    .append('<div><div class="text-small text_500 diler_price"><p>Стоимость по программе 3+</p> <p class="text_500 text price">' +
                        (item.price > 0 ? number_format(item.price, 0, ' ', ' ') + currency : unknown_price) +
                        '₽</p></div></div>')
                    // ' data-toggle="modal" data-target="' + mapButton_toggle + '" ';
                    // .append('<p><a class="site" href="https://' + item.button_to + '#' + car_data[car_names.val()].url + '" data-toggle="modal" data-target="' + mapButton_toggle + '">Запись на ТО</a></p>')
                    .appendTo(dealer_list);
                myMap.balloon.close();
                html.click(function(e, trigger) {
                    dealer_list.find('.diler').removeClass('active');
                    $(this).addClass('active');
                    var dealerCoord = [item.lat, item.lon];
                    map_set_dealer(dealerCoord, item.price, item.price3);
                    to_types_set_value(item.dcCode);
                });
            }
        });
        dealer_list.animate({ scrollTop: 0 }, 500);
        dealer_list.attr('style', '');
    } else {
        console.log('__placemarks_is__undefined');
    }
}



function ElementConstruct(idSelect, item, currentVal, car_data, type){
    $('#'+idSelect).removeClass('d-none');

    if(currentVal!=='' && car_data!==''){
        car_image.attr('src', car_data[currentVal].image);
    }
 
    //console.log(Object.keys(item).length);
    $('#'+idSelect).empty();
    if(Object.keys(item).length>1){

        $('#'+idSelect).append('<option value="">'+type+'</option>');
        $.each(item, function (key, value) {
            if(type=='Выберите привод'){
                $('#'+idSelect).append('<option value="'+value+'">'+key+' </option>');
            }
            // else if(type=='Выберите периодическое ТО'){
            //     console.log(value);
            // }
            else{
                $('#'+idSelect).append('<option value="'+key+'">'+key+' </option>');
            }
    
        });
    }
    if(Object.keys(item).length==1){
        $.each(item, function (key, value) {
            if(type=='Выберите привод'){
                $('#'+idSelect).append('<option value="'+value+'">'+key+' </option>');
            }
            // else if(type=='Выберите периодическое ТО'){
            //     console.log(value);
            // }
            else{
                $('#'+idSelect).append('<option value="'+key+'">'+key+' </option>');
            }
        });

        $('#'+idSelect).trigger('change');
    }
}

//console.log(placemarks);

$.post({
    url: requestURL,
    dataType: 'json',
    data: {
        get: 'Techservice.calculatormin',
        data: {
            'modelname': '0',
            'modeldrive': '0',
            'modelkpp': '0',
            'modelid': '0',
            'toid': '',
            'dclist': dc_code,
            'time': Math.random() * 100000
        }
    },
    success: function (data) {
        data = data['Techservice.calculatormin'];

        var carNameValue = "";
        
        $.each(data.cars, function (key, value) {
            var nameCar = key;
            var yearCar = data.years[key];
            if(yearCar==undefined){
                $('#car-name').append('<option value="'+nameCar+'">'+nameCar+' </option>');
            }
            else{
                $('#car-name').append('<option value="'+nameCar+'">'+nameCar+' '+yearCar+' </option>');
            }
        });

        $.each(data.toyearslist, function (key, value) {

            periods.append(
                $("<option></option>")
                    .attr("value", key)
                    .text(value)
                    .text('TO-' + key + ' (' + value + ' км или ' + key + ' ' + age_ru(key) + ')')
            );
        });

        ages.append("<option>Выберите возраст автомобиля</option>");
        $.each(car_ages, function (key, value) {

            ages.append(
                $("<option></option>")
                    .attr("value", key)
                    .text(value)
            );
        });

        car_names.on('change', function () {
            car_drives.empty();
            car_drives.addClass('d-none');

            car_kpps.empty();
            car_kpps.addClass('d-none');

            car_wds.empty();
            car_wds.addClass('d-none');

            // $('#car-age').empty();
            // $('#car-age').addClass('d-none');

            periods.empty();
            periods.addClass('d-none');

            ages.empty();
            ages.addClass('d-none');

            $("#add_works").addClass('d-none');

        });

        // if(Object.keys(data.cars[$(this).val()]).length==1){
        //     ElementConstruct('car-kpp', data.cars[$('#car-name').val()][$('#car-drive').val()], '', '', 'Выберите КПП');
        // }
        car_names.on('change', function () {
            ElementConstruct('car-drive', data.cars[$(this).val()], $(this).val(), car_data,'Выберите двигатель');
        });
        car_drives.on('change', function () {
            ElementConstruct('car-kpp', data.cars[$('#car-name').val()][$('#car-drive').val()], '', '', 'Выберите КПП');
        });
        car_kpps.on('change', function () {
            ElementConstruct('car-wd', data.cars[$('#car-name').val()][$('#car-drive').val()][$('#car-kpp').val()], '', '','Выберите привод');
        });
        car_wds.on('change', function () {
            console.log('change');
           //ElementConstruct(data, 'car-wd', data.cars[$('#car-name').val()][$('#car-drive').val()][$('#car-kpp').val()], '', '','wd');
           //$('#period-to').removeClass('d-none');
           ages.append("<option>Выберите возраст автомобиля</option>");
           $.each(car_ages, function (key, value) {
                ages.append(
                    $("<option></option>")
                        .attr("value", key)
                        .text(value)
                );
            });
           ages.removeClass('d-none');
        });
        ages.on('change', function () {

            periods.removeClass('d-none');
            
            periods.append("<option>Выберите периодическое ТО</option>");
            $.each(data.toyearslist, function (key, value) {

                periods.append(
                    $("<option></option>")
                        .attr("value", key)
                        .text(value)
                        .text('TO-' + key + ' (' + value + ' км или ' + key + ' ' + age_ru(key) + ')')
                );
            });

            //var query = ages.attr('data-query');
            $.post({
                url: requestURL,
                dataType: 'json',
                data: {
                    get: 'Techservice.calculatormin',
                    data: {
                        'modelname': car_names.val(),
                        'modeldrive': car_drives.val(),
                        'modelkpp': car_kpps.val(),
                        'modelid': car_wds.val(),
                        'carage': ages.val(),
                        'dopworks': 1,
                        'dclist': dc_code,
                        'time': Math.random() * 100000
                    }
                },
                success: function (extra_works_result) {

                    // $('.setting-panel [data-query]').filter(function () {
                    //      return parseInt($(this).attr("data-query")) > parseInt(query)
                    // }).hide();
                    // periods.closest('.setting-block').show();
                    // periods.show();
                    extra_works.init(extra_works_result['Techservice.calculatormin'].dopworksforcar);
                }
            });
        });
        periods.on('change', function () {
            periods.removeClass('d-none');
            //$('#but_exec').removeClass('d-none');
            $('#add_works').removeClass('d-none');
                $.post({
                    url: requestURL,
                    dataType: 'json',
                    data: {
                        get: 'Techservice.calculatormin',
                        data: {
                            'modelname': car_names.val(),
                            'modeldrive': car_drives.val(),
                            'modelkpp': car_kpps.val(),
                            'modelid': car_wds.val(),
                            'carage': ages.val(),
                            'toid': periods.val(),
                            //'dopworks': 1,
                            'dclist': dc_code,
                            'time': Math.random() * 100000
                        }
                    },
                    success: function (to_result) {

                        to_result = to_result['Techservice.calculatormin'];
                        // if (calc_content.self.parent().is('.small-screen-content')) {
                        //     tabs_head.find('.head').removeClass('active');
                        //     tabs_content.find('.content').removeClass('active');
                        // }
                        placemarks = to_result.dcjson;
                        //console.log(placemarks);
                        extra_works.init();
                        extra_works.set_nulltime_works(to_result.null_time_extra_works);
                        extra_works.setPartsWorksPrices(to_result.dop_works_sp, to_result.dop_works_work);
                        extra_works.sayDealersReady();
                        info_to.self.closest('.setting-block').show();
                        info_to.self.show();
                        info_to.id.html('TO-' + periods.val());
                        info_to.set_hours(to_result.tohours);
                        TO_types.standard.set_parts_price(to_result.totspartssum);
                        TO_types.plus3.set_parts_price(to_result.totspartssum3);
                        TO_types.say_choose_dealer();
                        TO_types.show();
                        calc_content.parts.basic.print_parts(to_result.spareparts);
                        calc_content.works.basic.print_works(to_result.worktypes, to_result.works);
                        extra_works.hide_repetitions(to_result.spareparts);
                        if (Object.keys(extra_works.worksList).length > 0) {
                            extra_works.self.show();
                            extra_works.self.closest('.setting-block').show();
                        }
                        refresh_dealers();

                        // ShowDealerList(placemarks);
                        $("#map-container").removeClass('d-none');
                        $("#add_works").removeClass('d-none');
                        //$("#dopWorks").html("");
                        // $.each(extra_works_result['Techservice.calculatormin'].dopworksforcar, function(key, item) {
                        //     var has_desc = item.desc !== undefined;
                        //     var title = (has_desc ? item.desc : '');
                        //     //console.log (item.name);
                        //     $("#dopWorks").append("<label class='checkbox__label'>"+
                        //     "<input data-change='false' class='check' type='checkbox' name='push' required=''>"+
                        //     "<span class='checkbox__name'>"+item.name+"</span>"+
                        //     "<i class='fa fa-question-circle' aria-hidden='true' titlen="+title+"></i>"+
                        //     "</label>");
                        // });

                    }
                });
        });

        // $( "#but_exec" ).click(function() {
        //     $('#add_works').removeClass('d-none');

        //     // console.log(car_names.val());
        //     // console.log(car_drives.val());
        //     // console.log(car_kpps.val());
        //     // console.log(car_wds.val());
        //     // console.log(ages.val());
        //     // console.log(periods.val());
            

        //     $.post({
        //         url: requestURL,
        //         dataType: 'json',
        //         data: {
        //             get: 'Techservice.calculatormin',
        //             data: {
        //                 'modelname': car_names.val(),
        //                 'modeldrive': car_drives.val(),
        //                 'modelkpp': car_kpps.val(),
        //                 'modelid': car_wds.val(),
        //                 'carage': ages.val(),
        //                 'toid': periods.val(),
        //                 'dclist': dc_code,
        //                 'time': Math.random() * 100000
        //             }
        //         },
        //         success: function (to_result) {
        //             to_result = to_result['Techservice.calculatormin'];
        //             console.log(to_result);
        //             // if (calc_content.self.parent().is('.small-screen-content')) {
        //             //     tabs_head.find('.head').removeClass('active');
        //             //     tabs_content.find('.content').removeClass('active');
        //             // }
        //             // placemarks = to_result.dcjson;
        //             extra_works.init();
        //             extra_works.set_nulltime_works(to_result.null_time_extra_works);
        //             // extra_works.setPartsWorksPrices(to_result.dop_works_sp, to_result.dop_works_work);
        //             // extra_works.sayDealersReady();
        //             // info_to.self.closest('.setting-block').show();
        //             // info_to.self.show();
        //             // info_to.id.html('TO-' + periods.val());
        //             // info_to.set_hours(to_result.tohours);
        //             // TO_types.standard.set_parts_price(to_result.totspartssum);
        //             // TO_types.plus3.set_parts_price(to_result.totspartssum3);
        //             // TO_types.say_choose_dealer();
        //             // TO_types.show();
        //             // calc_content.parts.basic.print_parts(to_result.spareparts);
        //             // calc_content.works.basic.print_works(to_result.worktypes, to_result.works);
        //             // extra_works.hide_repetitions(to_result.spareparts);
        //             // if (Object.keys(extra_works.worksList).length > 0) {
        //             //     extra_works.self.show();
        //             //     extra_works.self.closest('.setting-block').show();
        //             // }
        //             // refresh_dealers();
        //         }
        //     });
        // });
    },
    error: function (errMsg) {
        console.log('Error: ' + errMsg.statusText);
    }
});


function age_ru(age) {
    var txt;
    count = age % 100;
    if (count >= 5 && count <= 20) {
        txt = 'лет';
    } else {
        count = count % 10;
        if (count === 1) {
            txt = 'год';
        } else if (count >= 2 && count <= 4) {
            txt = 'года';
        } else {
            txt = 'лет';
        }
    }
    return txt;
}


function getDistance(lat1, lon1, lat2, lon2) {
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function map_set_dealer(dealerCoord, price, price3) {
    myMap.setCenter(dealerCoord, 12);
    var current = geoObjects.find(function(geoItem) {
        var geoCoord = geoItem.geometry.getCoordinates();
        return parseFloat(geoCoord[0]) === parseFloat(dealerCoord[0]) && parseFloat(geoCoord[1]) === parseFloat(dealerCoord[1]);
    });
    current.balloon.open();
    if (price <= 0) {
        $('#to-div-totprice').html('<h3 class="h3">' + unknown_price + '</h3>');
    } else {
        $('#to-div-totprice').html('<h3 class="h3">' + number_format(price, 0, ' ', ' ') + ' ' + currency + '</h3>');
    }
    if (price3 > 0) {
        $('#to-div-totprice3').html('<h3 class="h3">' + number_format(price3, 0, ' ', ' ') + ' ' + currency + '</h3>');
    } else {
        $('#to-div-totprice3').html('<h3 class="h3">' + unknown_price + '</h3>');
    }
}

function active_dealer_on_list(dcCode) {
    var listItem = dealer_list.find('[data-dccode="' + dcCode + '"]').first();
    if (dealer_list !== undefined && listItem !== undefined && listItem.length > 0) {
        dealer_list.find('.diler').removeClass('active');
        listItem.addClass('active');
        dealer_list.animate({scrollTop: dealer_list.scrollTop() + listItem.position().top}, 1100);
    }
}

function to_types_set_value(dcCode) {
    var dealer = placemarks.find(function(item) {
        return item.dcCode === dcCode;
    });
    if (dealer === undefined || dealer.price === undefined)
        console.log('__dealer__cannot__be__found')
    else {
        sign_up_button.attr('href', 'http://' + dealer.button_to + '#' + car_data[car_names.val()].url);
        sign_up_button.closest('.setting-block').show();
        TO_types.standard.set_TO_price(dealer.price); // + currentDealer.standard + extra_works.total.parts.standard
        TO_types.standard.set_works_price(dealer.sumworks); // + currentDealer.standard
        TO_types.plus3.set_hidding(!dealer.plus3);
        TO_types.plus3.set_TO_price(dealer.price3); // + currentDealer.plus3 + extra_works.total.parts.plus3
        TO_types.plus3.set_works_price(dealer.sumworks3); // + currentDealer.plus3
        extra_works.set_current_dealer(dcCode);
    }
}