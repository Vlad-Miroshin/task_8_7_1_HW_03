import {propis} from './propis.js';

let current_page_name = 'intro';

const page_intro = document.querySelector('#page_intro');
const page_start = document.querySelector('#page_start');
const page_action = document.querySelector('#page_action');
const page_final = document.querySelector('#page_final');

const input_min_val = document.querySelector('#input_min_val');
const input_max_val = document.querySelector('#input_max_val');

const start_message = document.querySelector('#start_message');

let min_val = 0;
let max_val = 100;

const pages = [
    page_intro,
    page_start,
    page_action,
    page_final
];

const restart_1 = document.querySelector('#restart_1');
const restart_2 = document.querySelector('#restart_2');
const restart_3 = document.querySelector('#restart_3');

[restart_1, restart_2, restart_3].forEach((btn) => {
    btn.addEventListener('click', ()=> {
        restart();
    })
})

document.querySelector('#start_button').addEventListener('click', ()=> {
    start();
});

document.querySelector('#action_button').addEventListener('click', ()=> {
    set_current_page('action');
});

document.querySelector('#action_button').addEventListener('click', ()=> {
    set_current_page('action');
});

document.querySelector('#success_button').addEventListener('click', ()=> {
    set_current_page('final');
});

document.addEventListener('DOMContentLoaded', ()=> {
    show_current_page();
});

function ensureInt(val, def) {
    let v = parseInt(val);
    if (isNaN(v)) {
        v = def;
    }

    return v;
}

function get_page(page_name) {
    switch (page_name) {
        case 'intro': return page_intro;
        case 'start': return page_start;
        case 'action': return page_action;
        case 'final': return page_final;
        default: return page_intro;
    }
}

function show_current_page() {
    hide_all();

    show(get_page(current_page_name));
}

function show(elem) {
    elem.style.display = 'block';
}

function hide(elem) {
    elem.style.display = 'none';
}

function hide_all() {
    pages.forEach((page) => {
        hide(page);
    })
}

function set_current_page(name) {
    current_page_name = name;
    show_current_page();
}

function isIncorrect(val) {
    return isNaN(parseInt(val));
}

function isTooLarge(val1, val2) {
    return Math.abs(val2 - val1) > 10000;
}

function start() {
    const raw_min = input_min_val.value;
    const raw_max = input_max_val.value;

    min_val = ensureInt(raw_min, 0);
    max_val = ensureInt(raw_max, 100);

    let txt_warning = null;

    if (isIncorrect(raw_min) || isIncorrect(raw_max)) {
        txt_warning = `Вы указали некорректный диапазон ("${raw_min}", "${raw_max}"). Могу предложить другой вариант.`;
    } else if (isTooLarge(min_val, max_val)) {
        txt_warning = `Вы указали слишком большой диапазон (${raw_min}, ${raw_max}), этак мы будем играть слишком долго. Предлагаю вариант проще.`;

        min_val = 0;
        max_val = 100;
    }

    const txt_range = `Загадайте число от ${min_val} до ${max_val}, и я обещаю угадать его за минимальное количество попыток.`;

    set_msg_warning(txt_warning);
    set_msg_range(txt_range);

    set_current_page('start');
}

function set_msg_warning(txt) {
    if (txt) {
        start_warning.innerHTML = txt;
        show(start_warning);
    } else {
        hide(start_warning)
    }
}

function set_msg_range(txt) {
    start_message.innerHTML = txt;
}

function restart() {
    set_current_page('intro');

    input_min_val.value = null;
    input_max_val.value = null;
}

