/*
Функция: Число прописью
(C) Владислав Мирошин, 2024
*/

export function propis(val) {
    
    let ss;
    
    if (val === 0) {
        return 'НОЛЬ'
    } else  if (val < 0) {
        ss = 'МИНУС ';
    } else {
        ss = '';
    }

    let sn = Math.abs(val).toString();

    if (sn.length < 12) {

        sn = sn.padStart(12, '0');

        ss = ss + _spell3(_substr(sn, 1, 3), true);

        if (_substr(sn, 1, 3) !== '000') { 
            ss = ss + _suffix(9, _substr(sn, 2, 2));
        }
        
        ss = ss + _spell3(_substr(sn, 4, 3), true);

        if (_substr(sn, 4, 3) !== '000') { 
            ss = ss + _suffix(6, _substr(sn, 5, 2));
        }
        
        ss = ss + _spell3(_substr(sn, 7, 3), false);
        
        if (_substr(sn, 7, 3) !== '000') {
            ss = ss + _suffix(3, _substr(sn, 8, 2));
        }
        
        ss = ss + _spell3(_substr(sn, 10, 3), true);
    }
    else
    {
        ss = `Слишком большое число: ${sn}`;
    } 

    return ss.trimEnd();
}

function _substr(s, pos, len) {
    return s.substr(pos - 1, len);
}

function _spell3(b, f = false) {
    let s = '';

    if (_substr(b, 2, 1) === '1') {
        switch (_substr(b, 2, 2)) {
            case '10': s = 'ДЕСЯТЬ '; break;
            case '11': s = 'ОДИННАДЦАТЬ '; break;
            case '12': s = 'ДВЕНАДЦАТЬ '; break;
            case '13': s = 'ТРИНАДЦАТЬ '; break;
            case '14': s = 'ЧЕТЫРНАДЦАТЬ '; break;
            case '15': s = 'ПЯТНАДЦАТЬ '; break;
            case '16': s = 'ШЕСТНАДЦАТЬ '; break;
            case '17': s = 'СЕМНАДЦАТЬ '; break;
            case '18': s = 'ВОСЕМНАДЦАТЬ '; break;
            case '19': s = 'ДЕВЯТНАДЦАТЬ '; break;
        }
    } else {
        switch (_substr(b, 3, 1)) {
            case '1': f ? s = 'ОДИН ' : s = 'ОДНА '; break;
            case '2': f ? s = 'ДВА ' : s = 'ДВЕ '; break;
            case '3': s = 'ТРИ '; break;
            case '4': s = 'ЧЕТЫРЕ '; break;
            case '5': s = 'ПЯТЬ '; break;
            case '6': s = 'ШЕСТЬ '; break;
            case '7': s = 'СЕМЬ '; break;
            case '8': s = 'ВОСЕМЬ '; break;
            case '9': s = 'ДЕВЯТЬ '; break;
        }

        switch (_substr(b, 2, 1)) {
            case '2': s = 'ДВАДЦАТЬ ' + s; break;
            case '3': s = 'ТРИДЦАТЬ ' + s; break;
            case '4': s = 'СОРОК ' + s; break;
            case '5': s = 'ПЯТЬДЕСЯТ ' + s; break;
            case '6': s = 'ШЕСТЬДЕСЯТ ' + s; break;
            case '7': s = 'СЕМЬДЕСЯТ ' + s; break;
            case '8': s = 'ВОСЕМЬДЕСЯТ ' + s; break;
            case '9': s = 'ДЕВЯНОСТО ' + s; break;
        }
    }

    switch (_substr(b, 1, 1)) {
        case '1': s = 'СТО ' + s; break;
        case '2': s = 'ДВЕСТИ ' + s; break;
        case '3': s = 'ТРИСТА ' + s; break;
        case '4': s = 'ЧЕТЫРЕСТА ' + s; break;
        case '5': s = 'ПЯТЬСОТ ' + s; break;
        case '6': s = 'ШЕСТЬСОТ ' + s; break;
        case '7': s = 'СЕМЬСОТ ' + s; break;
        case '8': s = 'ВОСЕМЬСОТ ' + s; break;
        case '9': s = 'ДЕВЯТЬСОТ ' + s; break;
    }

    return s;
}

function _suffix(n, s) {

    let w1 = '';
    let w2 = '';
    let w3 = '';
    let ss = '';

    if (s >= '11' && s <= '19') {
        switch (n) {
            case 3: ss = 'ТЫСЯЧ '; break;
            case 6: ss = 'МИЛЛИОНОВ '; break;
            case 9: ss = 'МИЛЛИАРДОВ '; break;
        }
    } else {
        switch (n) {
            case 3: 
                w1 = 'ТЫСЯЧ ';
                w2 = 'ТЫСЯЧА ';
                w3 = 'ТЫСЯЧИ ';
                break;
            case 6: 
                w1 = 'МИЛЛИОНОВ ';
                w2 = 'МИЛЛИОН ';
                w3 = 'МИЛЛИОНА ';
                break;
            case 9: 
                w1 = 'МИЛЛИАРДОВ ';
                w2 = 'МИЛЛИАРД ';
                w3 = 'МИЛЛИАРДА ';
                break;
        }

        switch (_substr(s, s.length, 1)) {
            case '0': ss = w1; break;
            case '1': ss = w2; break;
            case '2': ss = w3; break;
            case '3': ss = w3; break;
            case '4': ss = w3; break;
            case '5': ss = w1; break;
            case '6': ss = w1; break;
            case '7': ss = w1; break;
            case '8': ss = w1; break;
            case '9': ss = w1; break;
        }
    }

    return ss;
}

