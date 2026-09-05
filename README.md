# TypeScript + Playwright Automation Exercise (Русский)

Этот проект содержит UI и API тесты для сайта https://automationexercise.com, реализованные с помощью Playwright Test и TypeScript.

Функции:

- Проверка поиска на странице продуктов (UI)
- Проверка корзины для выбранного товара (UI)
- Валидация API `/api/productsList`
- Создание пользователя, вход и удаление аккаунта после теста
- Конфигурируемый BASE_URL
- Генерация HTML-отчёта и артефактов (скриншоты, видео, трассы)

Требования:

- Node.js 18+ (рекомендуется)
- npm

Установка зависимостей:

PowerShell:

```powershell
npm install
```

Установка браузерных бинарников Playwright (если ещё не установлены):

```powershell
npm run install:browsers
# или
& "C:\Program Files\nodejs\node.exe" .\node_modules\playwright\cli.js install --with-deps chromium
```

Запуск тестов:

Перейдите в корень проекта (где package.json):

```powershell
cd "C:\Users\skoda\.copilot\chats\97878950-9931-4128-88a0-3595b65760eb"
```

Запустить все тесты (UI + API):

```powershell
npx playwright test
# или, если используете явный node путь:
& "C:\Program Files\nodejs\node.exe" .\node_modules\@playwright\test\cli.js test
```

Только UI тесты:

```powershell
npx playwright test .\tests\ui --headed
# или
& "C:\Program Files\nodejs\node.exe" .\node_modules\@playwright\test\cli.js test .\tests\ui --headed
```

Только API тесты:

```powershell
npx playwright test .\tests\api
```

Запуск отдельного файла:

```powershell
npx playwright test .\tests\ui\cart.spec.ts --headed
```

Playwright Inspector (интерактивный режим, остановка на шагах):

```powershell
$env:PWDEBUG = "1"
npx playwright test .\tests\ui\cart.spec.ts
```

Открыть HTML-отчёт после прогонки:

```powershell
npx playwright show-report
# или
& "C:\Program Files\nodejs\node.exe" .\node_modules\@playwright\test\cli.js show-report
```

Артефакты тестов (где искать):

- HTML-отчёт: `playwright-report/`
- Логи, скриншоты, видео и trace: `test-results/` (субпапки для каждого теста)
- Скриншоты при падениях, видео вебм и trace.zip будут доступны внутри соответствующей папки в `test-results`.

Примеры PowerShell для открытия артефактов:

```powershell
# Просмотр списка директорий отчёта
Get-ChildItem .\playwright-report -Recurse | Select-Object FullName

# Просмотр тест-артефактов
Get-ChildItem .\test-results -Recurse | Select-Object FullName, Length
```

Переопределение BASE_URL (PowerShell):

```powershell
$env:BASE_URL = "https://automationexercise.com"
npm test
```

Полезные заметки:

- Тесты используют автоматические ожидания Playwright — избегайте статических sleep.
- Тест создания пользователя удаляет аккаунт в блоке очистки, чтобы не оставлять тестовые данные.
- Если Playwright сообщает "No tests found", убедитесь, что вы запускаете команду из корня проекта и что папка `tests/` присутствует.
