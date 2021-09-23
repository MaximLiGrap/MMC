var PriceController = function(className) {
    this.className = className;
    this.self = $('.setting-panel .setting-block .to-type .to-item.' + className);
    this.price = {
        full: 0,
        parts: 0,
        works: 0
    };
};

PriceController.prototype.set_parts_price = function(value) {
    this.set_hidding(value <= 0);
    this.price.parts = value;
    this.self.find('.to-prices.parts .desc-price').html(number_format(value) + ' ' + currency);
    calc_content.parts.basic.set_total_price(this.className, value);
}

PriceController.prototype.set_works_price = function(value) {
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

PriceController.prototype.set_TO_price = function(value) {
    this.price.full = value;
    if (value > 0) {
        this.self.find('span.price').html(number_format(value) + ' ' + currency);
    } else {
        this.self.find('span.price').text(unknown_price);
    }
    this.set_hidding();
}


PriceController.prototype.set_extra_price = function(parts_value, works_value) {
    if (this.price.parts > 0)
        this.self.find('.to-prices.parts .desc-price').html(number_format(this.price.parts + parts_value) + ' ' + currency);
    calc_content.parts.extra.set_total_price(this.className, parts_value);
    if (this.price.works > 0)
        this.self.find('.to-prices.works .desc-price').html(number_format(this.price.works + works_value) + ' ' + currency);
    if (works_value > 0)
        calc_content.works.extra.set_total_price(this.className, works_value);
    if (this.price.full > 0)
        this.self.find('span.price').html(number_format(this.price.full + works_value + parts_value) + ' ' + currency);
    this.set_hidding();
}

PriceController.prototype.set_hidding = function(value) {
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

PriceController.prototype.say_choose_dealer = function() {
    this.self.find('span.price').html('<a href="#map2link">Р’С‹Р±РµСЂРёС‚Рµ РґРёР»РµСЂР°</a>');
    this.self.find('.to-prices.works').hide();
    calc_content.works.basic.self.find('.total-table .' + this.className + ' .price').html('<a href="#map2link">Р’С‹Р±РµСЂРёС‚Рµ РґРёР»РµСЂР°</a>');
    calc_content.works.extra.self.find('.total-table .' + this.className + ' .price').html('<a href="#map2link">Р’С‹Р±РµСЂРёС‚Рµ РґРёР»РµСЂР°</a>');
    this.price.full = 0;
    sign_up_button.attr('href', '#empty');
    sign_up_button.closest('.setting-block').hide();
}

PriceController.prototype.hide = function() {
    this.self.hide();
}

var ContentController = function(className) {
    this.basic = new ContentType('basic', className);
    this.extra = new ContentType('extra', className);
    this.basic.print_parts = function(parts) {
        var self = this;
        self.result.html('');
        parts.forEach(function(item) {
            $('<div class="row"></div>')
                .append($('<div class="col-md-7 col-12"></div>').text(item.name))
                .append($('<div class="col-md-2 col-6 count"></div>').html(item.klv))
                .append($('<div class="col-md-3 col-6 price"></div>').html(item.summ + ' ' + currency))
                .appendTo(self.result);
        });
    };
    this.basic.print_works = function(work_types, works) {
        var self = this;
        self.result.html('');
        $.each(work_types, function(type_key, type_name) {
            if (works[type_key] !== undefined) {
                var type_block = $('<ul class="list-unstyled"></ul>');
                $.each(works[type_key], function(key, work) {
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

var ContentType = function(TypeName, className) {
    this.self = $('.calc-content .calc-result .tabs-content .content.' + className + ' .' + TypeName); // example ".content.works .basic"
    this.result = this.self.find('.result-table');
}

ContentType.prototype.set_total_price = function(priceTypeClassName, value) {
    if (value > 0) {
        this.self.find('.total-table .' + priceTypeClassName + ' .price').html(number_format(value) + ' ' + currency);
    } else {
        this.self.find('.total-table .' + priceTypeClassName + ' .price').text('-');
    }
}

ContentType.prototype.hide_total_price = function(priceTypeClassName) {
    this.self.find('.total-table .' + priceTypeClassName).hide();
}

ContentType.prototype.show_total_price = function(priceTypeClassName) {
    this.self.find('.total-table .' + priceTypeClassName).show();
}

var ExtraWorksController = function() {
    this.self = $('.setting-panel div#extra-works');
    this.init();
}

ExtraWorksController.prototype.init = function(inputWorksList) {
    this.prices = {
        parts: null,
        works: null
    };
    calc_content.works.extra.result.html('');
    calc_content.works.extra.list = $('<ul class="list-unstyled"></ul>');
    calc_content.works.extra.result.append(
        $('<p></p>').append(
            $('<h3></h3>').text('Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ СЂР°Р±РѕС‚С‹')
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

ExtraWorksController.prototype.sayDealersReady = function() {
    var self = this;
    placemarks.filter(function(item) {
        return item.price > 0;
    }).forEach(function(item) {
        self.total.dealers[item.dcCode] = {
            standard: 0,
            plus3: 0
        };
    });
}

ExtraWorksController.prototype.drawWorksList = function(worksList) {
    var self = this;
    if (Object.keys(self.worksList).length > 0) {
        $.each(worksList, function(key, item) {
            var work = $('<input type="checkbox" extra-id="' + key + '">');
            var has_desc = item.desc !== undefined;
            var title = (has_desc ? item.desc : '');
            self.self.append(
                $('<label></label>')
                .append(work)
                .append('<span class="work-name">' + item.name + '</span>')
                .append((has_desc ? '&nbsp;&nbsp;<i class="fa fa-question-circle" aria-hidden="true" titlen="' + title + '"></i>' : ''))
                .append('<span class="checkmark"></span>')
            );
            work.on('change', function() {
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

ExtraWorksController.prototype.setPartsWorksPrices = function(parts, works) {
    this.prices.parts = parts;
    this.prices.works = works;
}

ExtraWorksController.prototype.isReady = function() {
    if (this.prices.parts != null &&
        this.prices.parts !== undefined &&
        this.prices.works != null &&
        this.prices.works !== undefined &&
        this.worksList != null &&
        this.worksList !== undefined &&
        placemarks !== undefined &&
        placemarks != null)
        return true;
    else return false;
}

ExtraWorksController.prototype.plusWork = function(id) {
    if (this.isReady()) {
        var self = this;
        var is_nulltime = self.nulltime_works.indexOf(parseInt(id)) > -1;
        if (!is_nulltime)
            self.total.hours += parseFloat(self.worksList[id].hours);
        $.each(self.prices.parts[id], function(key, item) {
            self.total.parts.standard += parseFloat(item.summ);
            self.total.parts.plus3 += parseFloat(item.summ3);
            $('<div class="row" extra-id="' + id + '"></div>')
                .append($('<div class="col-md-7 col-12"></div>').text(item.name))
                .append($('<div class="col-md-2 col-6 count"></div>').html(item.klv))
                .append($('<div class="col-md-3 col-6 price"></div>').html(number_format(item.summ) + ' ' + currency))
                .appendTo(calc_content.parts.extra.result);
        });
        placemarks.filter(function(item) {
            return item.price > 0;
        }).forEach(function(item) {
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

ExtraWorksController.prototype.minusWork = function(id) {
    if (this.isReady()) {
        var self = this;
        var is_nulltime = self.nulltime_works.indexOf(parseInt(id)) > -1;
        if (!is_nulltime)
            self.total.hours -= parseFloat(self.worksList[id].hours);
        $.each(self.prices.parts[id], function(key, item) {
            self.total.parts.standard -= parseFloat(item.summ);
            self.total.parts.plus3 -= parseFloat(item.summ3);
        });
        placemarks.filter(function(item) {
            return item.price > 0;
        }).forEach(function(item) {
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

ExtraWorksController.prototype.freshDealerList = function(id) {
    var self = this;
    if (id === undefined) {
        self.self.find('input:checked').each(function() {
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
        placemarks.filter(function(item) {
            return item.price > 0;
        }).forEach(function(item) {
            var new_sum = item.price + self.total.dealers[item.dcCode].standard + self.total.parts.standard;
            dealer_list.find('[data-dccode=' + item.dcCode + '] .price').html(number_format(new_sum) + ' ' + currency);
        });
        info_to.set_extra_hours(self.total.hours, self.total.parts.standard > 0);
        self.set_current_dealer();
    }
}

ExtraWorksController.prototype.set_current_dealer = function(dcCode) {
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

ExtraWorksController.prototype.hide_repetitions = function(basic_parts) {
    var self = this;
    self.self.find('input').prop('disabled', false);
    self.self.find('label').removeAttr('title').off('click');
    $.each(basic_parts, function(basic_key, basic_item) {
        $.each(self.prices.parts, function(self_key, self_item) {
            $.each(self_item, function(part_key, part_item) {
                var input = self.self.find('[extra-id="' + self_key + '"]').first();
                if (basic_item.code == part_item.code) {
                    input.closest('label').attr('title', 'Р”Р°РЅРЅР°СЏ СЂР°Р±РѕС‚Р° РІС…РѕРґРёС‚ РІ СЂРµРіР»Р°РјРµРЅС‚РЅРѕРµ РўРћ');
                    input.prop('checked', false);
                    input.prop('disabled', true);
                }
            });
        });
    });
}

ExtraWorksController.prototype.set_nulltime_works = function(work_ids) {
    this.nulltime_works = work_ids;
};

var fast_message = {
    self: $('.fast_message.to-calc').first(),
    showMessage: function(message) {
        this.self.find('.info').first().text(message);
        this.self.show();
    }
}
fast_message.self.find('button').click(function() {
    fast_message.self.hide();
});
$('body .setting-panel').on('click', '#extra-works.checkgroup label input[disabled] ~ .work-name', function() {
    var title = $(this).closest('label').attr('title');
    fast_message.showMessage(title);
});
$('body .setting-panel').on('click', '#extra-works.checkgroup label i', function(e) {
    var title = $(this).attr('titlen');
    // alert(title);
    fast_message.showMessage(title);
    e.preventDefault();
});
var queryIndex = 1;
var car_image = $('.setting-panel img.car-image');
var car_names = $('.setting-panel select#car-name').attr('data-query', queryIndex++);
var car_drives = $('.setting-panel select#car-drive').attr('data-query', queryIndex++);
var car_kpps = $('.setting-panel select#car-kpp').attr('data-query', queryIndex++);
var car_wds = $('.setting-panel select#car-wd').attr('data-query', queryIndex++);
var ages = $('.setting-panel select#car-age').attr('data-query', queryIndex++);
var periods = $('.setting-panel select#period-to').attr('data-query', queryIndex++);
var dealer_list = $('.dealer-list-and-map #dealer_list');
var total_text = {
    self: $('.total-text'),
    showText1: function() {
        this.self.show();
        this.self.find('.text-1').show();
        this.self.find('.text-2').hide();
    },
    showText2: function() {
        this.self.find('.text-2').show();
    },
    hideAll: function() {
        this.self.hide();
        this.self.find('p').hide();
    }
};
var calc_head = {
    name: $('.calc-head .name'),
    drive: $('.calc-head .drive'),
    kpp: $('.calc-head .kpp'),
    wd: $('.calc-head .wd'),
    to: $('.calc-head h2'),
    get_html: function() {
        return '<strong>'.concat(this.name.text(), ' ', this.drive.text(), ', ', this.kpp.text(), ', ', this.wd.text(), '</strong><br><small>', this.to.text(), '</small>');
    }
};
var start_text = $('.start-text');
var info_to = {
    self: $('.setting-panel #info-to').attr('data-query', queryIndex),
    id: $('.setting-panel #info-to .to-id'),
    extra: $('.setting-panel #info-to .to-extra'),
    hours: 0,
    set_hours: function(value) {
        this.hours = value;
        this.self.find('.to-hours').text(number_format(value, 1, '.', ''));
    },
    set_extra_hours: function(value, force_show) {
        if (value > 0 || force_show === true) {
            this.extra.show();
        } else {
            this.extra.hide();
        }
        this.self.find('.to-hours').text(number_format(this.hours + value, 1, '.', ''));
    }
};
var TO_types = {
    self: $('.setting-panel .setting-block .to-type').attr('data-query', queryIndex),
    hide: function() {
        this.self.hide();
        this.self.closest('.setting-block').hide();
    },
    show: function() {
        this.self.show();
        this.self.closest('.setting-block').show();
        total_text.showText1();
    },
    say_choose_dealer: function() {
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
var extra_works = new ExtraWorksController();
extra_works.self.attr('data-query', queryIndex)
var cities = $('.setting-panel select#city');
var tabs_head = $('.calc-result .tabs-head');
var tabs_content = $('.calc-result .tabs-content');
var small_screen_content = $('.setting-panel .setting-block.small-screen-content');
var sign_up_button = $('.setting-panel .setting-block .sign-up');
var currency = '<i class="fa fa-rub"></i>';
var popup_modal = {
    self: $('.modal.popup-modal'),
    auto_fill: {
        model: '',
        prod_year: '',
        mileage: '',
        dealer: '',
    },
    init: function() {
        this.auto_fill.auto = this.self.find('[data-field="FormICar"]').first();
        this.auto_fill.model = this.self.find('[placeholder="Р”СЂСѓРіР°СЏ РјРѕРґРµР»СЊ"]').first();
        this.auto_fill.mileage = this.self.find('[placeholder="РџСЂРѕР±РµРі"]').first();
        this.auto_fill.prod_year = this.self.find('[placeholder="Р“РѕРґ РІС‹РїСѓСЃРєР°"]').first();
        this.auto_fill.dealer = this.self.find('[placeholder="Р’С‹Р±РµСЂРёС‚Рµ РґРёР»РµСЂР°"]').first();
        for (var hidden in this.auto_fill) {
            this.auto_fill[hidden].parent().hide();
        }
        this.auto_fill.modal_info = this.self.find('.modal-info').first();
        var self = this;
        self.self.on("show.bs.modal", function(e) {
            var dealer = placemarks.find(function(item) {
                return item.dcCode === extra_works.current_dealer;
            });
            var car = car_names.val(),
                auto_url = car_data[car_names.val()].url,
                prod_year = car_names.find('option:selected').attr('data-year'),
                mileage = periods.find('option:selected').text(),
                modal_info = calc_head.get_html();
            if (dealer === undefined || dealer.price === undefined) {
                e.preventDefault();
                e.stopPropagation();
                self.self.off('show.bs.modal');
                fast_message.showMessage('РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°. РќРµРѕР±С…РѕРґРёРјРѕ РІС‹Р±СЂР°С‚СЊ РґРёР»РµСЂР°.');
                console.log('__dealer__not__selected', e.cancelable);
                return false;
            } else
                self.set_values(modal_info, auto_url, car, dealer.id, prod_year, mileage);
        });
        mapButton_toggle = '.popup-Zapis_na_TO';
    },
    set_values: function(modal_info, auto_url, model_name, dealer_id, prod_year, mileage) {
        this.auto_fill.auto.val(auto_url);
        this.auto_fill.modal_info.html(modal_info);
        this.auto_fill.model.val(model_name);
        this.auto_fill.dealer.val(dealer_id);
        this.auto_fill.prod_year.val(prod_year);
        this.auto_fill.mileage.val(mileage);
    }
};
popup_modal.init();

function start() {
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
        success: function(data) {
            function ElementConstruct(element, values_array, regex_value, regex_text) {
                var number = 0;
                if (element !== undefined)
                    number = parseInt(element.attr("data-query"));
                var next_element = $('.setting-panel select[data-query="' + (number + 1) + '"]').first();
                $('.setting-panel [data-query]').filter(function() {
                    return parseInt($(this).attr("data-query")) > number
                }).hide();
                next_element.html('');
                next_element.append($('<option value="" disabled selected hidden>' + next_element.data('name') + '</option>'));
                next_element.show();
                if (values_array !== undefined) {
                    $.each(values_array, function(key, value) {
                        next_element.append($("<option></option>")
                            .attr("value", regex_value.replace(/(__value)/g, value).replace(/(__key)/g, key))
                            .text(regex_text.replace(/(__value)/g, value).replace(/(__key)/g, key)));
                        /* '__key {data.years[key]}'.replace(/(?:\{)(\S*)(?:\})/g,window['$&'.replace('{','').replace('}','')]) */
                    });
                    if (Object.keys(values_array).length == 1) {
                        next_element.val(next_element.find("option:eq(1)").val());
                        next_element.trigger('change');
                    }
                }
                return next_element;
            }

            $.each(car_ages, function(key, value) {
                ages.append(
                    $("<option></option>")
                    .attr("value", key)
                    .text(value)
                );
            });
            data = data['Techservice.calculatormin'];
            car_names.closest('.setting-block').show();
            var next_element = ElementConstruct(undefined);
            $.each(car_data, function(key, value) {
                if (car_data[key] !== undefined)
                    next_element.append($("<option></option>")
                        .attr("value", key)
                        .attr('data-year', data.years[key])
                        .text((car_data[key].synonym === undefined ? key : car_data[key].synonym) + ' ' + data.years[key]));
            });
            next_element = ElementConstruct(ages); // '__key', ');
            $.each(data.toyearslist, function(key, value) {
                next_element.append($("<option></option>")
                    .attr("value", key)
                    .text('TO-' + key + ' (' + value + ' РєРј РёР»Рё ' + key + ' ' + age_ru(key) + ')'));
            });
            car_names.on('change', function() {
                start_text.show();
                $('.calc-content').hide();
                if (car_data[car_names.val()] !== undefined) {
                    car_image.attr('src', car_data[car_names.val()].image);
                }
                car_image.attr('title', car_names.val()).attr('alt', car_names.val());
                car_image.closest('.setting-block').hide();
                car_image.closest('.setting-block').show();
                extra_works.self.closest('.setting-block').hide();
                info_to.self.closest('.setting-block').hide();
                TO_types.hide();
                cities.closest('.setting-block').hide();
                ElementConstruct($(this), data.cars[car_names.val()], '__key', '__key');
            });
            car_drives.on('change', function() {
                ElementConstruct($(this), data.cars[car_names.val()][car_drives.val()], '__key', '__key');
            });
            car_kpps.on('change', function() {
                ElementConstruct($(this), data.cars[car_names.val()][car_drives.val()][car_kpps.val()], '__value', '__key');
            });
            car_wds.on('change', function() {
                ages.closest('.form-group').show();
                ages.show();
            });
            ages.on('change', function() {
                var query = ages.attr('data-query');
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
                    success: function(extra_works_result) {


                        $('.setting-panel [data-query]').filter(function() {
                            return parseInt($(this).attr("data-query")) > parseInt(query)
                        }).hide();
                        periods.closest('.setting-block').show();
                        periods.show();
                        extra_works.init(extra_works_result['Techservice.calculatormin'].dopworksforcar);
                    }
                });
            });

            periods.bind('beforehide', function() {
                periods.val('');
                periods.closest('.setting-block').hide();
                drawPlacemarks(null);
                ShowDealerList(null);
                calc_content.self.hide();
                TO_types.say_choose_dealer();
                start_text.show();
                total_text.hideAll();
                extra_works.self.hide();
            });
            periods.on('change', function() {
                start_text.hide();
                if (car_data[car_names.val()].synonym !== undefined)
                    calc_head.name.text(car_data[car_names.val()].synonym);
                else
                    calc_head.name.text(car_names.val());
                calc_head.drive.text(car_drives.val());
                calc_head.kpp.text(car_kpps.val());
                calc_head.wd.text(car_wds.find('option:selected').text());
                calc_head.to.text(periods.find('option:selected').text());
                TO_types.show();
                cities.closest('.setting-block').show();
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
                            'dclist': dc_code,
                            'time': Math.random() * 100000
                        }
                    },
                    success: function(to_result) {
                        to_result = to_result['Techservice.calculatormin'];
                        if (calc_content.self.parent().is('.small-screen-content')) {
                            tabs_head.find('.head').removeClass('active');
                            tabs_content.find('.content').removeClass('active');
                        }
                        placemarks = to_result.dcjson;
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
                    }
                });
                calc_content.self.show();
            });
            cities.val(cities.find("option:first").val()).trigger('change');
            cities.bind('beforehide', function() {
                cities.closest('.setting-block').hide();
            });
            cities.on('change', function() {
                var lat = $(this).find('option:selected').attr('data-lat');
                var lon = $(this).find('option:selected').attr('data-lon');
                myMap.setCenter([lat, lon]);
                ShowDealerList(placemarks);
            });
            tabs_head.find('.head').click(function() {
                var collapse = tabs_head.closest('.setting-panel').length == 0 || !$(this).is('.active');
                tabs_head.find('.head').removeClass('active');
                tabs_content.find('.content').removeClass('active');
                if (collapse) {
                    $(this).addClass('active');
                    tabs_content.find('.content.' + $(this).data('tab')).addClass('active');
                }
            });
        },
        error: function(errMsg) {
            console.log('Error: ' + errMsg.statusText);
        }
    });
}

$(function() {
    var _oldhide = $.fn.hide;
    $.fn.hide = function(speed, oldCallback) {
        return $(this).each(function() {
            var obj = $(this),
                newCallback = function() {
                    if ($.isFunction(oldCallback)) {
                        oldCallback.apply(obj);
                    }
                    obj.trigger('afterhide');
                };
            // you can trigger a before hide if you want
            obj.trigger('beforehide');
            // now use the old function to hide the element passing the new callback
            _oldhide.apply(obj, [speed, newCallback]);
        });
    };
    $('body').on('click', 'a[href="#map2link"]', function(event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        var href = $(this).attr('href').split('#');
        var name = href[href.length - 1];
        var top = $('[name = "' + name + '"]').offset().top;
        $('body,html').animate({ scrollTop: top }, 700);
    });

    $(window).resize(function() {
        if (small_screen_content.is(':visible')) {
            small_screen_content.prepend(calc_content.self);
        } else {
            $('div.start-text').parent().prepend(calc_content.self);
        }
    });
    dealer_list.hide();
    $(window).resize();
});


function refresh_dealers() {
    placemarks.forEach(function(item, index) {
        if (item.dcCode === 'qqqq') {
            placemarks.splice(index, 1);
        }
    });
    drawPlacemarks(placemarks);
    ShowDealerList(placemarks);
    extra_works.freshDealerList();
}

function ShowDealerList(_placemarks) {
    console.log(_placemarks);
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
            if (item.dcCode !== 'qqqq') {
                var html = $('<div href="#" class="list-group-item list-group-item-action align-items-start dealer_item"></div>')
                    .attr('data-lon', item.lon)
                    .attr('data-lat', item.lat)
                    .attr('data-dccode', item.dcCode)
                    .append('<h5 class="name">' + item.name + '</h5>')
                    .append('<span class="address">' + item.address + '</span><br>')
                    .append('<span><strong>РўРµР».: </strong><span class="phone">' + item.phone + '</span></span><br>')
                    .append('<span><strong>РЎС‚РѕРёРјРѕСЃС‚СЊ РўРћ<sup>3</sup>: </strong><span class="price">' +
                        (item.price > 0 ? number_format(item.price, 0, ' ', ' ') + currency : unknown_price) +
                        '</span></span><br>')
                    // ' data-toggle="modal" data-target="' + mapButton_toggle + '" ';
                    .append('<p><a class="site" href="https://' + item.button_to + '#' + car_data[car_names.val()].url + '" data-toggle="modal" data-target="' + mapButton_toggle + '">Р—Р°РїРёСЃСЊ РЅР° РўРћ</a></p>')
                    .appendTo(dealer_list);
                myMap.balloon.close();
                html.click(function(e, trigger) {
                    dealer_list.find('.list-group-item').removeClass('active');
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
        dealer_list.find('.list-group-item').removeClass('active');
        listItem.addClass('active');
        dealer_list.animate({ scrollTop: dealer_list.scrollTop() + listItem.position().top }, 1100);
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

var car_data = {
    "ASX": {
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
    0: 'РјРµРЅРµРµ 30 РјРµСЃ.',
    30: 'РѕС‚ 30 РґРѕ 36 РјРµСЃ.',
    37: 'РѕС‚ 37 РґРѕ 72 РјРµСЃ.',
    73: 'Р±РѕР»РµРµ 72 РјРµСЃ.'
};

function print_r(arr, level) {
    var print_red_text = "";
    if (!level) level = 0;
    var level_padding = "";
    for (var j = 0; j < level + 1; j++) level_padding += "    ";
    if (typeof(arr) == 'object') {
        for (var item in arr) {
            var value = arr[item];
            if (typeof(value) == 'object') {
                print_red_text += level_padding + "'" + item + "' :\n";
                print_red_text += print_r(value, level + 1);
            } else
                print_red_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
        }
    } else print_red_text = "===>" + arr + "<===(" + typeof(arr) + ")";
    return print_red_text;
}

function age_ru(age) {
    var txt;
    count = age % 100;
    if (count >= 5 && count <= 20) {
        txt = 'Р»РµС‚';
    } else {
        count = count % 10;
        if (count === 1) {
            txt = 'РіРѕРґ';
        } else if (count >= 2 && count <= 4) {
            txt = 'РіРѕРґР°';
        } else {
            txt = 'Р»РµС‚';
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

setTimeout(start, 100);