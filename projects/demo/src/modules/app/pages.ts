import {TuiDocPages} from '@taiga-ui/addon-doc';

export const pages: TuiDocPages = [
    {
        section: $localize`Documentation`,
        title: $localize`Getting started`,
        keywords: 'intro, how to, guide, main, главная, начало, инструкция',
        route: 'getting-started',
    },
    {
        section: $localize`Documentation`,
        title: $localize`Browser support`,
        keywords: 'chrome, safari, ie, edge, firefox',
        route: 'browser-support',
    },
    {
        section: $localize`Documentation`,
        title: $localize`Changelog`,
        keywords: 'release, change, changelog, archive, history',
        route: 'changelog',
    },
    {
        section: $localize`Documentation`,
        title: $localize`Documentation engine`,
        keywords:
            'doc, book, samples, demo, документация, демо, портал, story, боковая, панель, навигация, примеры',
        route: 'tui-doc',
    },
    {
        section: $localize`Documentation`,
        title: $localize`Friendly libraries`,
        keywords: 'related, libraries, other, friendly, npm, packages',
        route: 'related',
    },
    {
        section: $localize`Common`,
        title: $localize`Typography`,
        keywords:
            'layout, text, верстка, markup, font, текст, шрифты, гельветика, sans, typography',
        route: '/typography',
    },
    {
        section: $localize`Common`,
        title: $localize`Colors`,
        keywords: 'layout, верстка, palette, markup, цвет, палитра',
        route: '/colors',
    },
    {
        section: $localize`Common`,
        title: $localize`Grid`,
        keywords: 'верстка, markup, layout, grid, сетка, стили',
        route: '/grid',
    },
    {
        section: $localize`Common`,
        title: $localize`Icons`,
        keywords: 'img, layout, markup, icons, image, картинка, свг, svg, графика',
        route: '/icons',
    },
    {
        section: $localize`Common`,
        title: $localize`Styles`,
        subPages: [
            {
                section: $localize`Common`,
                title: $localize`Shadows`,
                keywords: 'layout, markup, тень, shadows',
                route: '/shadows',
            },
            {
                section: $localize`Common`,
                title: $localize`Lists`,
                keywords:
                    'layout, markup, списки, стили, список, точки, list, ol, ul, li, немаркированный, маркированный',
                route: '/lists',
            },
            {
                section: $localize`Common`,
                title: $localize`Spaces`,
                keywords:
                    'layout, markup, отступы, margin, padding, маржин, падинг, spaces',
                route: '/spaces',
            },
            {
                section: $localize`Common`,
                title: $localize`Tables`,
                keywords: 'верстка, markup, таблицы, tables',
                route: '/tables',
            },
            {
                section: $localize`Common`,
                title: $localize`Skeleton`,
                keywords: 'верстка, markup, скелетон, loader, загрузка, skeleton',
                route: '/skeleton',
            },
            {
                section: $localize`Common`,
                title: $localize`Form`,
                keywords: 'верстка, markup, форма, ввод, пример, input, form',
                route: '/form',
            },
            {
                section: $localize`Common`,
                title: $localize`Mobile`,
                keywords: 'верстка, pwa, мобильные, нативные',
                route: '/mobile-themes',
            },
        ],
    },
    {
        section: $localize`Customization`,
        title: `i18n`,
        keywords: 'i18n, internationalization, local, translate, language',
        route: 'i18n',
    },
    {
        section: $localize`Customization`,
        title: `Variables`,
        keywords: 'colors, css, vars, custom, properties, style',
        route: 'variables',
    },
    {
        section: $localize`Customization`,
        title: `Wrapper`,
        keywords: 'colors, css, theme, custom, style',
        route: 'wrapper',
    },
    {
        section: $localize`Customization`,
        title: `Dialogs`,
        keywords: 'dialog, modal, popup, theme, custom, style',
        route: 'dialogs',
    },
    {
        section: $localize`Customization`,
        title: `Icon set`,
        keywords: 'icons, svg, theme, custom, style, sanitizer',
        route: 'icon-set',
    },
    {
        section: $localize`Components`,
        title: 'Accordion',
        keywords: 'open, аккордеон, expand, раскрывашка, spoiler, cut',
        route: '/components/accordion',
    },
    {
        section: $localize`Components`,
        title: 'Action',
        keywords: 'кнопка, button, ссылка, link, действие, icon, иконка',
        route: '/components/action',
    },
    {
        section: $localize`Components`,
        title: 'Avatar',
        keywords: 'аватар, image, pic, картинка, изображение, avatar',
        route: '/components/avatar',
    },
    {
        section: $localize`Components`,
        title: 'Badges',
        subPages: [
            {
                section: $localize`Components`,
                title: 'Badge',
                keywords: 'бэдж, овал, badge',
                route: '/components/badge',
            },
            {
                section: $localize`Components`,
                title: 'BadgedContent',
                keywords: 'бэдж, овал, badge, нотификация',
                route: '/components/badged-content',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Button',
        keywords: 'кнопка, button, icon-button, иконка',
        route: '/components/button',
    },
    {
        section: $localize`Components`,
        title: 'Calendars',
        subPages: [
            {
                section: $localize`Components`,
                title: 'Calendar',
                keywords:
                    'календарь, форма, день, неделя, месяц, год, дата, calendar, датапикер, datepicker' +
                    'date, day, week, month, year',
                route: '/components/calendar',
            },
            {
                section: $localize`Components`,
                title: 'CalendarRange',
                keywords: 'календарь, calendar, даты, период, day, week, month, year',
                route: '/components/calendar-range',
            },
            {
                section: $localize`Components`,
                title: 'CalendarMonth',
                keywords:
                    'поле, инпут, форма, ввод, input, month, месяц, год, дата, day, week, month, year',
                route: '/components/calendar-month',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Card',
        keywords:
            'карта, карточка, card, visa, mastercard, credit, icon, logo, дебетовая, кредитная, иконка, логотип',
        route: '/components/card',
    },
    {
        section: $localize`Components`,
        title: 'Charts',
        subPages: [
            {
                section: $localize`Components`,
                title: 'Axes',
                keywords:
                    'график, чарт, chart, graph, line, столбик, диаграмма, оси, координаты',
                route: '/components/axes',
            },
            {
                section: $localize`Components`,
                title: 'Bar',
                keywords: 'график, чарт, chart, graph, line, столбик, диаграмма',
                route: '/components/bar',
            },
            {
                section: $localize`Components`,
                title: 'BarChart',
                keywords: 'график, чарт, chart, graph, line, столбик, диаграмма',
                route: '/components/bar-chart',
            },
            {
                section: $localize`Components`,
                title: 'BarSet',
                keywords: 'график, чарт, chart, graph, line, столбик, диаграмма',
                route: '/components/bar-set',
            },
            {
                section: $localize`Components`,
                title: 'LegendItem',
                keywords: 'график, легенда, подпись, диаграмма',
                route: '/components/legend-item',
            },
            {
                section: $localize`Components`,
                title: 'LineChart',
                keywords: 'график, линия, кривая, диаграмма',
                route: '/components/line-chart',
            },
            {
                section: $localize`Components`,
                title: 'LineDaysChart',
                keywords: 'график, линия, кривая, диаграмма, год, месяц',
                route: '/components/line-days-chart',
            },
            {
                section: $localize`Components`,
                title: 'PieChart',
                keywords: 'график, чарт, chart, graph, пирог, круг, диаграмма',
                route: '/components/pie-chart',
            },
            {
                section: $localize`Components`,
                title: 'RingChart',
                keywords: 'график, чарт, chart, graph, кольцо, круг, диаграмма',
                route: '/components/ring-chart',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Checkboxes',
        subPages: [
            {
                section: $localize`Components`,
                title: 'Checkbox',
                keywords: 'чек, ввод, форма, form, checkbox',
                route: '/components/checkbox',
            },
            {
                section: $localize`Components`,
                title: 'CheckboxBlock',
                keywords: 'кнопка, чек, форма, form, ввод, checkbox, CheckboxBlock',
                route: '/components/checkbox-block',
            },
            {
                section: $localize`Components`,
                title: 'CheckboxLabeled',
                keywords: 'label, чек, форма, form, ввод, checkbox, checkboxLabeled',
                route: '/components/checkbox-labeled',
            },
            {
                section: $localize`Components`,
                title: 'PrimitiveCheckbox',
                keywords: 'чек, checkbox, box, внутренние',
                route: '/components/primitive-checkbox',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'ColorPicker',
        keywords: 'цвет, выбор, градиент, gradient, палитра, input, inputcolor',
        route: '/components/color-picker',
    },
    {
        section: $localize`Components`,
        title: 'Dropdown',
        subPages: [
            {
                section: $localize`Components`,
                title: 'DataList',
                keywords:
                    'контекст, выпадашка, дропдаун, меню, Context, ContextMenu, option,' +
                    'optGroup, опции, tuiOption, варианты, dropdown, menu',
                route: '/components/data-list',
            },
            {
                section: $localize`Components`,
                title: 'HostedDropdown',
                keywords: 'dropdown, hover, контекст, выпадашка, дропдаун, меню, menu',
                route: '/components/hosted-dropdown',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Errors',
        subPages: [
            {
                section: $localize`Components`,
                title: 'Error',
                keywords: 'error, ошибка',
                route: '/components/error',
            },
            {
                section: $localize`Components`,
                title: 'FieldError',
                keywords: 'field, поле, форма, error, ошибка, field-error',
                route: '/components/field-error',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Expand',
        keywords: 'аккордеон, expand, раскрывашка, spoiler, cut',
        route: '/components/expand',
    },
    {
        section: $localize`Components`,
        title: 'Filter',
        keywords: 'фильтр, filters',
        route: '/components/filter',
    },
    {
        section: $localize`Components`,
        title: 'Group',
        keywords: 'buttongroup, форма, поле, кнопка, группировка, группа, Group',
        route: '/components/group',
    },
    {
        section: $localize`Components`,
        title: 'MarkerIcon',
        keywords: 'icon, картинка, свг, иконка, svg, графика',
        route: '/components/marker-icon',
    },
    {
        section: $localize`Components`,
        title: 'Inputs',
        subPages: [
            {
                section: $localize`Components`,
                title: 'InputInline',
                keywords: 'input',
                route: '/components/input-inline',
            },
            {
                section: $localize`Components`,
                title: 'Input',
                keywords: 'поле, инпут, форма, ввод, input, table, таблица',
                route: '/components/input',
            },
            {
                section: $localize`Components`,
                title: 'InputDate',
                keywords:
                    'поле, инпут, форма, ввод, input, календарь, день, ' +
                    'неделя, месяц, год, дата, calendar',
                route: '/components/input-date',
            },
            {
                section: $localize`Components`,
                title: 'InputCard',
                keywords:
                    'карта, visa, mastercard, credit, card, срок, expire, код, cvc, cvv',
                route: '/components/input-card',
            },
            {
                section: $localize`Components`,
                title: 'InputCardGrouped',
                keywords:
                    'карта, visa, mastercard, credit, card, срок, expire, код, cvc, cvv',
                route: '/components/input-card-grouped',
            },
            {
                section: $localize`Components`,
                title: 'InputCopy',
                keywords: 'поле, инпут, форма, копия, скопировать, ввод, input, copy',
                route: '/components/input-copy',
            },
            {
                section: $localize`Components`,
                title: 'InputCount',
                keywords: 'селект, форма, числа, ввод, input, select, count',
                route: '/components/input-count',
            },
            {
                section: $localize`Components`,
                title: 'InputDateTime',
                keywords:
                    'поле, инпут, форма, ввод, input, календарь, день, ' +
                    'неделя, месяц, год, дата, calendar, время, часы, минуты, секунды, мс',
                route: '/components/input-date-time',
            },
            {
                section: $localize`Components`,
                title: 'InputFile',
                keywords:
                    'селект, форма, файл, загрузка, ввод, input, file, attach, load',
                route: '/components/input-file',
            },
            {
                section: $localize`Components`,
                title: 'InputMonth',
                keywords: 'поле, инпут, форма, ввод, input, month, месяц, год, дата',
                route: '/components/input-month',
            },
            {
                section: $localize`Components`,
                title: 'InputMonthRange',
                keywords: 'поле, инпут, форма, ввод, input, month, месяц, год, дата',
                route: '/components/input-month-range',
            },
            {
                section: $localize`Components`,
                title: 'InputNumber',
                keywords:
                    'поле, инпут, number, число, форма, ввод, input, money, деньги, ' +
                    'cash, копейки, рубли, доллары, евро, control, контрол',
                route: '/components/input-number',
            },
            {
                section: $localize`Components`,
                title: 'InputPassword',
                keywords: 'поле, инпут, форма, ввод, input, password, пароль, код, шифр',
                route: '/components/input-password',
            },
            {
                section: $localize`Components`,
                title: 'InputPhone',
                keywords: 'поле, инпут, форма, ввод, input, phone, телефон, номера',
                route: '/components/input-phone',
            },
            {
                section: $localize`Components`,
                title: 'InputRange',
                keywords: 'поле, инпут, форма, ввод, input, range, slider, диапазон',
                route: '/components/input-range',
            },
            {
                section: $localize`Components`,
                title: 'InputDateRange',
                keywords: 'calendar, календарь, даты, период',
                route: '/components/input-date-range',
            },
            {
                section: $localize`Components`,
                title: 'InputSlider',
                keywords: 'поле, инпут, форма, ввод, input, range, slider, диапазон',
                route: '/components/input-slider',
            },
            {
                section: $localize`Components`,
                title: 'InputTag',
                keywords: 'поле, инпут, форма, ввод, input, tag, тэг',
                route: '/components/input-tag',
            },
            {
                section: $localize`Components`,
                title: 'InputTime',
                keywords:
                    'поле, инпут, форма, ввод, input, time, hour, minute, время, час, минута',
                route: '/components/input-time',
            },
            {
                section: $localize`Components`,
                title: 'InputPhoneInternational',
                keywords:
                    'поле, инпут, форма, ввод, input, phone, телефон, страны, номера,',
                route: '/components/input-phone-international',
            },
            {
                section: $localize`Components`,
                title: 'PrimitiveTextfield',
                keywords: 'текст, инпут, база, input',
                route: '/components/primitive-textfield',
            },
            {
                section: $localize`Components`,
                title: 'TextArea',
                keywords: 'поле, инпут, форма, ввод, text-area, area',
                route: '/components/text-area',
            },
            {
                section: $localize`Components`,
                title: 'Editor',
                keywords:
                    'wysiwyg, редактор, текст, html, rich, text, input, инпут, ввод',
                route: '/components/editor',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Island',
        keywords: 'Island, остров, плашка',
        route: '/components/island',
    },
    {
        section: $localize`Components`,
        title: 'Label',
        keywords: 'лэйбл, метка, форма, label',
        route: '/components/label',
    },
    {
        section: $localize`Components`,
        title: 'LineClamp',
        keywords: 'обрезание, текст, ticker, тикер, overflow',
        route: '/components/line-clamp',
    },
    {
        section: $localize`Components`,
        title: 'Link',
        keywords: 'href, anchor, ссылка, псевдо, pseudo, link',
        route: '/components/link',
    },
    {
        section: $localize`Components`,
        title: 'Loader',
        keywords:
            'загрузка, крутилка, лоадер, спиннер, спинер, крутится, мутится, spinner, loader',
        route: '/components/loader',
    },
    {
        section: $localize`Components`,
        title: 'Money',
        keywords: 'money, деньги, cash, копейки, рубли, доллары, евро',
        route: '/components/money',
    },
    {
        section: $localize`Components`,
        title: 'Notification',
        keywords: 'уведомление, нотификация, бабл, облачко, alert, notification',
        route: '/components/notification',
    },
    {
        section: $localize`Components`,
        title: 'Mobile',
        subPages: [
            {
                section: $localize`Components`,
                title: 'MobileDialog',
                keywords:
                    'мобильный, ios, android, alert, сообщение, dialog, modal, popup, попап, диалог',
                route: '/components/mobile-dialog',
            },
            {
                section: $localize`Components`,
                title: 'MobileCalendar',
                keywords:
                    'календарь, день, неделя, месяц, год, дата, calendar, datapicker, data, picker',
                route: '/components/mobile-calendar',
            },
            {
                section: $localize`Components`,
                title: 'PullToRefresh',
                keywords:
                    'mobile, потянуть, обновление, лоадер, loader, крутилка, загрузка',
                route: '/components/pull-to-refresh',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Radio',
        subPages: [
            {
                section: $localize`Components`,
                title: 'Radio',
                keywords: 'инпут, форма, ввод, radio, радио',
                route: '/components/radio',
            },
            {
                section: $localize`Components`,
                title: 'RadioBlock',
                keywords: 'инпут, кнопка, форма, ввод, radio, радио, radio-boxed',
                route: '/components/radio-block',
            },
            {
                section: $localize`Components`,
                title: 'RadioLabeled',
                keywords: 'инпут, форма, ввод, radio, радио, label, лэйбл',
                route: '/components/radio-labeled',
            },
            {
                section: $localize`Components`,
                title: 'RadioList',
                keywords: 'инпут, форма, ввод, radio, радио, список, list',
                route: '/components/radio-list',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Selects',
        subPages: [
            {
                section: $localize`Components`,
                title: 'ComboBox',
                keywords:
                    'инпут, форма, ввод, select, селект, выбор, комбобокс, combobox',
                route: '/components/combo-box',
            },
            {
                section: $localize`Components`,
                title: 'MultiSelect',
                keywords:
                    'инпут, форма, ввод, select, селект, выбор, multiselect, мультиселект',
                route: '/components/multi-select',
            },
            {
                section: $localize`Components`,
                title: 'Select',
                keywords: 'инпут, форма, ввод, select, селект, выбор',
                route: '/components/select',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Scrollbar',
        keywords: 'scroll, scrollbar, скролл, скроллбар',
        route: '/components/scrollbar',
    },
    {
        section: $localize`Components`,
        title: 'Sliders',
        subPages: [
            {
                section: $localize`Components`,
                title: 'InputRange',
                keywords: 'поле, инпут, форма, ввод, input, range, slider, диапазон',
                route: '/components/input-range',
            },
            {
                section: $localize`Components`,
                title: 'InputSlider',
                keywords: 'поле, инпут, форма, ввод, input, range, slider, диапазон',
                route: '/components/input-slider',
            },
            {
                section: $localize`Components`,
                title: 'Slider',
                keywords: 'инпут, числа, форма, ввод, slider, слайдер, range, диапазон',
                route: '/components/slider',
            },
            {
                section: $localize`Components`,
                title: 'Range',
                keywords: 'инпут, числа, форма, ввод, slider, слайдер, range, диапазон',
                route: '/components/range',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Svg',
        keywords: 'icon, картинка, свг, иконка, svg, графика',
        route: '/components/svg',
    },
    {
        section: $localize`Components`,
        title: 'Table',
        subPages: [
            {
                section: $localize`Components`,
                title: 'Reorder',
                keywords: 'таблица, столбцы, порядок, order, выбор',
                route: '/components/reorder',
            },
            {
                section: $localize`Components`,
                title: 'ResizableColumn',
                keywords: 'таблица, столбцы, размер, table, size, column',
                route: '/components/resizable-column',
            },
            {
                section: $localize`Components`,
                title: 'TablePagination',
                keywords: 'таблица, страницы, pagination, page',
                route: '/components/table-pagination',
            },
            {
                section: $localize`Components`,
                title: 'Table',
                keywords: 'таблица, data, cell, tr, th, td, row, col, grid',
                route: '/components/table',
            },
        ],
    },
    {
        section: $localize`Components`,
        title: 'Tag',
        keywords: 'tag, тэг',
        route: '/components/tag',
    },
    {
        section: $localize`Components`,
        title: 'ThemeNight',
        keywords: 'theme, dark, night, тема, тэг',
        route: '/components/theme-night',
    },
    {
        section: $localize`Components`,
        title: 'ThemeSwitcher',
        keywords: 'тема, blue, цвета, стили, кастомизация, синий, синяя',
        route: '/components/theme-switcher',
    },
    {
        section: $localize`Components`,
        title: 'Toggle',
        keywords: 'инпут, форма, ввод, toggle, переключение',
        route: '/components/toggle',
    },
    {
        section: $localize`Components`,
        title: 'Tooltip',
        keywords: 'tooltip, тултип, hint, подсказка, помощь, help',
        route: '/components/tooltip',
    },
    {
        section: $localize`Components`,
        title: 'Toolbar',
        keywords: 'editor, редактор, текст, html, rich, text, input, инпут, ввод',
        route: '/components/toolbar',
    },
    {
        section: $localize`Navigation`,
        title: 'Breadcrumbs',
        keywords: 'шаги, навигация, nav, хлебные, крошки, breadcrumbs',
        route: '/navigation/breadcrumbs',
    },
    {
        section: $localize`Navigation`,
        title: 'Pagination',
        keywords:
            'пагинатор, страницы, пэйджы, навигация, navigation, paginator, pagination',
        route: '/navigation/pagination',
    },
    {
        section: $localize`Navigation`,
        title: 'Stepper',
        keywords: 'stepper, step, группа, group, шаг, check',
        route: '/navigation/stepper',
    },
    {
        section: $localize`Navigation`,
        title: 'Tabs',
        keywords: 'mobile, ios, android, шаги, таб, tab, tabs',
        route: '/navigation/tabs',
    },
    {
        section: $localize`Tools`,
        title: $localize`Decorators`,
        subPages: [
            {
                section: $localize`Tools`,
                title: 'DefaultProp',
                keywords:
                    'декоратор, decorator, guard, undefined, type, check, contact, assert, контракт',
                route: '/decorators/default-prop',
            },
            {
                section: $localize`Tools`,
                title: 'Pure',
                keywords:
                    'декоратор, decorator, lazy, calculation, optimization, pipe, memoization',
                route: '/decorators/pure',
            },
            {
                section: $localize`Tools`,
                title: 'RequiredSetter',
                keywords:
                    'декоратор, decorator, guard, undefined, type, check, contact, assert, контракт',
                route: '/decorators/required-setter',
            },
        ],
    },
    {
        section: $localize`Tools`,
        title: $localize`Directives`,
        subPages: [
            {
                section: $localize`Tools`,
                title: 'ActiveZone',
                keywords: 'focus, blur, фокус, activeElement',
                route: '/directives/active-zone',
            },
            {
                section: $localize`Tools`,
                title: 'AutoFocus',
                keywords: 'focus, blur, фокус, авто',
                route: '/directives/auto-focus',
            },
            {
                section: $localize`Tools`,
                title: 'DescribedBy',
                keywords: '',
                route: '/directives/described-by',
            },
            {
                section: $localize`Tools`,
                title: 'Dropdown',
                keywords: 'dropdown, контекст, выпадашка, дропдаун, Context',
                route: '/directives/dropdown',
            },
            {
                section: $localize`Tools`,
                title: 'DropdownContext',
                keywords: 'dropdown, контекст, выпадашка, дропдаун, Context, right-click',
                route: '/directives/dropdown-context',
            },
            {
                section: $localize`Tools`,
                title: 'DropdownSelection',
                keywords:
                    'dropdown, контекст, selection, выделение, выпадашка, дропдаун, Context',
                route: '/directives/dropdown-selection',
            },
            {
                section: $localize`Tools`,
                title: 'ElasticSticky',
                keywords:
                    'масштаб, sticky, заголовок, шапка, mobile, смартфон, pwa, native, hybrid',
                route: '/directives/elastic-sticky',
            },
            {
                section: $localize`Tools`,
                title: 'Element',
                keywords: 'element, elementref, nativeelement, tag',
                route: 'directives/element',
            },
            {
                section: $localize`Tools`,
                title: 'Highlight',
                keywords: 'поиск, подсветка, search, find, найти',
                route: '/directives/highlight',
            },
            {
                section: $localize`Tools`,
                title: 'Hint',
                keywords: 'tooltip, тултип, hint, подсказка, помощь, help, хинт',
                route: '/directives/hint',
            },
            {
                section: $localize`Tools`,
                title: 'LazyLoading',
                keywords: 'img, skeleton, скелетон, загрузка, картинки',
                route: '/directives/lazy-loading',
            },
            {
                section: $localize`Tools`,
                title: 'ManualHint',
                keywords:
                    'tooltip, тултип, hint, подсказка, помощь, help, manual, программный, хинт',
                route: '/directives/manual-hint',
            },
            {
                section: $localize`Tools`,
                title: 'Overscroll',
                keywords: 'overscroll, scroll, скролл',
                route: '/directives/overscroll',
            },
            {
                section: $localize`Tools`,
                title: 'PointerHint',
                keywords: 'tooltip, тултип, hint, подсказка, помощь, help, хинт, курсор',
                route: '/directives/pointer-hint',
            },
            {
                section: $localize`Tools`,
                title: 'Let',
                keywords:
                    'let, переменная, шаблон, геттер, getter, pipe, пайп, async, подписка',
                route: '/directives/let',
            },
            {
                section: $localize`Tools`,
                title: 'Media',
                keywords: 'player, video, audio, mp3, wav, html5, mp4, hd, 4k, dpi',
                route: '/directives/media',
            },
            {
                section: $localize`Tools`,
                title: 'Mode',
                keywords: 'фон, вид, цвет',
                route: '/directives/mode',
            },
            {
                section: $localize`Tools`,
                title: 'Present',
                keywords: 'DOM, директива, появление, наличие, присутствие',
                route: '/directives/present',
            },
            {
                section: $localize`Tools`,
                title: 'Ripple',
                keywords: 'touch, mobile, смартфон, pwa, native, hybrid, android',
                route: '/directives/ripple',
            },
            {
                section: $localize`Tools`,
                title: 'Sidebar',
                keywords:
                    'sidebar, hamburger, drawer menu, mobile, смартфон, pwa, native, hybrid, сайдбар, меню',
                route: '/directives/sidebar',
            },
            {
                section: $localize`Tools`,
                title: 'DropdownController',
                keywords:
                    'контроллер, ввод, параметры, настройка, выпадашка, список, айтемы, items',
                route: '/directives/dropdown-controller',
            },
            {
                section: $localize`Tools`,
                title: 'HintController',
                keywords:
                    'контроллер, ввод, параметры, настройка, hint, tooltip, подсказка',
                route: '/directives/hint-controller',
            },
            {
                section: $localize`Tools`,
                title: 'TextfieldController',
                keywords:
                    'контроллер, ввод, параметры, настройка, cleaner, autocomplete, exampleText, inputMode, ' +
                    'inputMode, labelOutside, size, type, нативные, инпут',
                route: '/directives/textfield-controller',
            },
            {
                section: $localize`Tools`,
                title: 'Touchable',
                keywords: 'touch, mobile, смартфон, pwa, native, hybrid, ios',
                route: '/directives/touchable',
            },
            {
                section: $localize`Tools`,
                title: 'Validator',
                keywords: 'form, форма, валидация',
                route: '/directives/validator',
            },
        ],
    },
    {
        section: $localize`Tools`,
        title: $localize`Pipes`,
        subPages: [
            {
                section: $localize`Tools`,
                title: 'Currency',
                keywords: 'cyrrency, валюты, деньги, пайп, pipe',
                route: '/pipes/currency',
            },
            {
                section: $localize`Tools`,
                title: 'Filter',
                keywords: 'filter, совпадения, ngfor, for, match, пайп, pipe',
                route: '/pipes/filter',
            },
            {
                section: $localize`Tools`,
                title: 'FilterByInput',
                keywords:
                    'filter, совпадения, ngfor, for, match, пайп, pipe, input, combobox',
                route: '/pipes/filter-by-input',
            },
            {
                section: $localize`Tools`,
                title: 'FormatNumber',
                keywords:
                    'format, форматирование, преобразование, пробелы, тысячи, пайп, pipe',
                route: '/pipes/format-number',
            },
            {
                section: $localize`Tools`,
                title: 'FormatPhone',
                keywords:
                    'format, форматирование, преобразование, phone, телефон, пайп, pipe',
                route: '/pipes/format-phone',
            },
            {
                section: $localize`Tools`,
                title: 'Mapper',
                keywords: 'mapper, мап, преобразование, пайп, pipe',
                route: '/pipes/mapper',
            },
        ],
    },
    {
        section: $localize`Tools`,
        title: $localize`Services`,
        subPages: [
            {
                section: $localize`Tools`,
                title: 'NotificationsService',
                keywords: 'уведомление, нотификация, бабл, облачко, alert, notification',
                route: '/services/notifications-service',
            },
            {
                section: $localize`Tools`,
                title: 'DialogService',
                keywords: 'попап, модал, popup, dialog, диалог, modal, окно',
                route: '/services/dialog-service',
            },
            {
                section: $localize`Tools`,
                title: 'DestroyService',
                keywords: 'сервис',
                route: '/services/destroy-service',
            },
            {
                section: $localize`Tools`,
                title: 'ScrollService',
                keywords: 'scroll, прокрутка, скролл',
                route: '/services/scroll-service',
            },
            {
                section: $localize`Tools`,
                title: 'SvgService',
                keywords: 'svg, иконки, картинка, свг, иконка, графика',
                route: '/services/svg-service',
            },
            {
                section: $localize`Tools`,
                title: 'TableBarsService',
                keywords:
                    'молекула, уведомление, нотификация, бабл, облачко, alert, table, bar',
                route: '/services/table-bars-service',
            },
        ],
    },
    {
        section: $localize`Tools`,
        title: $localize`Utils`,
        subPages: [
            {
                section: $localize`Tools`,
                title: $localize`Math`,
                keywords: `Инструменты, утилиты, математические, utils, utilits, math,
                           round, clamp, inRange, normalizeToIntNumber, quantize`,
                route: '/utils/math',
            },
            {
                section: $localize`Tools`,
                title: $localize`Format`,
                keywords: `Инструменты, утилиты, форматирующие, format, px, padStart, getCurrencySymbol, capitalize,
                           formatPhone`,
                route: '/utils/format',
            },
            {
                section: $localize`Tools`,
                title: 'DOM',
                keywords: `Инструменты, утилиты, DOM, checkFixedPosition, customEvent, getActualTarget,
                           getDocumentOrShadowRoot, getScrollParent, isElementAtPoint, isElementObscured, ДОМ,
                           getClipboardDataText`,
                route: '/utils/dom',
            },
            {
                section: $localize`Tools`,
                title: $localize`Browser`,
                keywords: `Инструменты, утилиты, browser, браузер, firefox, ie, edge, ios, chrome`,
                route: '/utils/browser',
            },
            {
                section: $localize`Tools`,
                title: $localize`Miscellaneous`,
                keywords: `Инструменты, утилиты, miscellaneous, прочие, assert, isNil, isPresent, flatLength,
                           getPaymentSystem, syncObject`,
                route: '/utils/miscellaneous',
            },
            {
                section: $localize`Tools`,
                title: $localize`Tokens`,
                keywords: `токены tokens`,
                route: '/utils/tokens',
            },
        ],
    },
];
