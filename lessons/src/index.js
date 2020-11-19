// eslint-disable-next-line strict
"use strict";

import 'nodelist-foreach-polyfill';
import "@babel/polyfill";
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import ourTeam from './modules/ourTeam';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import { form, form2, form3 } from './modules/sendForm';

//Timer
countTimer('25 november 2020');

//Меню
toggleMenu();

//Pop-up
togglePopUp();

//Табы
tabs();

//Слайдер
slider();

//ourTeam
ourTeam();

//Калькулятор
calc(100);

//send-ajax-form
sendForm(form);
sendForm(form2);
sendForm(form3);
