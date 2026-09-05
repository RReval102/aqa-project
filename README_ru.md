# Руководство по тестам (кратко)

Этот файл — краткая справка о запуске UI и API тестов и местах хранения артефактов.

Где находятся тесты:
- tests\ui — UI тесты
- tests\api — API тесты

Ключевые команды (PowerShell):
- Установить зависимости: npm install
- Установить браузеры: npm run install:browsers
- Запустить все тесты: npx playwright test
- Запустить UI тесты (headed): npx playwright test .\tests\ui --headed
- Открыть HTML-отчёт: npx playwright show-report

Артефакты после прогона:
- playwright-report/ — html-отчёт
- test-results/ — скриншоты, видео, trace.zip

