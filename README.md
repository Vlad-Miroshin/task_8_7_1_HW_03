# Задание 8.7.1 (HW-03)

<table>
  <tr>
    <td>
      <img src="./assets/images/js64.png">
    </td>
    <td>
      Учебное задание 8.7.1 (HW-03) Требуется написать игру, в которой компьютер угадывает задуманное пользователем число. 
      <a href="https://skillfactory.ru/">Skillfactory</a><br> 
      Выполнил студент <a href="https://github.com/Vlad-Miroshin">Владислав Мирошин</a> поток PHPPRO_22 
    </td>
  </tr>
</table>

## Использованные технологии

- [HTML](https://www.w3.org/TR/2021/SPSD-html52-20210128/)
- [Google fonts](https://fonts.google.com/specimen/Roboto) Загрузка шрифта Roboto через Google API
- [CSS](https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/CSS_basics) Большинство элементов стилизовано.
- [CSS Variables](https://developer.mozilla.org/ru/docs/Web/CSS/Using_CSS_custom_properties) Переменные CSS.
- [JavaScript](https://262.ecma-international.org)
- Страницы сайта проверены через <a href="https://validator.w3.org/#validate_by_upload" target="_blank">Validator W3C</a> и не имеют ошибок.

## Реализованные требования

- Корректно работают кнопки «Верно!», «Больше», «Меньше» и «Заново».
- Вопросы отображаются не менее чем в трех вариантах (случайный выбор элемента массива)
- Сообщение при успехе не менее чем в трёх вариантах.
- Изменен внешний вид приложения (применены стили).
- При вводе текста, который не может быть интерпретирован как число (NaN) предлагается свой вариант границ диапазона. Отображаются несколько вариантов сообщения.
- При вводе слишком широкого диапазона предлагается свой вариант границ. Отображаются несколько вариантов сообщения.
- Число выводится в текстовой форме. Реализована функция "число-прописью", выполнена в виде модуля.
- Заменены prompt и alert из примера на более «приличные» решения.
- На старте вводить границы диапазона не обязательно, в этом случае будет использован диапазон 0-100.
- Попытался подавить подстановку браузером своих стилей при автозаполнении полей ввода.



## Как открыть/запустить

Можно открыть на [GitHub Pages](https://vlad-miroshin.github.io/task_8_7_1_HW_03/).

Также, проект открывается из-под LiveServer среды разработки.

Внимание: Проект не откроется из файлового менеджера, потому что использованы модули JS. Иначе придётся отказаться от модулей.
