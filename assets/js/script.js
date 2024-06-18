import {propis} from './propis.js';

const ANSWER_INTRO_VARIANT = [
    '', 
    'Сделаю предположение, что', 
    'А если предположить, что', 
    'Продолжаем игру -', 
    'Признавайтесь,',
    'Ну конечно!', 
    'А если вот так:', 
    'Я не сдаюсь:', 
    'Моя ставка -', 
    'Поднажмём!', 
    'Допустим,', 
    'Да это легко,', 
];

const SUCCESS_VARIANT = [
    'Я всегда отгадываю!', 
    'Это было не сложно!', 
    'Метод половинного деления не знает неудач!', 
    'Я-же обещал, что отгадаю ваше число!'
];

const FIRST_ATTEMPT_VARIANT = [
    'С первого раза и в яблочко!', 
    'Это я и называю везением!', 
    'Быстрая победа!'
];
    
const INCORRECT_RANGE_VARIANT = [
    'Могу предложить другой вариант.', 
    'Границы игры должны быть числами.', 
    'Давайте я придумаю диапазон сам.'
];
    
const TOO_LARGE_VARIANT = [
    'Этак мы будем играть слишком долго. Предлагаю вариант проще.', 
    'Предлагаю другой диапазон. Так игра станет динамичнее.', 
    'Разве у вас есть столько свободного времени? Давайте поступим иначе.'
];

const BAD_ANSWER_VARIANT = [
    'Вы меня обманули, это не то число, которое вы загадали.', 
    'Возможно, вы где-то ответили неправильно, поэтому я не смог угадать загаданное число.', 
    'Вздор! Вы давали неверные ответы.', 
];

let current_page_name = 'intro';

const page_intro = document.querySelector('#page_intro');
const page_start = document.querySelector('#page_start');
const page_action = document.querySelector('#page_action');
const page_final = document.querySelector('#page_finish');

const input_min_val = document.querySelector('#input_min_val');
const input_max_val = document.querySelector('#input_max_val');

const start_message = document.querySelector('#start_message');

const answer_intro = document.querySelector('#answer_intro');
const answer_value = document.querySelector('#answer_value');
const answer_text = document.querySelector('#answer_text');
const finish_text = document.querySelector('#finish_text');


let min_val = 0;
let max_val = 100;
let current_val = 0;
let attempt_number = 0;

const pages = [
    page_intro,
    page_start,
    page_action,
    page_final
];

document.addEventListener('DOMContentLoaded', ()=> {
    function onclick(selector, handler) {
        document.querySelector(selector).onclick = handler;
    }

    onclick('#restart_1', () => restart());
    onclick('#restart_2', () => restart());
    onclick('#restart_3', () => restart());
    onclick('#start_button', () => start());
    onclick('#action_button', () => action());
    onclick('#more_button', () => action_more());
    onclick('#less_button', () => action_less());
    onclick('#success_button', () => success());

    show_current_page();
});

function ensureInt(val, def) {
    let v = parseInt(val);
    if (isNaN(v)) {
        v = def;
    }

    return v;
}

function getRandomItem(items) {
    let idx = Math.round(Math.random() * items.length);
    if (idx > items.length - 1)
        idx = items.length - 1;
    
    return items[idx];
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
    return val !== '' && isNaN(parseInt(val));
}

function isTooLarge(val1, val2) {
    return Math.abs(val2 - val1) > 999 * 2;
}

function start() {
    const raw_min = input_min_val.value;
    const raw_max = input_max_val.value;

    min_val = ensureInt(raw_min, 0);
    max_val = ensureInt(raw_max, 100);

    if (min_val > max_val) {
        const tmp = min_val;
        min_val = max_val;
        max_val = tmp;
    }

    let txt_warning = null;

    if (isIncorrect(raw_min) || isIncorrect(raw_max)) {
        txt_warning = `Вы указали некорректный диапазон ("${raw_min}", "${raw_max}").` + getRandomItem(INCORRECT_RANGE_VARIANT);
    } else if (isTooLarge(min_val, max_val)) {
        txt_warning = `Вы указали слишком большой диапазон (${raw_min}, ${raw_max}).` + getRandomItem(TOO_LARGE_VARIANT);

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
        start_warning.innerText = txt;
        show(start_warning);
    } else {
        hide(start_warning)
    }
}

function set_msg_range(txt) {
    start_message.innerText = txt;
}

function restart() {
    set_current_page('intro');

    input_min_val.value = null;
    input_max_val.value = null;
    attempt_number = 0;
}

function get_current_val() {
    return Math.floor((min_val + max_val) / 2);
}

function action() {
    set_current_page('action');

    update_action_view();
}

function action_more() {
    change_current_value('more');
}

function action_less() {
    change_current_value('less');
}

function change_current_value(direction) {
    if (min_val === max_val) {
        finish(getRandomItem(BAD_ANSWER_VARIANT));
    } else {
        if (direction === 'more') {
            min_val = current_val + 1;

            if (min_val > max_val)
                max_val = max_val;

        } else {
            max_val = current_val - 1;

            if (max_val < min_val)
                max_val = min_val;
        }

        update_action_view();
    }
}

function update_action_view() {
    current_val = get_current_val();
    attempt_number++;

    answer_intro.innerText = getRandomItem(ANSWER_INTRO_VARIANT);
    answer_value.innerText = current_val.toString();
    answer_text.innerText = propis(current_val);
}

function success() {
    let text = '';
    if (attempt_number === 1) {
        text = getRandomItem(FIRST_ATTEMPT_VARIANT)
    } else {
        text = getRandomItem(SUCCESS_VARIANT)
    }

    finish(text);
}

function finish(text) {
    finish_text.innerText = text;
    set_current_page('final');
}


