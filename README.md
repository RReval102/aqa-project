# TypeScript + Playwright: senior-level архитектура автотестов

Проект представляет собой набор end-to-end тестов для сайта https://automationexercise.com на базе Playwright Test и TypeScript. Архитектура построена так, чтобы обеспечить повторяемость, читаемость и устойчивость сценариев при изменении UI и API контракта.

Цели архитектуры:

- разделение ответственности между тестами, страницами и служебными слоями
- отсутствие хардкода селекторов в сценариях
- единый механизм работы с данными пользователя и очисткой после теста
- валидация API через schema-based проверку
- возможность быстрого масштабирования проекта на новые сценарии

Основные принципы:

- Page Object Model для UI сценариев
- Zod для валидации JSON-ответов API
- кастомные Playwright fixtures для генерации и очистки тестовых данных
- явное разделение бизнес-сценариев и низкоуровневой логики взаимодействия с DOM
- отсутствие статических sleep и неустойчивых ожиданий

Структура проекта:

```text
.
├── src/
│   ├── fixtures/
│   │   └── test.ts                  # кастомный fixture с testUser
│   ├── pages/
│   │   ├── base-page.ts             # базовый класс для page objects
│   │   ├── products-page.ts         # сценарии и методы страницы Products
│   │   ├── cart-page.ts             # работа с корзиной
│   │   └── login-page.ts            # логин-логика и проверки авторизации
│   └── schemas/
│       └── products.schema.ts       # Zod-схема для /api/productsList
├── tests/
│   ├── api/
│   │   └── products.spec.ts         # API проверка списка товаров
│   └── ui/
│       ├── product-search.spec.ts   # поиск товара
│       ├── cart.spec.ts             # добавление в корзину и проверка данных
│       └── user-auth.spec.ts        # создание, логин и cleanup пользователя
├── playwright.config.ts             # конфигурация Playwright и baseUrl
├── package.json                     # скрипты и зависимости
├── tsconfig.json                    # TypeScript config
├── README.md                        # документация проекта
├── .gitignore                       # исключения репозитория
├── playwright-report/               # HTML-отчёт после прогонов
├── test-results/                    # скриншоты, видео и trace при падениях
└── package-lock.json                # lockfile
```

Технологический стек:

- TypeScript
- Playwright Test
- Zod
- Node.js
- HTML report from Playwright

Подход к UI:

UI-логика вынесена в Page Object classes, а сами тесты описывают сценарий на уровне бизнеса. Это позволяет:

- не смешивать селекторы и сценарии в одном месте
- быстро менять локаторы без правки каждого теста
- сохранять высокую читабельность сценариев
- лучше покрывать поведение пользователя, а не низкоуровневую DOM-структуру

Подход к API:

API-ответы валидируются через Zod-схемы. Это даёт:

- строгую проверку структуры JSON
- защиту от регрессий по контракту данных
- более читаемую и расширяемую модель проверок

Подход к данным:

Для user-flow сценариев используется генерация уникального пользователя с последующей очисткой через API. Это обеспечивает изоляцию тестов и исключает влияние одного прогона на другой.

Требования:

- Node.js 18+
- npm

Установка зависимостей:

```powershell
npm install
```

Установка браузеров Playwright:

```powershell
npm run install:browsers
```

Или при необходимости напрямую:

```powershell
& "C:\Program Files\nodejs\node.exe" .\node_modules\playwright\cli.js install --with-deps chromium
```

Запуск тестов:

Из корня проекта:

```powershell
cd "C:\Users\skoda\.copilot\chats\97878950-9931-4128-88a0-3595b65760eb"
```

Запуск всех тестов:

```powershell
npx playwright test
```

Запуск только UI тестов:

```powershell
npx playwright test .\tests\ui --headed
```

Запуск только API тестов:

```powershell
npx playwright test .\tests\api
```

Запуск отдельного файла:

```powershell
npx playwright test .\tests\ui\cart.spec.ts --headed
```

Интерактивный режим Playwright Inspector:

```powershell
$env:PWDEBUG = "1"
npx playwright test .\tests\ui\cart.spec.ts
```

Открытие HTML-отчёта:

```powershell
npx playwright show-report
```

Переопределение base URL:

```powershell
$env:BASE_URL = "https://automationexercise.com"
npx playwright test
```

Где лежат артефакты:

- HTML-отчёт: `playwright-report/index.html`
- Скриншоты, видео, трассы: `test-results/`
- Для каждого кейса создаётся отдельная папка с артефактами при падении или при включённой настройке retention

Примеры PowerShell для просмотра артефактов:

```powershell
Get-ChildItem .\playwright-report -Recurse | Select-Object FullName
Get-ChildItem .\test-results -Recurse | Select-Object FullName, Length
```

Полезные замечания:

- Для ожиданий используется auto-waiting Playwright, а не static sleep.
- User flow тесты создают и удаляют аккаунт через API, чтобы избегать загрязнения данных.
- Если в проекте появляются новые сценарии, их стоит добавлять в существующий слой page objects, не распыляя селекторы по спецификации.
- Если Playwright пишет `No tests found`, сначала проверьте, что вы находитесь в корне проекта и что папка `tests` существует.

Резюме по архитектуре:

Проект уже организован в стиле, близком к production-ready QA automation: логика тестов разбита по слоям, UI страницы инкапсулированы, API данные проверяются схемами, а data management выполняется через fixture-слой. Это даёт устойчивый каркас для роста проекта без потери читабельности и поддержки качества.
